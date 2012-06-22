#!/usr/bin/python
#
# Simple live tile generator for style development sandboxes
#
# (c) 2012 Sven Geggus <sven-osm@geggus.net>
#
# Do not use for for production tileservers, 
# use mod_tile + Tirex or renderd instead
#
# Released under the terms of the
# GNU Affero General Public License (AGPL)
# http://www.gnu.org/licenses/agpl-3.0.html
# Version 3.0 or later
#

import math,sys,re,os,ConfigParser
try:
  import mapnik2 as mapnik
except:
  import mapnik


def TileToMeters(tx, ty, zoom):
  initialResolution = 20037508.342789244 * 2.0 / 256.0
  originShift = 20037508.342789244
  tileSize = 256.0
  zoom2 = (2.0**zoom)
  res = initialResolution / zoom2
  mx = (res*tileSize*(tx+1))-originShift
  my = (res*tileSize*(zoom2-ty))-originShift
  return mx, my

def TileToBBox(x,y,z):
  x1,y1=TileToMeters(x-1,y+1,z)
  x2,y2=TileToMeters(x,y,z) 
  return x1,y1,x2,y2

# generate error page if invalid URL has been called  
def InvalidURL(start_response,msg,status):
  html="<html><body>%s</body></html>" % msg
  response_headers = [('Content-type', 'text/html'),('Content-Length', str(len(html)))]
  start_response(status, response_headers)
  return html
 
# generate slyypy map for all styles or a single style
def genSlippyMap(start_response,stylelist = []):
  status = '200 OK'
  
  if stylelist == []:
    dirList=os.listdir(sandbox_dir)
    stylelist=[]
    for s in dirList:
      if os.path.isdir(sandbox_dir+'/'+s):
        stylelist.append(s)

  templ = open(map_template,'r')
  tdata = templ.read()
  templ.close()
  
  p = re.compile('%MAPSTYLES%')
  # take advantage of the fact, that python lists
  # and javascript lists use the same string representation
  tdata = p.sub(str(stylelist),tdata)
  
  response_headers = [('Content-type', 'text/html'),('Content-Length', str(len(tdata)))]
  start_response(status, response_headers)
  return tdata
 
# check if sandbox of given name does exist 
def checkSandbox(name):
  mapfile=sandbox_dir+"/"+name+"/"+stylename
  if not os.path.exists(mapfile):
    return True
  return False

def application(env, start_response):
  
  global sandbox_dir
  global stylename
  global map_template
  
  status = '200 OK'
  
  pathinfo=env['PATH_INFO']

  # read configuration file  
  config = ConfigParser.ConfigParser()
  cfgfile=os.path.dirname(env['SCRIPT_FILENAME'])+"/livetiles.conf"
  config.read(cfgfile)
  stylename = config.get("global","stylename")
  sandbox_dir = config.get("global","sandbox_dir")
  map_template = config.get("global","map_template")
  
  # mod-wsgi gives control to our script only for /name and /name/...
  # thus any length <2 should show the overview page
  if len(pathinfo) < 2:
    return genSlippyMap(start_response)
  
  # check for valid tile URLs
  # whitelist for sandbox names: allow characters, numbers, - and _ only
  # two type of valid URLs:
  # /stylename/ for slipplymap
  # /stylename/z/x/y.png for tyle
  m = re.match(r"^/+([a-zA-Z0-9_\-]+)/*(.*)$", pathinfo)
  if m is None:
    msg="Invalid URL: %s<br />should be /&lt;sandbox-name&gt;/&lt;z&gt;/&lt;x&gt;/&lt;y&gt;.png" % pathinfo
    return InvalidURL(start_response,msg,'404 Invalid URL')
  
  sandbox=m.group(1) 
  # check for mapnik style file in requested sandbox
  if checkSandbox(sandbox):
    msg="ERROR: sandbox &gt;%s&lt; does not exist!!!" % sandbox
    return InvalidURL(start_response,msg,'404 Invalid sandbox')
    
  # the remaining possibilities are SlippyMap or Tile-URL
  if m.group(2) == '':
    return genSlippyMap(start_response,[m.group(1)])
  
  m = re.match(r"^([0-9]+)/+([0-9]+)/+([0-9]+).png$", m.group(2))
  if m is None:
    msg="Invalid URL: %s<br />should be /&lt;sandbox-name&gt;/&lt;z&gt;/&lt;x&gt;/&lt;y&gt;.png" % pathinfo
    return InvalidURL(start_response,msg,'404 Invalid URL')
    
  z=int(m.group(1))
  x=int(m.group(2))
  y=int(m.group(3))
  
  # check for mapnik style file in requested sandbox
  mapfile=sandbox_dir+"/"+sandbox+"/"+stylename
  if not os.path.exists(mapfile):
    msg="ERROR: sandbox &gt;%s&lt; does not exist!!!" % sandbox
    return InvalidURL(start_response,msg,'404 Invalid sandbox')
  
  # we have a valid Tile-URL request so just render the tile now
  m = mapnik.Map(256, 256)
  mapnik.load_map(m, mapfile)
  bba=TileToBBox(x,y,z)
  bbox=mapnik.Box2d(bba[0],bba[1],bba[2],bba[3])
  m.zoom_to_box(bbox)
  im = mapnik.Image(256, 256)
  mapnik.render(m, im)
  
  output = im.tostring('png')
  
  response_headers = [('Content-type', 'image/png'),
                      ('Content-Length', str(len(output)))]
  start_response(status, response_headers)
  return [output]
  