# -*- coding: utf-8 -*-

import mapnik

m = mapnik.Map(1,1)
mapnik.load_map(m,'tests/mapfile_wgs84.xml')

pds = mapnik.PointDatasource()
pds.add_point(-121.9155,37.3335,'Name','San José')

# create label symbolizers
if mapnik.mapnik_version() >= 800:
    text = mapnik.TextSymbolizer(mapnik.Expression('[Name]'),'DejaVu Sans Bold',12,mapnik.Color('black'))
else:
    text = mapnik.TextSymbolizer('Name','DejaVu Sans Bold',12,mapnik.Color('black'))

text.allow_overlap = True
text.displacement(30,-40)
text.halo_radius = 2
text.halo_fill = mapnik.Color(255,255,255,25)

# create point symbolizer for blue icons
if mapnik.mapnik_version() >= 800:
    point = mapnik.PointSymbolizer(mapnik.PathExpression('tests/y.png'))
else:
    point = mapnik.PointSymbolizer('tests/y.png','png',50,50)
    
point.allow_overlap = True

s = mapnik.Style()
r = mapnik.Rule()
r.symbols.append(point)
r.symbols.append(text)

s.rules.append(r)

lyr = mapnik.Layer('Memory Datasource')
lyr.datasource = pds
lyr.styles.append('Style')
m.layers.append(lyr)
m.append_style('Style',s)

