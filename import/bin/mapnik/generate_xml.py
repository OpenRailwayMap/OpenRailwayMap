#!/usr/bin/env python

import os
import re
import sys
import glob
import optparse
import platform
import tempfile

__version__ = '0.1.0'

REASONABLE_DEFAULTS = {
        'epsg':'900913', # default osm2pgsql import srid
        'world_boundaries':'world_boundaries', # relative path
        'symbols':'symbols', # relative path
        'prefix':'planet_osm', # default osm2pgsql table prefix
        'extent':'-20037508,-19929239,20037508,19929239', # world in merc
        'inc':'inc/*.template', # search path for inc templates to parse
        'estimate_extent':'false',   
        'extent':'-20037508,-19929239,20037508,19929239',   
        }

def color_text(color, text):
    if os.name == 'nt':
        return text
    return "\033[9%sm%s\033[0m" % (color,text)

class Params:
    def __init__(self,params,accept_none):
        self.params = params
        self.accept_none = accept_none
        self.missing = []
    
    def blend_with_env(self,opts):
        d = {}
        
        for p in self.params:
            env_var_name = 'MAPNIK_%s' % p.upper()

            # first pull from passed options...
            if not opts.get(p) is None:
                d[p] = opts[p]

            # then try to pull from environment settings
            elif not os.environ.get(env_var_name) is None:
                d[p] = os.environ[env_var_name]

            # then assign any reasonable default values...
            elif p in REASONABLE_DEFAULTS.keys():
                d[p] = REASONABLE_DEFAULTS[p]
            # if --accept-none is passed then we assume
            # its a paramater that mapnik likely does not need
            # and will ignore if it is an empty string (e.g. db values)
            elif self.accept_none:
                d[p] = ''
            else:
                self.missing.append(p)
        return d

def generate_help_text(var,default):
    if var == 'host':
        return 'Set postgres database host %s' % default
    elif var == 'port':
        return 'Set postgres database host %s' % default
    return "Set value of '%s' %s" % (var,default)
    
def serialize(xml,options):
    try:
        import mapnik
    except:
        sys.exit(color_text(1,'Error: saving xml requires Mapnik python bindings to be installed'))
    m = mapnik.Map(1,1)
    if options.from_string:
        mapnik.load_map_from_string(m,xml,True)
    else:
        mapnik.load_map(m,xml,True)
    if options.output:
        mapnik.save_map(m,options.output)
    else:
        if hasattr(mapnik,'mapnik_version') and mapnik.mapnik_version() >= 700:
            print mapnik.save_map_to_string(m)
        else:
            sys.exit(color_text(1,'Minor error: printing XML to stdout requires Mapnik >=0.7.0, please provide a second argument to save the output to a file'))

def validate(params,parser):
    if not os.path.exists(params['world_boundaries']):
        parser.error("Directory '%s' used for param '%s' not found" % (params['world_boundaries'],'world_boundaries'))
    supported_srs = [900913,4326]
    if not int(params['epsg']) in supported_srs:
        parser.error('Sorry only supported projections are: %s' % supported_srs)
    if not params['estimate_extent'] == 'false':
        params['extent'] = ''

# set up parser...
parser = optparse.OptionParser(usage="""%prog [template xml] <output xml> <parameters>

Full help:
 $ %prog -h (or --help for possible options)

Read 'osm.xml' and modify '/inc' files in place, pass dbname and user, accept empty string for other options
 $ %prog --dbname osm --user postgres --accept-none

Read template, save output xml, and pass variables as options
 $ %prog osm.xml my_osm.xml --dbname spain --user postgres --host ''""", version='%prog ' + __version__)


if __name__ == '__main__':

    # custom parse of includes directory if supplied...
    if '--inc' in sys.argv:
        idx = sys.argv.index('--inc')
        if not len(sys.argv) > (idx+1) or '--' in sys.argv[idx+1]:
            parser.error("--inc argument requires a path to a directory as an argument")
        else:
            search_path = os.path.join(sys.argv[idx+1],'*.template')
    else:
        search_path = REASONABLE_DEFAULTS['inc']
    
    inc_dir = os.path.dirname(search_path)
    parser.add_option('--inc', dest='inc', help="Includes dir (default: '%s')" % inc_dir )
    
    parser.add_option('--accept-none', dest='accept_none', action='store_true', help="Interpret lacking value as unneeded")
    
    if not os.path.exists(inc_dir):
        parser.error("The 'inc' path you gave is bogus!")
        
    # get all the includes
    includes = glob.glob(search_path)
    
    if not includes:
        parser.error("Can't find include templates, please provide search path using '--inc' , currently using '%s'" % search_path)

    p = re.compile('.*%\((\w+)\)s.*')
    
    text = ''
    for xml in includes:
        text += file(xml,'rb').read()
    
    # find all variables in template includes
    matches = p.findall(text)
    
    if not matches:
        parser.error(color_text(1,"Can't properly parse out variables in include templates.\nMake sure they are all wrapped like '%(variable)s'"))
    
    # look ahead and build up --help text...
    p = Params(matches,accept_none=False)
    blended = p.blend_with_env({})
    c_opts = []
    for var in matches:
        if not var in c_opts:
            msg = "(default: '%(" + var + ")s')"
            if var in blended:
                default = msg % blended
            else:
                default = ''#msg % {var:'None'}
            help = generate_help_text(var,default)
            parser.add_option('--%s' % var, dest=var,help=generate_help_text(var,default))
            c_opts.append(var)

    # now, actually run the tool...
    (options, args) = parser.parse_args()
    p = Params(matches,options.accept_none)
    blended = p.blend_with_env(options.__dict__)
    
    help_text = "\n\nNote: use --accept-none to pass blank values for other parameters "
    if p.missing:
        parser.error(color_text(1,"\nPlease provide the following parameters values (or set as env variables):\n%s" % ''.join([" --%s 'value' " % v for v in p.missing]) + help_text))
    
    validate(blended,parser)
    
    for xml in includes:
        template = file(xml,'rb')
        new_name = xml.replace('.template','')
        new_file = file(new_name,'wb')
        try:
            new_file.write(template.read() % blended)
        except ValueError, e:
            parser.error(color_text(1,"\n%s (found in %s)" % (e,xml)))
        template.close()
        new_file.close()
        
    options.output = None
    options.from_string = False
    template_xml = None
    # accepting XML as stream...
    if not sys.stdin.isatty():
        template_xml = sys.stdin.read()
        options.from_string = True
        if len(args) > 0:
            options.output = args[0]
    elif len(args) == 0:
        template_xml = None
        options.output = None
    else:
        template_xml = args[0]
        if len(args) > 1:
            options.output = args[1]

    if template_xml:
        serialize(template_xml,options)
    else:
        print 'Include files written successfully! Pass the osm.xml file as an argument if you want to serialize a new version or test reading the XML'
