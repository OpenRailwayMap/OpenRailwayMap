#!/usr/bin/python
# -*- coding: utf-8 -*-

# this file is based on generate_tiles_multiprocess.py
# run it without arguments to see options list

from math import pi,cos,sin,log,exp,atan
from subprocess import call
import sys, os
import mapnik2 as mapnik
import multiprocessing
import psycopg2
from shapely.geometry import Polygon
from shapely.wkb import loads
import ogr
import sqlite3
import getpass
import argparse

DEG_TO_RAD = pi/180
RAD_TO_DEG = 180/pi
TILE_SIZE = 256


def box(x1,y1,x2,y2):
    return Polygon([(x1,y1), (x2,y1), (x2,y2), (x1,y2)])

def minmax (a,b,c):
    a = max(a,b)
    a = min(a,c)
    return a

class GoogleProjection:
    def __init__(self,levels=18):
        self.Bc = []
        self.Cc = []
        self.zc = []
        self.Ac = []
        c = 256
        for d in range(0,levels):
            e = c/2;
            self.Bc.append(c/360.0)
            self.Cc.append(c/(2 * pi))
            self.zc.append((e,e))
            self.Ac.append(c)
            c *= 2
                
    def fromLLtoPixel(self,ll,zoom):
         d = self.zc[zoom]
         e = round(d[0] + ll[0] * self.Bc[zoom])
         f = minmax(sin(DEG_TO_RAD * ll[1]),-0.9999,0.9999)
         g = round(d[1] + 0.5*log((1+f)/(1-f))*-self.Cc[zoom])
         return (e,g)
     
    def fromPixelToLL(self,px,zoom):
         e = self.zc[zoom]
         f = (px[0] - e[0])/self.Bc[zoom]
         g = (px[1] - e[1])/-self.Cc[zoom]
         h = RAD_TO_DEG * ( 2 * atan(exp(g)) - 0.5 * pi)
         return (f,h)


class ListWriter:
    def __init__(self, f):
        self.f = f

    def __str__(self):
        return "ListWriter({0})".format(self.f.name)

    def write_poly(self, poly):
        self.f.write("BBox: {0}\n".format(poly.bounds))

    def write(self, x, y, z):
        self.f.write("{0}/{1}/{2}\n".format(z,x,y))

    def exists(self, x, y, z):
        return False

    def need_image(self):
        return False

    def multithreading(self):
        return False

    def close(self):
        self.f.close()

class FileWriter:
    def __init__(self, tile_dir):
        self.tile_dir = tile_dir
        if not self.tile_dir.endswith('/'):
            self.tile_dir = self.tile_dir + '/'
        if not os.path.isdir(self.tile_dir):
            os.mkdir(self.tile_dir)

    def __str__(self):
        return "FileWriter({0})".format(self.tile_dir)

    def write_poly(self, poly):
        pass

    def tile_uri(self, x, y, z):
        return '{0}{1}/{2}/{3}.png'.format(self.tile_dir, z, x, y)

    def exists(self, x, y, z):
        return os.path.isfile(self.tile_uri(x, y, z))

    def write(self, x, y, z, image):
        uri = self.tile_uri(x, y, z)
        try:
            os.makedirs(os.path.dirname(uri))
        except OSError:
            pass
        image.save(uri, 'png256')

    def need_image(self):
        return True

    def multithreading(self):
        return True

    def close(self):
        pass

class TMSWriter(FileWriter):
    def tile_uri(self, x, y, z):
        return '{0}{1}/{2}/{3}.png'.format(self.tile_dir, z, x, 2**z-1-y)

    def __str__(self):
        return "TMSWriter({0})".format(self.tile_dir)

