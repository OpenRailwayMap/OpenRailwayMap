#!/usr/bin/python

"""A simple script to help visualize the Mapnik stylesheet. This file puts
   out poly/line symbols into an HTML file, with their associated filters.
   Not particularly complex at the moment, but a useful visualization tool if
   you're hacking on the osm.xml file. Works against the osm-template.xml
   at the moment."""

__author__ = "Christopher Schmidt"
__license__ = "Public Domain"


import xml.dom.minidom as m

def run():
    """Parses the osm-template.xml file, and `print`s out an HTML table.""" 
    doc = m.parse("osm-template.xml")
    styles = doc.getElementsByTagName("Style")
    for style in styles:
        table_started = False
        for r in style.getElementsByTagName("Rule"):
            filters = r.getElementsByTagName("Filter")
            text = ""
            if len(filters):
                text = filters[0].firstChild.nodeValue
            polys = r.getElementsByTagName("PolygonSymbolizer")     
            poly_text = [] 
            poly_style = {}
            if len(polys):
                css = polys[0].getElementsByTagName("CssParameter")
                for c in css:
                    poly_style[ c.getAttribute("name") ] = c.firstChild.nodeValue
            pfill = r.getElementsByTagName("PolygonPatternSymbolizer")
            if len(pfill):
                pfill = pfill[0]
                poly_style['fill'] = '<img src="%s" title="%s"/>' % (pfill.getAttribute("file").replace("%SYMBOLS_DIR%", "symbols"), pfill.getAttribute("file").replace("%SYMBOLS_DIR%", "symbols"))
            for key, value in poly_style.items():
                poly_text.append("%s: %s" % (key, value))
            poly_text = "<br />".join(poly_text)
            lines = r.getElementsByTagName("LineSymbolizer")     
            line_text = [] 
            line_style = {}
            if len(lines):
                css = lines[0].getElementsByTagName("CssParameter")
                for c in css:
                    line_style[ c.getAttribute("name") ] = c.firstChild.nodeValue
                for key, value in line_style.items():
                    line_text.append("%s: %s" % (key, value))
            line_text = "<br />".join(line_text)
            if text and (poly_text or line_text):
                if not table_started:
    
                    print "<h2>%s</h2>" % style.getAttribute("name").title()
                    print "<table><tr><td>filter</td><td>poly</td><td>stroke</td></tr>"
                    table_started = True
                print "<tr><td>%s</td>" % text
                print "<td style='background-color: %s'>%s</td>" % (poly_style.get('fill', ''),  poly_text)    
                print "<td style='background-color: %s'>%s</td></tr>" % (line_style.get('stroke', ''),  line_text)    
    
        if table_started:
            print "</table>"
if __name__ == "__main__":
    run()
