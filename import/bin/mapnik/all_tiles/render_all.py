#!/usr/bin/python

import fileinput
from math import pi,cos,sin,log,exp,atan
from subprocess import call

DEG_TO_RAD = pi/180
RAD_TO_DEG = 180/pi

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


import os
from PIL.Image import fromstring, new
from PIL.ImageDraw import Draw
from StringIO import StringIO
from mapnik import *


mapfile = "/home/steve/osm.xml"
tile_dir = '/tmp/tiles/'
maxZoom = 18

gprj = GoogleProjection(maxZoom+1)
m = Map(2 * 256,2 * 256)
load_map(m,mapfile)
prj = Projection("+proj=merc +datum=WGS84")



def dotile(z,x,y):
	x_str = "%s" % x
	y_str = "%s" % y
	z_str = "%s" % z

	p0 = gprj.fromPixelToLL((x * 256, (y+1) * 256),z)
	p1 = gprj.fromPixelToLL(((x+1) * 256, y*  256),z)

	print z,x,y,p0,p1
	# render a new tile and store it on filesystem
	c0 = prj.forward(Coord(p0[0],p0[1]))
	c1 = prj.forward(Coord(p1[0],p1[1]))
			
	bbox = Envelope(c0.x,c0.y,c1.x,c1.y)
	bbox.width(bbox.width() * 2)
	bbox.height(bbox.height() * 2)
	m.zoom_to_box(bbox)

	if not os.path.isdir(tile_dir + z_str):
			os.mkdir(tile_dir + z_str)
	if not os.path.isdir(tile_dir + z_str + '/' + x_str):
		os.mkdir(tile_dir + z_str + '/' + x_str)

	tile_uri = tile_dir + z_str + '/' + x_str + '/' + y_str + '.png'
	im = Image(512, 512)
	render(m, im)
	im = fromstring('RGBA', (512, 512), rawdata(im))
	im = im.crop((128,128,512-128,512-128))
	fh = open(tile_uri,'w+b')
	im.save(fh, 'PNG', quality=100)
	command = "convert  -colors 255 %s %s" % (tile_uri,tile_uri)
	call(command, shell=True)

for line in fileinput.input():
	tile_data = line.rstrip('\n').split(':')
	dotile(eval(tile_data[0]), eval(tile_data[1]), eval(tile_data[2]))