# https://github.com/mapbox/mbutil/blob/master/mbutil/util.py
class MBTilesWriter:
    def __init__(self, filename, setname, overlay=False, version=1, description=None):
        self.filename = filename
        if not self.filename.endswith('.mbtiles'):
            self.filename = self.filename + '.mbtiles'
        self.con = sqlite3.connect(self.filename)
        self.cur = self.con.cursor()
        self.cur.execute("""PRAGMA synchronous=0""")
        self.cur.execute("""PRAGMA locking_mode=EXCLUSIVE""")
        #self.cur.execute("""PRAGMA journal_mode=TRUNCATE""")
        self.cur.execute("""create table if not exists tiles (zoom_level integer, tile_column integer, tile_row integer, tile_data blob);""")
        self.cur.execute("""create table if not exists metadata (name text, value text);""")
        self.cur.execute("""create unique index if not exists name on metadata (name);""")
        self.cur.execute("""create unique index if not exists tile_index on tiles (zoom_level, tile_column, tile_row);""")
        metadata = [ ('name', setname), ('format', 'png'), ('type', 'overlay' if overlay else 'baselayer'), ('version', version) ]
        if description:
            metadata.append(('description', description))
        for name, value in metadata:
            self.cur.execute('insert or replace into metadata (name, value) values (?, ?)', (name, value))

    def __str__(self):
        return "MBTilesWriter({0})".format(self.filename)

    def write_poly(self, poly):
        bbox = poly.bounds
        self.cur.execute("""select value from metadata where name='bounds'""")
        result = self.cur.fetchone
        if result:
            b = result['value'].split(',')
            oldbbox = box(int(b[0]), int(b[1]), int(b[2]), int(b[3]))
            bbox = bbox.union(oldbbox).bounds
        self.cur.execute("""insert or replace into metadata (name, value) values ('bounds', ?)""", ','.join(bbox))

    def exists(self, x, y, z):
        self.cur.execute("""select 1 from tiles where zoom_level = ? and tile_column = ? and tile_row = ?""", (z, x, 2**z-1-y))
        return self.cur.fetchone()

    def write(self, x, y, z, image):
        self.cur.execute("""insert or replace into tiles (zoom_level, tile_column, tile_row, tile_data) values (?, ?, ?, ?);""", (z, x, 2**z-1-y, sqlite3.Binary(image.tostring('png256'))))

    def need_image(self):
        return True

    def multithreading(self):
        return False

    def close(self):
        self.cur.execute("""ANALYZE;""")
        self.cur.execute("""VACUUM;""")
        self.cur.close()
        self.con.close()


# todo: make queue-based writer
class ThreadedWriter:
    def __init__(self, writer):
        self.writer = writer
        self.queue = multiprocessing.Queue(10)

    def __str__(self):
        return "Threaded{0}".format(self.writer)

    def write_poly(self, poly):
        pass

    def exists(self, x, y, z):
        pass

    def write(self, x, y, z, image):
        pass

    def need_image(self):
        return writer.need_image()

    def multithreading(self):
        return True

    def close(self):
        writer.close()


class RenderThread:
    def __init__(self, writer, mapfile, q, printLock, verbose=True):
        self.writer = writer
        self.q = q
	self.mapfile = mapfile
        self.printLock = printLock
        self.verbose = verbose

    def render_tile(self, x, y, z):
        # Calculate pixel positions of bottom-left & top-right
        p0 = (x * TILE_SIZE, (y + 1) * TILE_SIZE)
        p1 = ((x + 1) * TILE_SIZE, y * TILE_SIZE)

        # Convert to LatLong (EPSG:4326)
        l0 = self.tileproj.fromPixelToLL(p0, z);
        l1 = self.tileproj.fromPixelToLL(p1, z);

        # Convert to map projection (e.g. mercator co-ords EPSG:900913)
        c0 = self.prj.forward(mapnik.Coord(l0[0],l0[1]))
        c1 = self.prj.forward(mapnik.Coord(l1[0],l1[1]))

        # Bounding box for the tile
        if hasattr(mapnik,'mapnik_version') and mapnik.mapnik_version() >= 800:
            bbox = mapnik.Box2d(c0.x,c0.y, c1.x,c1.y)
        else:
            bbox = mapnik.Envelope(c0.x,c0.y, c1.x,c1.y)
        render_size = TILE_SIZE
        self.m.resize(render_size, render_size)
        self.m.zoom_to_box(bbox)
        self.m.buffer_size = 128

        # Render image with default Agg renderer
        im = mapnik.Image(render_size, render_size)
        mapnik.render(self.m, im)
        self.writer.write(x, y, z, im)


    def loop(self):
        self.m = mapnik.Map(TILE_SIZE, TILE_SIZE)
        # Load style XML
        mapnik.load_map(self.m, self.mapfile, True)
        # Obtain <Map> projection
        self.prj = mapnik.Projection(self.m.srs)
        # Projects between tile pixel co-ordinates and LatLong (EPSG:4326)
        self.tileproj = GoogleProjection()

        while True:
            #Fetch a tile from the queue and render it
            r = self.q.get()
            if (r == None):
                self.q.task_done()
                break
            else:
                (x, y, z) = r

            exists= ""
            if self.writer.exists(x, y, z):
                exists= "exists"
            elif self.writer.need_image():
                self.render_tile(x, y, z)
            else:
                self.writer.write(x, y, z)
            empty = ''
            #if os.path.exists(tile_uri):
            #    bytes=os.stat(tile_uri)[6]
            #    empty= ''
            #    if bytes == 103:
            #        empty = " Empty Tile "
            #else:
            #    empty = " Missing "
            if self.verbose:
                self.printLock.acquire()
                print z, x, y, exists, empty
                self.printLock.release()
            self.q.task_done()

