#!/usr/bin/python

""" MapCSS lexer """

import re
import ply.lex as lex

states = (
    ('condition', 'exclusive'),
    ('actionkey', 'exclusive'),
    ('actionvalue', 'exclusive'),
    ('tagvalue', 'exclusive'),
    ('import', 'exclusive'),
    ('eval', 'exclusive'),
)

tokens = (
    #Comments in C-style
    'COMMENT',
    
    #Rule sublect
    'SUBJECT',
    'SUBPART',
    'CLASS',
    'ZOOM',
    'MEMBEROF',
    
    #Conditions
    'LSQBRACE',
    'RSQBRACE',
    'SIGN',
    'NOT',
    'IDENTIFIER',

    #Actions
    'LCBRACE',
    'RCBRACE',  
    'KEY',
    'VALUE',
    'COLON',
    'SEMICOLON',
    'COMMA',
    'REGEX',
    'EXIT',
    'EQUALS',
    
    #Import
    'IMPORT',
    'URL',
    'PSEUDOCLASS',    
    
    #eval
    'EVAL',
    'LPAREN',
    'RPAREN',
    'STRING',
    'NUMBER',
    'OPERATION',
    'FUNCTION',
)

# Completely ignored characters
t_ANY_ignore  = ' \t'

t_SUBJECT = r'\w+|\*'
t_condition_SIGN = r'=~|<>|<=|>=|!=|<|>|='
t_condition_NOT = r'\!'
t_condition_IDENTIFIER = r'[^!<>=\[\]]+'
t_condition_REGEX = r'/\w+?/'
t_COMMA = r','
t_actionkey_KEY = r'[\w-]+'
t_actionkey_CLASS = r'\.\w+'
t_CLASS = r'\.\w+'
t_PSEUDOCLASS = r':\w+'
t_import_PSEUDOCLASS = r'\w+'

t_eval_NUMBER = r'\d+(\.\d+)?'
t_eval_OPERATION = r'\+|-|\*|\/|==|<>|!=|<=|>=|>|<|eq|ne|\.'
t_eval_FUNCTION = r'\w+'
t_eval_COMMA = r','

def t_MEMBEROF(t):
    r'>'
    return t

def t_SUBPART(t):
    r'::(:?[\w\d-]+|\*)'
    t.value = t.value[2:]
    return t

def t_eval_LPAREN(t):
    r'\('
    t.lexer.level += 1
    return t

def t_eval_RPAREN(t):
    r'\)'
    t.lexer.level -= 1
    if t.lexer.level == 0:
        t.lexer.begin('actionvalue')
    return t
    
def t_eval_STRING(t):
    r'"[^"\\]*(:?\\.[^"\\]*)*"'
    t.value = t.value[1:-1]
    return t

def t_tagvalue_EVAL(t):
    r'eval'
    t.lexer.begin('eval')
    t.lexer.level = 0
    return t
    
def t_actionvalue_EVAL(t):
    r'eval'
    t.lexer.begin('eval')
    t.lexer.level = 0
    return t

def t_actionvalue_VALUE(t):
    r'((?P<quote>["\'])[^"\\]*(:?\\.[^"\\]*)*(?P=quote))|([#:\w\-\.,\\\/ ]+)'
    t.value = t.value.strip(r'"\'')
    return t

def t_tagvalue_VALUE(t):
    r'((?P<quote>["\'])[^"\\]*(:?\\.[^"\\]*)*(?P=quote))|([#:\w\-\.,\\\/]+)'
    t.value = t.value.strip(r'"\'')
    return t

def t_import_SEMICOLON(t):
    r';'
    t.lexer.begin('INITIAL')
    return t

def t_IMPORT(t):
    r'@import'
    t.lexer.begin('import')
    return t

def t_import_URL(t):
    r'url\((?P<quote>["\'])([\w\-\.\\/]+)(?P=quote)\)'
    t.value = t.value[5:-2]
    return t

def t_ANY_COMMENT(t):
    r'/\*.*?\*/'
    pass
    
def t_ZOOM(t):
    r'\|(z|s)\d*(\-\d*)?'
    t.lexer.begin('INITIAL')
    return t

def t_actionkey_COLON(t):
    r':'
    t.lexer.begin('actionvalue')
    return t

def t_actionkey_SEMICOLON(t):
    r';'
    t.lexer.begin('actionkey')  
    pass

def t_actionkey_EQUALS(t):
    r'='
    t.lexer.begin('tagvalue')
    return t

def t_actionkey_EXIT(t):
    r'exit';
    t.lexer.begin('actionvalue')
    return t

def t_actionkey_RCBRACE(t):
    r'}'
    t.lexer.begin('INITIAL')
    return t

def t_actionvalue_SEMICOLON(t):
    r';'
    t.lexer.begin('actionkey')
    pass

def t_actionvalue_RCBRACE(t):
    r'}'
    t.lexer.begin('INITIAL')
    return t

def t_tagvalue_SEMICOLON(t):
    r';'
    t.lexer.begin('actionkey')  
    pass

def t_LCBRACE(t):
    r'{'
    t.lexer.begin('actionkey')
    return t

def t_LSQBRACE(t):
    r'\['
    t.lexer.begin('condition')
    return t

def t_condition_RSQBRACE(t):
    r'\]'
    t.lexer.begin('INITIAL')
    return t

# Error handling rule
def t_ANY_error(t):
    print "Illegal character '%s' at line %s" % (t.value[0], t.lexer.lineno)
    t.lexer.skip(1)

# Define a rule so we can track line numbers
def t_ANY_newline(t):
    r'\r?\n'
    t.lexer.lineno += 1
    
lexer = lex.lex(reflags=re.DOTALL)

if __name__ == '__main__':
    lex.runmain()
