class Mapnik:
    """ Mapnik Singleton to allow for just a single import of mapnik,
    either old mapnik or mapnik2.
    
    For allowing nik2img full control over version based on command line arg.
    
    Also, to avoid pitfall of double import:

    >>> import mapnik
    >>> import mapnik2
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
      File "/Library/Python/2.5/site-packages/mapnik2/__init__.py", line 54, in <module>
        from _mapnik2 import *
    RuntimeError: unidentifiable C++ exception
    
    Oh Singletons: http://lucumr.pocoo.org/2009/7/24/singletons-and-their-problems-in-python
    
    """
    
    class __impl:
        """Single Mapnik instance"""
        
        def get_version(self):
            return self.version 

    __instance = None
    __version = None

    def __init__(self,version=None):
        if Mapnik.__instance is None:
            if version in (None, 2):
                if version is None:
                    try:
                        import mapnik2
                        Mapnik.__instance = mapnik2
                    except:
                        import mapnik
                        Mapnik.__instance = mapnik
                else:
                    import mapnik2
                    Mapnik.__instance = mapnik2
            else:
                import mapnik
                Mapnik.__instance = mapnik
            
            
            # only major breakage in python bindings with mapnik2 (so far)
            if not hasattr(Mapnik.__instance,'Envelope'):
                Mapnik.__instance.Envelope = Mapnik.__instance.Box2d

            # bring 0.5.x series python bindings up to 0.6.x
            if not hasattr(Mapnik.__instance,'mapnik_version'):
                from mapnik_utils import compatibility 

            # extent mapnik objects 
            from mapnik_utils import metaclass_injectors

            Mapnik.__version = version

        # Store instance reference as the only member in the handle
        self.__dict__['_Mapnik__instance'] = Mapnik.__instance
        

    def __getattr__(self, attr):
        return getattr(self.__instance, attr)

    def __setattr__(self, attr, value):
        return setattr(self.__instance, attr, value)