class ListGenerator:
    def __init__(self, f):
        self.f = f

    def __str__(self):
        return "ListGenerator({0})".format(self.f.name)

    def generate(self, queue):
        import re
        for line in self.f:
            m = re.search(r"(\d{1,2})\D+(\d+)\D+(\d+)", line)
            if m:
                queue.put((int(m.group(2)), int(m.group(3)), int(m.group(1))))


class PolyGenerator:
    def __init__(self, poly, zooms):
        self.poly = poly
        self.zooms = zooms
        self.zooms.sort()

    def __str__(self):
        return "PolyGenerator({0}, {1})".format(self.poly.bounds, self.zooms)

    def generate(self, queue):
        gprj = GoogleProjection(self.zooms[-1]+1) 

        bbox = self.poly.bounds
        ll0 = (bbox[0], bbox[3])
        ll1 = (bbox[2], bbox[1])

        for z in self.zooms:
            px0 = gprj.fromLLtoPixel(ll0, z)
            px1 = gprj.fromLLtoPixel(ll1, z)

            for x in range(int(px0[0]/float(TILE_SIZE)), int(px1[0]/float(TILE_SIZE))+1):
                # Validate x co-ordinate
                if (x < 0) or (x >= 2**z):
                    continue
                for y in range(int(px0[1]/float(TILE_SIZE)), int(px1[1]/float(TILE_SIZE))+1):
                    # Validate x co-ordinate
                    if (y < 0) or (y >= 2**z):
                        continue

                    # Calculate pixel positions of bottom-left & top-right
                    tt_p0 = (x * TILE_SIZE, (y + 1) * TILE_SIZE)
                    tt_p1 = ((x + 1) * TILE_SIZE, y * TILE_SIZE)

                    # Convert to LatLong (EPSG:4326)
                    tt_l0 = gprj.fromPixelToLL(tt_p0, z);
                    tt_l1 = gprj.fromPixelToLL(tt_p1, z);

                    tt_p = box(tt_l0[0], tt_l1[1], tt_l1[0], tt_l0[1])
                    if not self.poly.intersects(tt_p):
                        continue

                    # Submit tile to be rendered into the queue
                    t = (x, y, z)
		    queue.put(t)


def render_tiles(generator, mapfile, writer, num_threads=1, verbose=True):
    if verbose:
        print "render_tiles(",generator, mapfile, writer, ")"

    # Launch rendering threads
    queue = multiprocessing.JoinableQueue(32 if writer.multithreading() else 0)
    printLock = multiprocessing.Lock()
    renderers = {}
    if writer.multithreading():
        for i in range(num_threads):
            renderer = RenderThread(writer, mapfile, queue, printLock, verbose=verbose)
            render_thread = multiprocessing.Process(target=renderer.loop)
            render_thread.start()
            #print "Started render thread %s" % render_thread.getName()
            renderers[i] = render_thread

    generator.generate(queue)

    if writer.multithreading():
        # Signal render threads to exit by sending empty request to queue
        for i in range(num_threads):
            queue.put(None)
        # wait for pending rendering jobs to complete
        queue.join()
        for i in range(num_threads):
            renderers[i].join()
    else:
        renderer = RenderThread(writer, mapfile, queue, printLock, verbose=verbose)
        queue.put(None)
        renderer.loop()


