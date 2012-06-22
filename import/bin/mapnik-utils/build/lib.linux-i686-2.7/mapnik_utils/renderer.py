import os
import sys
import timeit
import zipfile
import tempfile
from glob import glob

from mapnik_utils.version_adapter import Mapnik

mapnik = Mapnik()

from mapnik_utils.tools import call

try:
    import cairo
    HAS_CAIRO = True
    cairo_mapping = {'svg':cairo.SVGSurface,
                'pdf':cairo.PDFSurface,
                'ps':cairo.PSSurface,
                'ARGB32':cairo.FORMAT_ARGB32,
                'RGB24':cairo.FORMAT_RGB24
                }

except ImportError:
    HAS_CAIRO = False


# Win32 workaround graciously provided by crschmidt
# from http://svn.tilecache.org/trunk/tilecache/TileCache/Service.py
def binaryPrint(binary_data):
    """This function is designed to work around the fact that Python
       in Windows does not handle binary output correctly. This function
       will set the output to binary, and then write to stdout directly
       rather than using print."""
    try:
        import msvcrt
        msvcrt.setmode(sys.__stdout__.fileno(), os.O_BINARY)
    except:
        pass
    sys.stdout.write(binary_data)


class Render(object):
    def __init__(self,m,image,format,world_file_ext=None,zip_compress=False,scale_factor=None):
        
        self.m = m
        self.image = image
        self.format = format
        self.world_file_ext = world_file_ext
        self.zip_compress = zip_compress
        self.scale_factor = scale_factor
        
        self.start_time = 0
        self.render_time = 0
        
        self.ALL_FORMATS = {}
        self.AGG_FORMATS = {'png':'png','png256':'png','jpeg':'jpg','tif':'tif','tiff':'tif'}
        self.CAIRO_FILE_FORMATS = {'svg':'svg','pdf':'pdf','ps':'ps'}
        self.CAIRO_IMAGE_FORMATS = {'ARGB32':'png','RGB24':'png'}
        self.setup_formats()

    def timer(self):
        self.start_time = timeit.time.time()
    
    def stop(self):
        self.render_time = timeit.time.time() - self.start_time

    def setup_formats(self):
        self.ALL_FORMATS.update(self.AGG_FORMATS)
        self.ALL_FORMATS.update(self.CAIRO_FILE_FORMATS)
        self.ALL_FORMATS.update(self.CAIRO_IMAGE_FORMATS)
    
    def write_wld(self,rendered_image):
        path = os.path.splitext(rendered_image)[0]
        f_ptr = '%s.%s' % (path, self.world_file_ext)
        #sys.stderr.write('Saved world file to.. %s\n' % f_ptr)
        f = open(f_ptr, 'w')
        f.write(self.m.to_wld())
        f.close()
    
    def zip_up(self,rendered_image):
        path = os.path.splitext(rendered_image)[0]
        z_name = '%s.zip' % (path)
        zip_file = zipfile.ZipFile(z_name, 'w', zipfile.ZIP_DEFLATED)
        # all files of that same name (like a world file)
        # of variable ext other than other zip files
        files = glob('%s.*' % path)
        for item in files:
            if not item.endswith('zip'):
                zip_file.write(item, arcname=os.path.basename(item))
        #if readme:
        #    zip.writestr('README.txt',readme)
        zip_file.close()

    
    def stream(self): 
        """
        Routine to render the an image to a string
        """
        self.timer()
        im = mapnik.Image(self.m.width,self.m.height)
        if self.scale_factor:
            mapnik.render(self.m,im,self.scale_factor)
        else:
            mapnik.render(self.m,im)
        return im.tostring(self.format)
        self.stop()

    def print_stream(self):
        if sys.platform == 'win32':
            binaryPrint(self.stream())
        else:
            print self.stream() 

    def local_render_wrapper(self,*args):
        """
        Abstraction wrapper for calling for map images rendered with either AGG or Cairo.
        """        
        if args[2] in self.CAIRO_FILE_FORMATS and hasattr(mapnik,'mapnik_version') and mapnik.mapnik_version() < 700:
            self.render_with_pycairo(*args)
        # todo: support rendering to image formats with cairo
        #elif args[2] in self.CAIRO_IMAGE_FORMATS:
            #self.render_with_pycairo(*args)
        else:
            self.render_to_file(*args)

    def render_with_pycairo(self,*args):
        """
        Routine to render the requested Cairo format.
        """
        if not HAS_CAIRO:
            raise ImportError('PyCairo is not installed or available, therefore you cannot write to svg, pdf, ps, or cairo-rendered png')
        else:
            context = [args[1], self.m.width, self.m.height]
            if args[2] in self.CAIRO_FILE_FORMATS:
                surface = cairo_mapping[args[2]](*context)
            elif args[2] in self.CAIRO_IMAGE_FORMATS:
                surface = cairo.ImageSurface(cairo_mapping[args[2]], *context[1:])
            self.timer()
            mapnik.render(args[0],surface)
            if args[2] in self.CAIRO_IMAGE_FORMATS:
                surface.write_to_png(args[1])
            surface.finish()
            self.stop()
            if self.world_file_ext:
                self.write_wld(args[1])
            if self.zip_compress:
                self.zip_up(args[1])

    def call_all_cairo(self, basename):
        """
        Abstraction wrapper to allow for the same call
        to any image and file formats requested from Cairo.
        """
        if not HAS_CAIRO:
            raise ImportError('PyCairo is not installed or available, therefore you cannot write to svg, pdf, ps, or cairo-rendered png')
        else:
            for k, v in self.CAIRO_FILE_FORMATS.iteritems():
                path = '%s_%s.%s' % (basename,k,v)
                self.render_with_pycairo(self.m,path,k)
            for k, v in self.CAIRO_IMAGE_FORMATS.iteritems():
                path = '%s_%s.%s' % (basename,k,v)
                self.render_with_pycairo(self.m,path,k)

    def render_to_file(self,*args):
        """
        Routine to render the requested AGG format.
        """
        format = args[2]
        if format in ('tif','tiff'):
            self.timer()
            (handle, png_tmp) = tempfile.mkstemp('.png', 'nik2img-tmp')
            os.close(handle)
            self.world_file_ext = 'wld'
            self.write_wld(png_tmp)
            im = mapnik.Image(args[0].width,self.m.height)
            if self.scale_factor:
                mapnik.render(args[0],im,self.scale_factor)
            else:
                mapnik.render(args[0],im)
            im.save(png_tmp,'png')
            # todo - figure out more reasonable defaults
            opts = ' -ot Byte -co COMPRESS=JPEG -co JPEG_QUALITY=100'
            base_cmd = 'gdal_translate %s %s -a_srs "%s" %s'
            cmd = base_cmd % (png_tmp,args[1],args[0].srs,opts)
            #print call(cmd,fail=True)
            os.system(cmd)
            self.stop()
        else:
            self.timer()
            if self.scale_factor:
                args = args + (self.scale_factor,)
            mapnik.render_to_file(*args)
            if self.world_file_ext:
                self.write_wld(args[1])
            self.stop()
        if self.zip_compress:
            self.zip_up(args[1])
            
    def call_all_agg(self, basename):
        """
        Abstraction wrapper to allow for calling 
        any requested AGG Formats.
        """
        for k, v in self.AGG_FORMATS.iteritems():
            path = '%s_%s.%s' % (basename,k,v)
            self.render_to_file(self.m,path,k)
           
    def render_file(self): 
        """
        Routine to render the output image(s) for all requested formats and resolutions.
        """
        dirname, basename = os.path.dirname(self.image),os.path.basename(self.image)
        if basename:
            if not True in [self.image.split('.')[-1].lower() == ext for ext in self.ALL_FORMATS]:
                raise AttributeError("Unrecognized format (needs .ext) or directory (needs trailing /).")
        else:
            basename_from_dir = dirname.split('/')[-1]
            if not basename_from_dir: 
                basename_from_dir = 'nik2img_output'
            if dirname == '':
                raise IOError("Must write to either file or directory")
        if not os.path.exists(dirname) and dirname != '':
            try:
                os.mkdir(dirname)
            except OSError:
                os.makedirs(dirname)
        if not dirname.endswith('/'):
            dirname = dirname + '/'
        if self.format == 'all':
            if basename:
                raise IOError("Must write to a directory/ to produce all formats")
            else:                    
                self.call_all_agg(dirname + basename_from_dir)
                if HAS_CAIRO:
                    self.call_all_cairo(dirname + basename_from_dir)
        else:
            if not basename:
                self.local_render_wrapper(self.m, dirname + basename_from_dir + '.' + self.format.rstrip('256'), self.format)
            else:
                self.local_render_wrapper(self.m, self.image, self.format)