#!/usr/bin/python

"""
MapCSS data model. This is "as is" object representation of MapCSS file
"""

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        # not numeric
        return False
    

class MapCSS:
    """
    MapCSS file representation
    """
    def __init__(self):
        self.rules = []
        self.imports = []
    
    def append_rule(self, rule):
        self.rules.append(rule)

    def append_import(self, imp):
        self.imports.append(imp)
        
    def __str__(self):
        imports = "\n".join(map(str, self.imports))
        rules = "\n".join(map(str, self.rules))
        return "%s%s" % (imports, rules)
        
class Import:
    def __init__(self, url, pseudoclass=None):
        self.url = url
        self.pseudoclass = pseudoclass

    def __str__(self):  
        if self.pseudoclass:
            return "@import url(\"%s\") %s;" % (self.url, self.pseudoclass)
        else:
            return "@import url(\"%s\");" % (self.url)
        
class Rule:
    def __init__(self, selectors, actions):
        self.selectors = selectors
        self.actions = actions

    def __str__(self):
        actions = "\n".join(map(str, self.actions))
        selectors = ", \n".join(map(str, self.selectors))
        return "%s%s" % (selectors, actions)
        
class Selector:
    def __init__(self, subject, zoom='', subpart='default'):
        self.subject = subject
        self.zoom = zoom
        self.criteria = []
        self.parent = None
        self.subpart = subpart
        self.within_selector = None
        
    def append_criteria(self, criteria):
        self.criteria.append(criteria)
        
    def set_child(self, selector):
        self.within_selector = selector
        
    def set_parent(self, selector):
        root = self
        while root.parent:
            root = root.parent
        root.parent = selector

    def __str__(self):
        criteria = "".join(map(str, self.criteria))
        
        if self.parent:
            parent = str(self.parent)
        else:
            parent = ''
        
        if self.subpart and self.subpart != 'default':
            subpart = "::%s" % self.subpart 
        else:
            subpart = ""
            
        if self.within_selector:
            within = ' > %s' % str(self.within_selector)
        else:
            within = ''
            
        return "%s%s%s%s%s%s" % (parent, self.subject, self.zoom, criteria, subpart, within)

class Action:
    def __init__(self, statements):
        self.statements = statements
    
    def __str__(self):
        return " {\n%s\n}" % "\n".join(map(str, self.statements))


class StyleStatement:
    def __init__(self, key, value):
        self.key = key
        self.value = value
    
    def __str__(self):
        return "    %s: %s;" % (self.key, self.value)

class TagStatement:
    def __init__(self, key, value='yes'):
        self.key = key
        self.value = value
    
    def __str__(self):
        if self.value == 'yes':
            return "    set %s;" % (self.key)
        else:
            return "    set %s = %s;" % (self.key, self.value)

class ClassStatement:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return "    set %s;" % (self.name)

class ExitStatement:
    def __str__(self):
        return "    exit;"
        
class ConditionTag:
    def __init__(self, key):
        self.key = key

    def __str__(self):
        return "[%s]" % (self.key)
    
class ConditionNotTag:
    def __init__(self, key):
        self.key = key

    def __str__(self):
        return "[!%s]" % (self.key)
    
class ConditionCheck:
    def __init__(self, key, sign, value):
        self.key = key
        self.sign = sign
        self.value = value

    def __str__(self):
        return "[%s%s%s]" % (self.key, self.sign, self.value)
    
class ConditionClass:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "%s" % (self.name)
    
class ConditionPseudoclass:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "%s" % (self.name)

class Eval:
    def __init__(self, expression):
        self.expression = expression

    def __str__(self):
        return "eval(%s)" % str(self.expression)
        
class EvalExpressionString:
    def __init__(self, string):
        self.string = string

    def __str__(self):
        if is_number(self.string):
            return self.string
        else:
            return '"%s"' % self.string
    
class EvalExpressionOperation:
    def __init__(self, operation, arg1, arg2):
        self.operation = operation
        self.arg1 = arg1
        self.arg2 = arg2

    def __str__(self):
        return "%s %s %s" % (self.arg1, self.operation, self.arg2)

class EvalExpressionGroup:
    def __init__(self, expression):
        self.expression = expression

    def __str__(self):
        return "(%s)" % str(self.expression)

class EvalFunction:
    def __init__(self, function, arguments):
        self.function = function
        self.arguments = arguments

    def __str__(self):
        return "%s(%s)" % (self.function, ", ".join(map(str, self.arguments)))
    
