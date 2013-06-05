import lex
import parse

from ply import *

class MapCSSParser:
    def __init__(self, debug = False):
        self.debug = debug

    def parse(self, content):
        if self.debug:
            lexer = lex.lexer
            lexer.input(content)

            while True:
                tok = lexer.token()
                if not tok: 
                    break      # No more input
                print tok            
        
        return yacc.parse(content)
        