def poly_parse(fp):
    poly = []
    data = False
    for l in fp:
        l = l.strip()
        if not l: continue
        if l == 'END': break
        if l == '1':
            data = True
            continue
        if not data: continue
        poly.append(map(lambda x: float(x.strip()), l.split()[:2]))
    return poly


def project(geom, from_epsg=900913, to_epsg=4326):
    # source: http://hackmap.blogspot.com/2008/03/ogr-python-projection.html
    to_srs = ogr.osr.SpatialReference()
    to_srs.ImportFromEPSG(to_epsg)

    from_srs = ogr.osr.SpatialReference()
    from_srs.ImportFromEPSG(from_epsg)

    ogr_geom = ogr.CreateGeometryFromWkb(geom.wkb)
    ogr_geom.AssignSpatialReference(from_srs)

    ogr_geom.TransformTo(to_srs)
    return loads(ogr_geom.ExportToWkb())

def read_db(db, osm_id=0):
    # Zero for DB bbox
    cur = db.cursor()
    if osm_id:
        cur.execute("""SELECT way FROM planet_osm_polygon WHERE osm_id = %s;""", (osm_id,))
    else:
        cur.execute("""SELECT ST_ConvexHull(ST_Collect(way)) FROM planet_osm_polygon;""")
    way = cur.fetchone()[0]
    cur.close()
    poly = loads(way.decode('hex'))
    return project(poly)

def read_cities(db, osm_id=0):
    cur = db.cursor()
    if osm_id:
        cur.execute("""SELECT ST_Union(pl.way) FROM planet_osm_polygon pl, planet_osm_polygon b WHERE b.osm_id = %s AND pl.place IN ('town', 'city') AND ST_Area(pl.way) < 500*1000*1000 AND ST_Contains(b.way, pl.way);""", (osm_id,))
    else:
        cur.execute("""SELECT ST_Union(way) FROM planet_osm_polygon WHERE place IN ('town', 'city') AND ST_Area(way) < 500*1000*1000;""")
    result = cur.fetchone()
    poly = loads(result[0].decode('hex')) if result else Polygon()
    if osm_id:
        cur.execute("""SELECT ST_Union(ST_Buffer(p.way, 5000)) FROM planet_osm_point p, planet_osm_polygon b WHERE b.osm_id=%s AND ST_Contains(b.way, p.way) AND p.place IN ('town', 'city') AND NOT EXISTS(SELECT 1 FROM planet_osm_polygon pp WHERE pp.name=p.name AND ST_Contains(pp.way, p.way));""", (osm_id,))
    else:
        cur.execute("""SELECT ST_Union(ST_Buffer(p.way, 5000)) FROM planet_osm_point p WHERE p.place in ('town', 'city') AND NOT EXISTS(SELECT 1 FROM planet_osm_polygon pp WHERE pp.name=p.name AND ST_Contains(pp.way, p.way));""")
    result = cur.fetchone()
    if result:
        poly = poly.union(loads(result[0].decode('hex')))
    return project(poly)


