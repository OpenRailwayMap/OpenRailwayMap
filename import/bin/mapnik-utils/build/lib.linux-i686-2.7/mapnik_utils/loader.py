import os
import sys
import timeit

from mapnik_utils.version_adapter import Mapnik

mapnik = Mapnik()


class Load(object):
    def __init__(self,mapfile,variables={},output_dir=None,from_string=False,verbose=False):
        self.mapfile = mapfile
        self.variables = variables
        self.from_string = from_string
        self.verbose = verbose
        if output_dir:
            self.output_dir = output_dir
        else:
            if self.mapfile.startswith('http'):
                self.output_dir = os.getcwd() #os.path.expanduser('~/.cascadenik')
            else:
                self.output_dir = os.path.dirname(self.mapfile)
        self.start_time = 0
        self.load_map_time = 0
        
        self.mapfile_types = {'xml':'XML mapfile','mml':'Mapnik Markup Language', 'py':'Python map variable'}
        if self.from_string:
            self.file_type = 'xml'
        else:
            self.file_type = self.get_type()
            self.validate()

    def timer(self):
        self.start_time = timeit.time.time()
    
    def stop(self):
        self.load_map_time = timeit.time.time() - self.start_time
        
    def validate(self):
        if not os.path.exists(self.mapfile) and not self.mapfile.startswith('http'):
            raise AttributeError('Map "%s" not found!' % os.path.abspath(self.mapfile))
        if not self.file_type in self.mapfile_types:
            raise AttributeError('Invalid mapfile type: only these extension allowed: %s' % ', '.join(self.mapfile_types.keys()))
        return True

    def get_type(self):
        if self.mapfile.endswith('xml'):
            return 'xml'
        elif self.mapfile.endswith('mml'):
            return 'mml'
        elif self.mapfile.endswith('py'):
            return 'py'
        else:
            raise ValueError("Unknown Mapfile type: '%s'" % self.mapfile)

    def variable_replace(self):
        import tempfile
        if self.from_string:
            mapfile_string = self.mapfile
        else:
            mapfile_string = open(self.mapfile).read()
        for line in mapfile_string.splitlines():
            for key,value in self.variables.items():
                line.replace(key,value)
        tmp = tempfile.NamedTemporaryFile(suffix='.xml', mode = 'w')
        tmp.write(mapfile_string)
        tmp.flush()
        return tmp.name

    def load_xml(self,m):
        if self.from_string:
            return mapnik.load_map_from_string(m,self.mapfile)
        else:
            return mapnik.load_map(m,self.mapfile)

    def load_mml(self,m):
        import cascadenik
        if hasattr(cascadenik,'VERSION'):
            major = int(cascadenik.VERSION.split('.')[0])
            if major < 1:
                from cascadenik import compile as _compile
                compiled = '%s_compiled.xml' % os.path.splitext(self.mapfile)[0]
                open(compiled, 'w').write(_compile(self.mapfile))
                mapnik.load_map(m, compiled)
            elif major == 1:
                cascadenik.load_map(m,self.mapfile,self.output_dir,verbose=self.verbose)
            elif major > 1:
                raise NotImplementedError('This nik2img version does not yet support Cascadenik > 1.x, please upgrade nik2img to the latest release')
        else:
            from cascadenik import compile as _compile
            compiled = os.path.join(self.output_dir,'%s_compiled.xml' % os.path.splitext(os.path.basename(self.mapfile))[0])
            output = _compile(self.mapfile)
            open(compiled, 'w').write(output)
            mapnik.load_map(m, compiled)

    def load_py(self,m,map_variable='m'):
        """
        Instanciate a Mapnik Map object from an external python script.
        """
        py_path = os.path.abspath(self.mapfile)
        sys.path.append(os.path.dirname(py_path))
        py_module = os.path.basename(py_path).replace('.py','')
        module = __import__(py_module)
        py_map = getattr(module,map_variable,None)
        if not py_map:
            raise ValueError('No variable found in python file with the name: "%s"' % map_variable)
        py_map.width = m.width
        py_map.height = m.height
        return py_map
          
    def load_mapfile(self,m):
        if self.variables:
            self.mapfile = self.variable_replace()
        load = getattr(self,'load_%s' % self.file_type)
        self.timer()
        load(m)
        self.stop()

    def build_map(self,width,height):
        m = mapnik.Map(width,height)
        if self.file_type == 'py':
            return self.load_py(m)
        else:
            self.load_mapfile(m)
            return m