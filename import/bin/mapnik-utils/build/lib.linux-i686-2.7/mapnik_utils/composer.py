from mapnik_utils.version_adapter import Mapnik

mapnik = Mapnik()

import os
import sys
import platform
from timeit import time
from pdb import set_trace

# mapnik_utils
from subprocess import Popen
from mapnik_utils.renderer import Render
from mapnik_utils.loader import Load
from mapnik_utils.tools import call, color_text, color_print


class Compose(object):
    """
    """
    def __init__(self,mapfile,**kwargs):
        """
        """
        self.mapfile = mapfile

        self.image = None
        self.format = 'png'
        self.width = 600
        self.height = 400
        self.bbox = None
        self.zoom = None
        self.center = None
        self.radius = None
        self.zoom_to_layers = None
        self.extent = None
        self.max_extent = None
        self.bbox_factor = None
        self.srs = None
        self.layers = None
        self.re_render_times = None
        self.post_step_pause = None
        self.max_resolution = None
        self.find_and_replace = None
        self.world_file = None
        self.fonts = []
        self.save_xml = None
        self.app = None
        self.dry_run = False
        self.from_string = False
        self.zip_compress = False
        self.changed = []
        self.font_handler = None
        self.map = None
        self.rendered = False
        self.verbose = False
        self.scale_factor = None
        self.aspect_fix_mode = None
        
        self.start_time = 0
        self.load_map_time = 0
        
        if kwargs:
            self.handle_options(kwargs)

        if not self.verbose:
            self.msg = self.quiet
        self.prepare()
        self.setup()
        self.build()

    def handle_options(self,options):
        for opt in options.items():
            if opt[1] is not None and hasattr(self,opt[0]):
                setattr(self,opt[0],opt[1])
                self.changed.append(opt[0])

    def prepare(self):
        self.format = self.format.replace('image/','')
        self.mime = 'image/%s' % self.format.replace('256','')
        if self.fonts:
            self.register_fonts()

    def setup(self):
        pass

    def output_error(self, msg, E=None):
        if E:
            msg += E
        raise sys.exit(msg)

    def msg(self, msg, warn=False):
        sys.stderr.write('%s\n' % msg)

    def quiet(self, msg):
        pass

    def register_fonts(self):
        self.msg('Registering fonts...')
        from fonts import FontHandler
        self.font_handler = FontHandler()
        self.font_handler.add_fonts(self.fonts)
        if self.font_handler.failed:
            self.msg("Failed to register: '%s'" % self.font_handler.failed)

    def build(self):
        self.msg('Loading mapfile...')
        
        builder = Load(self.mapfile,variables={},from_string=self.from_string,verbose=self.verbose)
        if not self.from_string:
            self.msg('Loaded %s...' % self.mapfile)
        else:
            self.msg('Loaded XML from string')
        self.map = builder.build_map(self.width,self.height)

        if self.srs:
            self.msg('Setting srs to: %s' % self.srs)
            self.map.set_easy_srs(self.srs)

        if self.layers:
            selected, disactivated = self.map.select_layers(self.layers)
            self.msg('Selected layers: %s' % selected)
            if not selected:
                self.output_error('Layer not found: available layers are: "%s"' % ',  '.join(disactivated))
                
        # set up behavior for fixing relationship between map aspect and bbox aspect
        if self.aspect_fix_mode:
            if not hasattr(self.map, 'aspect_fix_mode'):
                self.output_error('Your version of Mapnik does not support setting the aspect_fix_mode (only available in >= Mapnik 0.6.0')
            try:
                mode = getattr(mapnik.aspect_fix_mode,self.aspect_fix_mode.upper())
            except AttributeError:
                self.output_error('Error setting aspect_fix_mode, accepted values are: %s' % ', '.join(mapnik.aspect_fix_mode.names.keys()))
            
            self.map.aspect_fix_mode = mode

        # zoom to max extent at beginning if we later need to 
        # zoom to a center point
        # or need to zoom to a zoom-level
        self.msg('Setting Map view...')
        
        if self.center or not self.zoom is None:
            if self.max_extent:
                self.msg('Zooming to max extent: %s' % self.max_extent) 
                self.map.zoom_to_box(mapnik.Envelope(*self.max_extent))
            else:
                self.map.zoom_max()
                self.msg('Zoomed to *estimated* max extent: %s' % self.map.envelope()) 

        if self.center and not self.zoom is None:
            self.msg('Zooming to Center (%s) and Zoom Level "%s"' % (self.center,self.zoom))
            self.map.set_center_and_zoom(self.center[0],self.center[1],self.zoom)
        elif self.center and self.radius:
            self.msg('Zooming to Center (%s) and Radius "%s"' % (self.center,self.radius))
            self.map.set_center_and_radius(self.center[0],self.center[1],self.radius)
        elif not self.zoom is None:
            self.msg('Zooming to Zoom Level "%s"' % (self.zoom))
            self.map.zoom_to_level(self.zoom)
        elif self.zoom_to_layers:
            self.msg('Zooming to Layers: "%s"' % (self.zoom_to_layers))
            self.map.activate_layers(self.zoom_to_layers)
            if len(self.zoom_to_layers) > 1:
                self.map.zoom_to_layers(self.zoom_to_layers)
            else:
                self.map.zoom_to_layer(self.zoom_to_layers[0])
        else:
            if self.extent:
                env = mapnik.Envelope(*self.extent)
                self.msg('Zooming to custom projected extent: "%s"' % env)
                self.map.zoom_to_box(env)
                from_prj = mapnik.Projection(self.map.srs)
                to_prj = mapnik.Projection('+proj=latlong +datum=WGS84')
                bbox = env.transform(from_prj,to_prj)
                self.msg('Custom extent in geographic coordinates: "%s"' % bbox)
            elif self.bbox:
                env = mapnik.Envelope(*self.bbox)
                self.msg('Zooming to custom geographic extent: "%s"' % env)
                from_prj = mapnik.Projection('+proj=latlong +datum=WGS84')
                to_prj = mapnik.Projection(self.map.srs)
                self.map.zoom_to_box(env.transform(from_prj,to_prj))
            else:
                self.map.zoom_all()
                self.msg('Zoom to extent of all layers: "%s"' % self.map.envelope())
        
        if self.bbox_factor:
            if self.bbox_factor > 0:
                bbox = self.map.envelope() * self.bbox_factor
            else:
                bbox = self.map.envelope() / self.bbox_factor
            self.map.zoom_to_box(bbox)
            self.msg('Adjusting final extent by factor of %s: "%s"' % (self.bbox_factor,self.map.envelope()))
            
        self.msg('Finished setting extents...')
        
        if self.save_xml:
            mapnik.save_map(self.map,self.save_xml)
        
        return builder

    def render(self):
        if not self.map:
            self.build()
        
        if self.dry_run:
            self.output_error("Dry run completed successfully...")

        renderer = Render(self.map,self.image,self.format,self.world_file,self.zip_compress,self.scale_factor)
        if not self.image == '-':
            renderer.render_file()
        else:
            renderer.print_stream()
        self.rendered = True
        return renderer
    
    def open(self, app=None):
        """
        Routine to open the rendered image or folder of images from the filesystem.
        """
        self.render()
        if not app and self.app:
            app = self.app
        if os.name == 'nt':
            if app:
                self.msg('Overriding default image viewer not supported on Win32')
            call('start %s' % self.image.replace('/','\\'))
        elif platform.uname()[0] == 'Linux':
            if app:
                call('%s %s' % (app,self.image))
            else:
                # make blind and dumb attempt to open images, but don't block while open
                try:
                    cmd = 'xdg-open %s' % self.image
                    Popen(cmd.split(' '))
                except OSError:
                    try:
                        cmd = 'gthumb %s' % self.image
                        Popen(cmd.split(' '))
                    except OSError:
                        try:
                            cmd = 'display %s' % self.image
                            Popen(cmd.split(' '))
                        except OSError:
                            pass
        elif platform.uname()[0] == 'Darwin':
            if app:
                call('open %s -a %s' % (self.image, app))
            else:
                call('open %s' % self.image)


