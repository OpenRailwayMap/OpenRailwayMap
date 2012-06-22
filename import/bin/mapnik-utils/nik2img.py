#!/usr/bin/env python

__version__ = '0.7.0'
__author__ = 'Dane Springmeyer (dane [ -a- ] dbsgeo.com)'
__copyright__ = 'Copyright 2010, Dane Springmeyer'
__license__ = 'BSD'

import os
import sys
import optparse
import tempfile

parser = optparse.OptionParser(usage="""%prog <mapfile> <image> [options]

Example usage
-------------

Full help:
 $ %prog -h (or --help for possible options)

Read XML, output image:
 $ %prog mapfile.xml image.png

Read MML in verbose mode
 $ %prog mapfile.mml image.png -v

Read MML, pipe to image
 $ %prog mapfile.mml - > image.png

Accept piped XML
$ <xml stream> | %prog - image.png

""", version='%prog ' + __version__)

def make_float_list(option, opt, value, parser):
    try:
        values = [float(i) for i in value.split(',')]
    except:
        parser.error("option %s: invalid float values: '%s'" % (opt,value))
    setattr(parser.values, option.dest, values)

def make_int_list(option, opt, value, parser):
    try:
        values = [int(i) for i in value.split(',')]
    except:
        parser.error("option %s: invalid integer values: '%s'" % (opt,value))
    setattr(parser.values, option.dest, values)

def make_list(option, opt, value, parser):
    values = [i.strip() for i in value.split(',')]
    setattr(parser.values, option.dest, values)
    

parser.add_option('-f', '--format', dest='format',
                  help='Format of image: png (32 bit), png256 (8 bit), jpeg, pdf, svg, ps, ARGB32, RGB24, or all (will loop through all formats).')

parser.add_option('-c', '--center', dest='center', nargs=2,
                  help='Center coordinates. A long,lat pair e.g. -122.3 47.6 (Seattle)',
                  type='float',
                  action='store')

parser.add_option('-z', '--zoom', dest='zoom',
                  help='Zoom level',
                  type='int',
                  action='store')

parser.add_option('-b','--bbox', dest='bbox',
                  type='float', nargs=4,
                  help='Geographical bounding box. Two long,lat pairs e.g. -126 24 -66 49 (United States)',
                  action='store')

parser.add_option('-e', '--projected-extent', dest='extent', nargs=4,
                  help='Projected envelope/extent. Two coordinate pairs in the projection of the map',
                  type='float',
                  action='store')
                  
parser.add_option('-r', '--radius', dest='radius',
                  help='Zoom to radius (in map units) around center',
                  type='float',
                  action='store')

parser.add_option('--zoom-to-layers', dest='zoom_to_layers',
                  help='Zoom to combined extent of one ore more listed layers by name (comma separated)',
                  type='string', # actually results in a comma-delimited list
                  action='callback',
                  callback=make_list)

parser.add_option('-m', '--max-extent', dest='max_extent', nargs=4,
                  help='Projected envelope/extent. Two coordinate pairs in the projection of the map',
                  type='float',
                  action='store')

parser.add_option('--bbox-factor', dest='bbox_factor',
                  type='float',
                  help='Expand or contract final map bounds by factor (positive values will multiple bbox, negative values will divide bbox',
                  action='store')
                                    
parser.add_option('-s', '--srs',
                  dest='srs',
                  help='Spatial reference system to project the image into - accepts either <epsg:code>, <proj4 literal>, or a url like http://spatialreference.org/ref/sr-org/6')

parser.add_option('-d', '--dimensions', dest='dimensions', nargs=2,
                  help='Pixel dimensions of image (width,height)',
                  type='int',
                  default = (600,400),
                  action='store')

parser.add_option('-l', '--layers',
                  type='string', # actually results in a comma-delimited list
                  help='List of layers by name to render (comma separated)',
                  action='callback',
                  callback=make_list)

parser.add_option('-n', '--dry-run', dest='dry_run',
                  help='Construct map but do not render output',
                  action='store_true')

