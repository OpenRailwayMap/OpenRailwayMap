#!/opt/python-2_5/bin/python

import sys,xml.sax
from xml.sax.handler import ContentHandler
from cElementTree import Element, SubElement, ElementTree
from optparse import OptionParser

exportTags = [ ("name","varchar(64)"),
               ("place","varchar(32)"),
               ("landuse","varchar(32)"),
               ("leisure","varchar(32)"),
               ("waterway","varchar(32)"),
               ("highway","varchar(32)"),
               ("amenity","varchar(32)"),
               ("tourism","varchar(32)"),
               ("learning","varchar(32)")
               ]
segments = {}
table_name = "planet_osm"

class osm2sql (ContentHandler):
    def __init__(self,fh):
        ContentHandler.__init__(self)
        self.fh = fh
    def startDocument (self):
        self.node = {}
        self.stack = []
    def startElement(self,name,attr):
        if name == 'node':
            self.node[attr["id"]] = (attr["lon"], attr["lat"])
            self.stack.append({'type':'node','id':attr["id"],'tags':{}})
        elif name == 'segment':
            from_node = self.node[attr["from"]]
            to_node   = self.node[attr["to"]]
            segments[attr["id"]] = from_node,to_node
        elif name == 'tag':
            k = attr['k'].replace(":","_").replace(" ","_")
            v = attr['v']
            self.stack.append((k,v))
        elif name == 'way':
            self.stack.append({'type':'way','id':attr["id"],'segs': [],'tags':{}})
        elif name == 'seg':
            self.stack[-1]['segs'].append(attr["id"])
            
    def endElement (self,name):
        if name == 'segment':
            pass
        elif name == 'node':
            node = self.stack.pop()
            osm_id = node['id']
            fields = ",".join(["%s" % f[0] for f in exportTags])
            values = []
            count=0
            for tag in exportTags:
                if tag[0] in node['tags']:
                    values.append("$$%s$$" % node['tags'][tag[0]])
                    count+=1
                else:
                    values.append("$$$$")
                
            if count > 0: # only create POINT feature if node has some tags
                values = ",".join(values)
                #values = values.encode("UTF-8")
                wkt = 'POINT(%s %s)' % (self.node[osm_id])
                sql = "insert into %s (osm_id,%s,way) values (%s,%s,GeomFromText('%s',4326));" % (table_name,fields,osm_id,values,wkt)
                print sql.encode("UTF-8")
                
        elif name == 'tag':
            tag = self.stack.pop()
            if len(self.stack) > 0 :
                if 'type' in self.stack[-1] and ( self.stack[-1]['type'] == 'way' or self.stack[-1]['type'] == 'node') :
                    self.stack[-1]['tags'][tag[0]] = tag[1]
                
        elif name == 'way':
            way = self.stack.pop()
            osm_id = way['id']
            fields = ",".join(["%s" % f[0] for f in exportTags])
            polygon = False
            values = []
            for tag in exportTags:
                if tag[0] in way['tags']:
                    if tag[0] == 'landuse' or tag[0] == 'leisure':
                        polygon = True
                    values.append("$$%s$$" % way['tags'][tag[0]])
                else:
                    values.append("$$$$")
            values = ",".join(values)

            wkt,status = self.WKT(way,polygon)
            if status :
                sql = "insert into %s (osm_id,%s,way) values (%s,%s,GeomFromText('%s',4326));" % (table_name,fields,osm_id,values,wkt)
                print sql.encode("UTF-8")
            else:
                for s in way['segs']:
                    try:
                        from_node,to_node = segments[s]
                        wkt = 'LINESTRING(%s %s,%s %s)' % (from_node[0],from_node[1],to_node[0],to_node[1]) 
                        sql = "insert into %s (osm_id,%s,way) values (%s,%s,GeomFromText('%s',4326));" % (table_name,fields,osm_id,
values,wkt)
                        print sql.encode("UTF-8")
                    except:
                        pass
            
    def WKT(self,way, polygon=False):
        first = True
        wkt = ""

        max = len(way['segs']) * len(way['segs'])
        i = 0
        while way['segs'] and i < max:
            id = way['segs'].pop()
            i+=1
            if id in segments:
                from_node,to_node = segments[id]
                x0 = from_node[0]
                y0 = from_node[1]
                x1 = to_node[0]
                y1 = to_node[1]
            
                if first:
                    first = False
                    start_x = x0
                    start_y = y0
                    end_x = x1
                    end_y = y1
                    wkt = '%s %s,%s %s' % (x0,y0,x1,y1)
                else:
                    if (start_x == x0) and (start_y == y0) :
                        start_x = x1
                        start_y = y1
                        wkt ='%s %s,' % (x1,y1) + wkt
                    elif (start_x == x1) and (start_y == y1) :
                        start_x = x0
                        start_y = y0
                        wkt ='%s %s,' % (x0,y0) + wkt
                    elif (end_x == x0) and (end_y == y0) :
                        end_x = x1
                        end_y = y1
                        wkt += ',%s %s' % (x1,y1)
                    elif (end_x == x1) and (end_y == y1) :
                        end_x = x0
                        end_y = y0
                        wkt += ',%s %s' % (x0,y0)
                    else:
                        way['segs'].insert(0,id)
            
        if polygon:
            wkt = wkt + ",%s %s" % (start_x,start_y)
            wkt = 'POLYGON ((%s))' % wkt
        else:
            wkt = 'LINESTRING (%s)' % wkt
        if way['segs']:
            return wkt,False
        else:
            return wkt,True
            
if __name__ == "__main__":
    parser = osm2sql(sys.stdout)
    fields = ",".join(["%s %s" % (tag[0],tag[1]) for tag in exportTags])
    print "drop table %s ;" % table_name
    print "create table %s ( osm_id int4,%s );" % (table_name,fields)
    print "select AddGeometryColumn('%s', 'way', 4326, 'GEOMETRY', 2 );" % table_name
    print "begin;"
    xml.sax.parse(sys.stdin,parser)
    print "commit;"
    print "vacuum analyze %s;" % table_name
