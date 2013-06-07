#!/usr/bin/python

import sys
import os
import re
import Image

import cairo
import tempfile
import StringIO
import rsvg

from mapcss_parser import MapCSSParser
from mapcss_parser import ast


CHECK_OPERATORS = {
    '=': '==',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>=',
    '!=': '!==',
    '<>': '!==',
}

DASH_PROPERTIES = ('dashes', 'casing-dashes')
NUMERIC_PROPERTIES = (
    'z-index',
    'width',
    'opacity',
    'fill-opacity',
    'casing-width',
    'casing-opacity',
    'text-offset',
    'max-width',
    'text-halo-radius'
)

images = set()
subparts = set(['default'])
presence_tags = set()
value_tags = set()

def open_svg_as_image(fn):
     tmpfd, tmppath = tempfile.mkstemp(".png")
     tmpfile = os.fdopen(tmpfd,'w')

     file = StringIO.StringIO()
     
     
     svg = rsvg.Handle(file=fn)
     
     svgwidth = svg.get_property('width')
     svgheight = svg.get_property('height')
     svgsurface = cairo.SVGSurface(file, svgwidth, svgheight)
     svgctx = cairo.Context(svgsurface)
     #size = max(24, svgwidth, svgheight)
     #svgctx.scale(size/float(svgwidth),height/float(svgheight))
     svg.render_cairo(svgctx)

     svgsurface.write_to_png(tmpfile)
     tmpfile.close()
     svgsurface.finish()

     im = Image.open(tmppath)
     os.remove(tmppath)
     return im


def wrap_key(key):
	return "'%s'" % key

def propagate_import(url):
    content = open(url).read()
    return parser.parse(content)

def escape_value(key, value, subpart):
    if isinstance(value, ast.Eval):
        return value.as_js(subpart)
    elif key in NUMERIC_PROPERTIES:
        if float(value) % 1 != 0.0:
            return float(value)
        else:
            return int(float(value))
    elif key in DASH_PROPERTIES:
        return "[%s]" % ', '.join(value.split(','))
    else:
        return "'%s'" % value

def mapcss_as_aj(self):
    imports = "".join(map(lambda imp: propagate_import(imp.url).as_js, self.imports))
    rules = "".join(map(lambda x: x.as_js(), self.rules))
    return "%s%s" % (imports, rules)

def rule_as_js(self):
    selectors_js = []
    actions_js = []
    for selector in self.selectors:
        selectors_js.append("(%s%s)" % (selector.as_js(), selector.get_zoom()))

    for action in self.actions:
        actions_js.append(action.as_js(selector.subpart))

    return """\n        if (%s) %s""" % (" || ".join(selectors_js), "".join(actions_js))

def selector_as_js(self):
    criteria = " && ".join(map(lambda x: x.as_js(), self.criteria))

    if self.subject == 'line':
        self.subject = 'way'
    if self.subject in ['node', 'way', 'relation', 'coastline']:
        subject_property = 'type'
    else:
        subject_property = 'selector'

    #TODO: something > something is not supported yet
    if self.within_selector:
        return 'false'

    if self.criteria:
        return "(%s == %s && %s)" % (subject_property, wrap_key(self.subject), criteria)
    else:
        return "%s == %s" % (subject_property, wrap_key(self.subject))

def condition_check_as_js(self):
    value_tags.add(wrap_key(self.key))
    k = wrap_key(self.key)
    if self.value == 'yes' and self.sign == '=':
        return "(tags[%s] == '1' || tags[%s] == 'true' || tags[%s] == 'yes')" % (k, k, k)
    elif self.value == 'yes' and (self.sign == '!=' or self.sign == '<>'):
        return "(tags[%s] == '-1' || tags[%s] == 'false' || tags[%s] == 'no')" % (k, k, k)
    else:
        return "tags[%s] %s %s" % (k, CHECK_OPERATORS[self.sign], wrap_key(self.value))

def condition_tag_as_js(self):
    presence_tags.add(wrap_key(self.key))
    return "(tags.hasOwnProperty(%s))" % (wrap_key(self.key))

def condition_nottag_as_js(self):
    presence_tags.add(wrap_key(self.key))
    return "(!tags.hasOwnProperty(%s))" % (wrap_key(self.key))
    
def condition_pseudoclass_as_js(self):
    #TODO: Not supported yet
    return "true"

def action_as_js(self, subpart):
    if len(filter(lambda x: x, map(lambda x: isinstance(x, ast.StyleStatement), self.statements))) > 0:
        if subpart == '*':
            subpart = 'everything'
        subpart = re.sub("-", "_", subpart)
        if subpart != "default":
			subparts.add(subpart)

        return """{
%s
        }\n""" % ("\n".join(map(lambda x: x.as_js(subpart), self.statements)))
    else:
        return "{\n    %s\n    }" % "\n".join(map(lambda x: x.as_js(), self.statements))

def style_statement_as_js(self, subpart):
    val = escape_value(self.key, self.value, subpart)
    k = wrap_key(self.key)
    if self.key == 'text':
        value_tags.add(val)
        return "            s_%s[%s] = MapCSS.e_localize(tags, %s);" % (subpart, k, val)
    else:
        if self.key in ('icon-image', 'fill-image'):
            images.add(self.value)
        return "            s_%s[%s] = %s;" % (subpart, k, val)

def tag_statement_as_js(self, subpart):
    k = wrap_key(self.key)
    return "            tags[%s] = %s" % (k, escape_value(self.key, self.value, subpart))

def eval_as_js(self, subpart):
    return self.expression.as_js(subpart)