parser.add_option('-w','--world-file',
                  help="Georeference the image by providing a file extention for worldfile output ( ie 'wld')")

parser.add_option('-x', '--xml', dest='save_xml',
                  help='Serialize the map to xml.')

parser.add_option('-a', '--app', dest='app',
                  help='Application to open the resulting image.')

parser.add_option('--profile', dest='profile',
                  action='store_true', default=False,
                  help='Output a cProfile report')

parser.add_option('-v', '--verbose', dest='verbose',
                  help='Make a bunch of noise',
                  action='store_true')
                  
parser.add_option('-p', '--pause', dest='pause',
                  help='Seconds to pause after each step', type='int',
                  action='store')

parser.add_option('-t', '--trace-steps', dest='trace_steps',
                  type='string', # actually results in a comma-delimited list
                  help='Step(s) at which to set a python debugger trace (separated by commas)',
                  action='callback',
                  callback=make_int_list)

parser.add_option('--no-color', dest='no_color',
                  action='store_true', default=False,
                  help='Turn off colored terminal output')

parser.add_option('--no-open', dest='no_open',
                  action='store_true', default=False,
                  help='Skip opening of image in default viewer')
                  
parser.add_option('--fonts',
                  type='string', # actually results in a comma-delimited list
                  help='List of paths to .ttf or .otf fonts to register (comma separated)',
                  action='callback',
                  callback=make_list)

parser.add_option('--mapnik-version', dest='mapnik_version',
                  action='store', default=None,
                  help='Use the mapnik2 python bindings if they exist', type='int')

parser.add_option('--zip', dest='zip_compress',
                  action='store_true', default=False,
                  help='Apply zip compression to output image (and other files by same name)')

parser.add_option('--scale-factor', dest='scale_factor',
                  type='float',
                  help='Pass a scale factor to the Mapnik renderer (experimental)',
                  action='store')

parser.add_option('--aspect-fix-mode', dest='aspect_fix_mode',
                  type='string',
                  help='Pass an aspect_fix_mode string (case-insensitive match of http://media.mapnik.org/api_docs/python/mapnik._mapnik.aspect_fix_mode-class.html)',
                  action='store')
                      
if __name__ == '__main__':
    (options, args) = parser.parse_args()
    
    # we're actually starting now so pull in mapnik
    # this version adapter is a nasty hack to globally
    # control usage of either mapnik or mapnik2
    from mapnik_utils.version_adapter import Mapnik
    mapnik = Mapnik(options.mapnik_version)
    
    if options.scale_factor:
        if not mapnik.mapnik_version() >= 800:
            parser.error('\nPassing a scale factor requires at least mapnik >= 0.8.0 (aka Mapnik2)\n')
    
    if len(args) == 0:
        parser.error('\nPlease provide the path to a Mapnik xml or Cascadenik mml file\n')
    
    elif len(args) == 1 and not options.dry_run:
        parser.error('\nPlease provide an output image name\n')

    if args[0] == '-' and not sys.stdin.isatty():
        xml = sys.stdin.read()
        if hasattr(mapnik,'load_map_from_string'):
            options.from_string = True
            mapfile = xml
        else:
            options.from_string = False
            (handle, mapfile) = tempfile.mkstemp('.xml', 'mapfile_string')
            os.close(handle)
            open(mapfile, 'w').write(xml)
    else:
        mapfile = args[0]

    if len(args) > 1:
        options.image = args[1]
        if options.image == '-':
            options.pipe = True
        else:
            options.pipe = False
           
    options.width, options.height = options.dimensions
    if not options.format and hasattr(options,'image'):
        if options.image == '-':
            options.format = 'png'
        elif not options.image.endswith('png'):
            try:
                options.format = options.image.split('.')[-1]
            except:
                pass

    def main():
        from mapnik_utils.composer import ComposeDebug
        nik_map = ComposeDebug(mapfile,**options.__dict__)
        if options.no_open:
            nik_map.render()
        else:
            nik_map.open()
    
    if options.profile:
        import cProfile
        cProfile.run('main()', sort=1)
    else:
        main()