if __name__ == "__main__":
    try:
        mapfile = os.environ['MAPNIK_MAP_FILE']
    except KeyError:
        mapfile = os.getcwd() + '/osm.xml'

    default_user = getpass.getuser()

    parser = argparse.ArgumentParser(description='Generate mapnik tiles for OSM polygon')
    apg_input = parser.add_argument_group('Input')
    apg_input.add_argument("-b", "--bbox", nargs=4, type=float, metavar=('X1', 'Y1', 'X2', 'Y2'), help="generate tiles inside a bounding box")
    apg_input.add_argument('-p', '--poly', type=argparse.FileType('r'), help='use a poly file for area')
    apg_input.add_argument("-a", "--area", type=int, metavar='OSM_ID', help="generate tiles inside an OSM polygon: positive for polygons, negative for relations, 0 for whole database")
    apg_input.add_argument("-c", "--cities", type=int, metavar='OSM_ID', help='generate tiles for all towns inside a polygon')
    apg_input.add_argument('-l', '--list', type=argparse.FileType('r'), metavar='TILES.LST', help='process tile list')
    apg_output = parser.add_argument_group('Output')
    apg_output.add_argument('-t', '--tiledir', metavar='DIR', help='output tiles to directory (default: {0}/tiles)'.format(os.getcwd()))
    apg_output.add_argument('--tms', action='store_true', help='write files in TMS order', default=False)
    apg_output.add_argument('-m', '--mbtiles', help='generate mbtiles file')
    apg_output.add_argument('--name', help='name for mbtiles', default='Test MBTiles')
    apg_output.add_argument('--overlay', action='store_true', help='if this layer is an overlay (for mbtiles metadata)', default=False)
    apg_output.add_argument('-x', '--export', type=argparse.FileType('w'), metavar='TILES.LST', help='save tile list into file')
    apg_output.add_argument('-z', '--zooms', type=int, nargs=2, metavar=('ZMIN', 'ZMAX'), help='range of zoom levels to render (default: 6 12)', default=(6, 12))
    apg_other = parser.add_argument_group('Settings')
    apg_other.add_argument('-s', '--style', help='style file for mapnik (default: {0})'.format(mapfile), default=mapfile)
    apg_other.add_argument('--threads', type=int, metavar='N', help='number of threads (default: 2)', default=2)
    apg_other.add_argument('-q', '--quiet', dest='verbose', action='store_false', help='do not print any information',  default=True)
    apg_db = parser.add_argument_group('Database (for poly/cities)')
    apg_db.add_argument('-d', '--dbname', metavar='DB', help='database (default: gis)', default='gis')
    apg_db.add_argument('--host', help='database host', default='localhost')
    apg_db.add_argument('--port', type=int, help='database port', default='5432')
    apg_db.add_argument('-u', '--user', help='user name for db (default: {0})'.format(default_user), default=default_user)
    apg_db.add_argument('-w', '--password', action='store_true', help='ask for password', default=False)
    options = parser.parse_args()

    # check for required argument
    if options.bbox == None and options.poly == None and options.cities == None and options.list == None and options.area == None:
        parser.print_help()
        sys.exit()

    # writer
    if options.tiledir:
        writer = FileWriter(options.tiledir) if not options.tms else TMSWriter(options.tiledir)
    elif options.mbtiles:
        writer = MBTilesWriter(options.mbtiles, options.name, overlay=options.overlay)
    elif options.export:
        writer = ListWriter(options.export)
    else:
        writer = FileWriter(os.getcwd() + '/tiles') if not options.tms else TMSWriter(os.getcwd() + '/tiles')

    # input and process
    poly = None
    if options.bbox:
        b = options.bbox
        tpoly = box(b[0], b[1], b[2], b[3])
        poly = tpoly if not poly else poly.intersection(tpoly)
    if options.poly:
        tpoly = Polygon(poly_parse(options.poly))
        poly = tpoly if not poly else poly.intersection(tpoly)
    if options.area != None or options.cities != None:
        passwd = ""
        if options.password:
            passwd = getpass.getpass("Please enter your password: ")

        try:
            db = psycopg2.connect(database=options.dbname, user=options.user, password=passwd, host=options.host, port=options.port)
	    if options.area != None:
		tpoly = read_db(db, options.area)
		poly = tpoly if not poly else poly.intersection(tpoly)
	    if options.cities != None:
		tpoly = read_cities(db, options.cities)
		poly = tpoly if not poly else poly.intersection(tpoly)
	    db.close()
        except Exception, e:
            print "Error connecting to database: ", e.pgerror
            sys.exit(1)

    if options.list:
        generator = ListGenerator(options.list)
    elif poly:
        generator = PolyGenerator(poly, range(options.zooms[0], options.zooms[1] + 1))
    else:
        print "Please specify a region for rendering."
        sys.exit()

    render_tiles(generator, options.style, writer, num_threads=options.threads, verbose=options.verbose)
    writer.close()