class ComposeDebug(Compose):
    """
    """
    def __init__(self,mapfile,**kwargs):
        self.no_color = kwargs.get('no_color')   
        self.pause = kwargs.get('pause')
        self.trace_steps = kwargs.get('trace_steps')
        self.verbose = kwargs.get('verbose')

        self.timing_started = False
        self.step_counter = 1
        self.start_time = 0

        Compose.__init__(self,mapfile,**kwargs)

    def setup(self):
        if self.trace_steps and not self.verbose:
            self.verbose = True
            self.debug_msg('PDB trace requested, automatically entering verbose mode')

    def prepare(self):
        super(ComposeDebug,self).prepare()
        self.timing_started = True
        self.start_time = time.time()
        self.debug_msg('Nik2img starting...')
        self.debug_msg('Format: %s' % self.format)
        #self.debug_msg('mime: %s' % self.mime)

    def build(self):
        #try:
        builder = super(ComposeDebug,self).build()
        #except Exception, E:
        #    self.output_error(E)        
        self.last_step('Loading map took... ', builder.load_map_time)
        if self.verbose:
            self.debug_msg('SRS: %s' % self.map.srs)
            if self.map.proj_obj.srid:
                self.debug_msg('SRID: %s' % self.map.proj_obj.srid)
            self.debug_msg('Map extent: %s' % self.map.envelope())
            self.debug_msg('Map long/lat bbox: %s' % self.map.lon_lat_bbox())
            self.debug_msg('Map center: %s' % self.map.envelope().center())
            self.debug_msg('Map long/lat center: %s' % self.map.lon_lat_bbox().center())
            self.debug_msg('Map scale denominator: %s' % self.map.scale_denominator())
            if self.layers:
                self.debug_msg('Active layers: %s' % self.map.active_layers())
            if self.map.layers_bounds():
                self.debug_msg('Extent of all layers: %s' % self.map.layers_bounds())
                self.debug_msg('Long/lat extent of all layers: %s' % self.map.lon_lat_layers_bounds())
                self.debug_msg('Long/lat center of all layers: %s' % self.map.lon_lat_layers_bounds().center())
    
            lyrs = self.map.intersecting_layers()
            if not len(lyrs):
                self.debug_msg("No layers intersecting map!",warn=True)
            else:
                self.debug_msg("Layers intersecting map: [%s]" % ', '.join([l.name for l in lyrs]))
            self.debug_msg("At current scale of '%s'..." % self.map.scale())
            for lyr in lyrs:
                if not lyr.visible(self.map.scale_denominator()):
                    self.debug_msg("Layer '%s' is NOT visible" % lyr.name,warn=True)
                else:
                    self.debug_msg("layer '%s' is visible" % lyr.name)
                # crashing in filter on os x...
                #    rules = ', '.join(['%s:%s (%s -> %s)' % (r.parent,str(r.filter)[:10],r.min_scale,r.max_scale) for r in lyr.active_rules])
                #    self.debug_msg('active rules for %s: %s' % (l.name,rules))
                
        
    def render(self):
        if not self.map:
            self.debug_msg('Calling build from render...')
        self.debug_msg('Starting rendering...')            
        #try:
        renderer = super(ComposeDebug,self).render()
        #except Exception, E:
        #    self.output_error(E)
        self.last_step('Rendering image took... ', renderer.render_time)
        self.debug_msg('Finished rendering map to... %s' % self.image)
        self.total_time()

    def register_fonts(self):
        super(ComposeDebug,self).register_fonts()
        if len(self.font_handler.added):
            self.debug_msg("Registered: '%s'" % self.font_handler.added)
        elif len(self.font_handler.failed):
            self.debug_msg("Available fonts are: '%s'" % self.font_handler.available,warn=True)
      
    def output_error(self, msg, E=None):
        if E:
            sys.stderr.write(color_text(1, '// --> %s: \n\t %s\n' % (msg, E),self.no_color))
        else:
            sys.stderr.write(color_text(1, '// --> %s \n' % msg,self.no_color))
        sys.exit(1)

    def msg(self, msg, warn=False):
        self.debug_msg(msg,warn=warn)

    def debug_msg(self, msg, warn=False):
        """
        Output a colored message or warning, incrementing the step_counter
        to enable a pdb trace to be set at any point a verbose message is printed.
        """
        color = 2
        if warn:
            color = 1
        if self.verbose:
            text = 'Step: %s // --> %s\n' % (self.step_counter, msg)
            sys.stderr.write(color_text(color,text,self.no_color))
        if self.pause:
            for second in range(1, (int(self.pause)+1)):
                sys.stderr.write('%s ' % color_text(5,second,self.no_color))
                time.sleep(1)
                sys.stderr.flush()
            sys.stderr.write('... \n')
        if self.trace_steps:
            if self.step_counter in self.trace_steps:
                try:
                    print ">>> Entering PDB interpreter (press 'c' to leave)"
                    set_trace()
                except KeyboardInterrupt:
                    pass
        self.step_counter += 1

    def get_time(self, time):
        """
        Get the time and either seconds or minutes format.
        """
        if time/60 < 1:
            seconds = '%s seconds' % str(time)
            return seconds
        else:
            minutes = '%s minutes' % str(time/60)
            return minutes
    
    def total_time(self, last_step=None):
        if self.verbose:
            total = (time.time() - self.start_time)
            out = 'Total Nik2img run time: %s' % (self.get_time(round(total,4)))
            if last_step:
                out += '| Last step: %s'% self.get_time(round(last_step,8))
            val = color_text(4,out,self.no_color)
            sys.stderr.write('%s\n' % val)

    def last_step(self,msg,timing):
        if self.verbose:
            out = '%s %s' % (msg, self.get_time(round(timing,4)))
            val = color_text(4,out,self.no_color)
            sys.stderr.write('%s\n' % val)