def eval_function_as_js(self, subpart):
    args = ", ".join(map(lambda arg: arg.as_js(subpart), self.arguments))
    if self.function == 'tag':
        return "MapCSS.e_tag(tags, %s)" % (args)
    elif self.function == 'prop':
        return "MapCSS.e_prop(s_%s, %s)" % (subpart, args)
    else:
        return "MapCSS.e_%s(%s)" % (self.function, args)

def eval_string_as_js(self, subpart):
    return str(self)

def eval_op_as_js(self, subpart):
    op = self.operation
    if op == '.':
        op = '+'

    if op == 'eq':
        op = '=='

    if op == 'ne':
        op = '!='

    return "%s %s %s" % (self.arg1.as_js(subpart), self.operation, self.arg2.as_js(subpart))

def eval_group_as_js(self, subpart):
    return "(%s)" % str(self.expression.as_js(subpart))

def selector_get_zoom(self):
    zoom = self.zoom
    zoom = zoom.strip("|")
    if zoom and zoom[0] == 'z':
        zoom = zoom[1:].split('-')
        if len(zoom) == 1:
            return ' && zoom === %d' % int(zoom[0])

        cond = ''
        if zoom[0]:
            cond += ' && zoom >= %d' % int(zoom[0])
        if zoom[1]:
            cond += ' && zoom <= %d' % int(zoom[1])
        return cond

    return ''

def create_css_sprite(image_names, icons_path, sprite_filename):
    sprite_images = []
    external_images = []
    image_width = []
    image_height = []
    for fname in sorted(image_names):
        fpath = os.path.join(icons_path, fname)
        if not os.path.isfile(fpath):
            external_images.append(fname)
            continue
        

        if '.svg' in fpath:
            image = open_svg_as_image(fpath)
        else:
            image = Image.open(fpath)
        sprite_images.append({
            'name': fname,
            'size': image.size,
            'image': image,
        })
        image_width.append(image.size[0])
        image_height.append(image.size[1])

    if not sprite_images:
        return (sprite_images, external_images)

    sprite_size = (max(image_width), sum(image_height))
    sprite = Image.new(
        mode='RGBA',
        size=sprite_size,
        color=(0,0,0,0))

    offset = 0
    for data in sprite_images:
        data['offset'] = offset
        sprite.paste(data['image'], (0, offset))
        offset += data['size'][1]
    sprite.save(sprite_filename)

    return (sprite_images, external_images)

def image_as_js(image):
    return """
        '%s': {
            width: %d, 
            height: %d, 
            offset: %d
        }""" % (
        image['name'],
        image['size'][0],
        image['size'][1],
        image['offset']
    )

ast.MapCSS.as_js = mapcss_as_aj
ast.Rule.as_js = rule_as_js
ast.Selector.as_js = selector_as_js
ast.Selector.get_zoom = selector_get_zoom
ast.ConditionCheck.as_js = condition_check_as_js
ast.ConditionTag.as_js = condition_tag_as_js
ast.ConditionNotTag.as_js = condition_nottag_as_js
ast.ConditionPseudoclass.as_js = condition_pseudoclass_as_js
ast.Action.as_js = action_as_js
ast.StyleStatement.as_js = style_statement_as_js
ast.TagStatement.as_js = tag_statement_as_js
ast.Eval.as_js = eval_as_js

ast.EvalExpressionString.as_js = eval_string_as_js
ast.EvalExpressionOperation.as_js = eval_op_as_js
ast.EvalExpressionGroup.as_js = eval_group_as_js
ast.EvalFunction.as_js = eval_function_as_js

if __name__ == "__main__":
    from optparse import OptionParser
    parser = OptionParser(usage="%prog [options]")

    parser.add_option("-i", "--mapcss",
        dest="input",
        help="MapCSS input file, required")

    parser.add_option("-n", "--name",
        dest="name",
        help="MapCSS style name, optional")

    parser.add_option("-o", "--output",
        dest="output",
        help="JS output file. If not specified [stylename].js will be used")

    parser.add_option("-p", "--icons-path",
        dest="icons", default=".",
        help="Directory with the icon set used in MapCSS file")

    parser.add_option("-s", "--output-sprite",
        dest="sprite",
        help="Filename of generated CSS sprite. If not specified, [stylename].png will be uesed")

    (options, args) = parser.parse_args()

    if not options.input:
        print "--mapcss parameter is required"
        raise SystemExit

    if options.name:
        style_name = options.name
    else:
        style_name = re.sub("\..*", "", options.input)

    content = open(options.input).read()
    parser = MapCSSParser(debug=False)
    mapcss = parser.parse(content)

    mapcss_js = mapcss.as_js()
    subparts_var = ", ".join(map(lambda subpart: "s_%s = {}" % subpart, subparts))
    subparts_var = "        var %s;" % subparts_var
    subparts_fill = "\n".join(map(lambda subpart: "        if (!K.Utils.isEmpty(s_%s)) {\n            style['%s'] = s_%s; }" % (subpart, subpart, subpart), subparts))
    js = """
(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
%s
%s
%s
        return style;
    }
    """ % (subparts_var, mapcss_js, subparts_fill)

    if options.sprite:
        sprite = options.sprite
    else:
        sprite = "%s.png" % style_name

    if options.output:
        output = options.output
    else:
        output = "%s.js" % style_name

    (sprite_images, external_images) = create_css_sprite(images, options.icons, sprite)

    #We don't need to check presence if we already check value
    presence_tags -= value_tags

    js += """
    var sprite_images = {%s
    }, external_images = [%s], presence_tags = [%s], value_tags = [%s];

    MapCSS.loadStyle('%s', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('%s');
})(MapCSS);
    """ % (
            ",".join(map(image_as_js, sprite_images)),
            ", ".join(map(lambda i: "'%s'" % i, external_images)),
            ", ".join(presence_tags),
            ", ".join(value_tags),
            style_name,
            style_name)

    with open(output, "w") as fh:
        fh.write(js)

