#!/usr/bin/python

import ply.yacc as yacc
import lex

import ast

tokens = lex.tokens

# Error rule for syntax errors
def p_error(p):
    if p:
        print "Syntax error in input at line %s" % (p.lineno)

def p_mapcss(p):
    'css : rule'
    p[0] = ast.MapCSS()
    p[0].append_rule(p[1])

def p_mapcss_import(p):
    'css : import'
    p[0] = ast.MapCSS()
    p[0].append_import(p[1])

def p_mapcss_multiple_rules(p):
    'css : css rule'
    p[0] = p[1]
    p[0].append_rule(p[2])

def p_mapcss_multiple_imports(p):
    'css : css import'
    p[0] = p[1]
    p[0].append_import(p[2])

def p_import_pseudoclass(p):
    'import : IMPORT URL PSEUDOCLASS SEMICOLON'
    p[0] = ast.Import(p[2], p[3])

def p_import(p):
    'import : IMPORT URL SEMICOLON'
    p[0] = ast.Import(p[2])

def p_rule(p):
    'rule : selector action'
    p[0] = ast.Rule(p[1], p[2])

def p_selector_empty(p):
    'selector : SUBJECT'
    p[0] = [ast.Selector(subject=p[1])]

def p_selector_zoom_empty(p):
    'selector : SUBJECT ZOOM'
    p[0] = [ast.Selector(subject=p[1], zoom=p[2])]

def p_selector_empty_subpart(p):
    'selector : SUBJECT SUBPART'
    p[0] = [ast.Selector(subject=p[1], subpart=p[2])]

def p_selector_zoom_empty_subpart(p):
    'selector : SUBJECT ZOOM SUBPART'
    p[0] = [ast.Selector(subject=p[1], zoom=p[2], subpart=p[3])]

def p_selector_and(p):
    'selector : selector criteria'
    p[0] = p[1]
    p[0][-1].append_criteria(p[2])

def p_selector_memberof(p):
    'selector : selector MEMBEROF selector'
    p[0] = p[1]
    p[0][-1].set_child(p[3][-1])

def p_selector_within(p):
    'selector : selector selector'
    p[0] = [p[2][-1]]
    p[2][-1].set_parent(p[1][-1])

def p_selector_or(p):
    'selector : selector COMMA selector'
    p[0] = p[1]
    p[0] += p[3]
    
def p_selecotr_last(p):
    'selector : selector COMMA'
    p[0] = p[1]

def p_selector_subpart(p):
    'selector : selector SUBPART'
    p[0] = p[1]
    for selector in p[0]:
        selector.subpart = p[2]


def p_criteria_check(p):
    'criteria : LSQBRACE condition RSQBRACE'
    p[0] = p[2]
    
def p_criteria_class(p):
    'criteria : CLASS'
    p[0] = ast.ConditionClass(p[1])

def p_criteria_pseudoclass(p):
    'criteria : PSEUDOCLASS'
    p[0] = ast.ConditionPseudoclass(p[1])

def p_condition_check(p):
    'condition : IDENTIFIER SIGN IDENTIFIER'
    p[0] = ast.ConditionCheck(p[1], p[2], p[3])

def p_condition_regex(p):
    'condition : IDENTIFIER SIGN REGEX'
    p[0] = ast.ConditionRegex(p[1], p[2], p[3])

def p_condition_set(p):
    'condition : IDENTIFIER'
    p[0] = ast.ConditionTag(p[1])

def p_condition_not_set(p):
    'condition : NOT IDENTIFIER'
    p[0] = ast.ConditionNotTag(p[2])

def p_empty_action(p):
    'action : LCBRACE RCBRACE '
    p[0] = [ast.Action([])]

def p_action(p):
    'action : LCBRACE statements RCBRACE'
    p[0] = [ast.Action(p[2])]

def p_action_multiple(p):
    'action : action action'
    p[0] = p[1]
    p[0] += p[2]

def p_exit(p):
    'statements : EXIT'
    p[0] = [ast.ExitStatement()]

def p_value(p):
    'value : VALUE'
    p[0] = p[1]

def p_value_eval(p):
    'value : EVAL LPAREN eval_expression RPAREN'
    p[0] = ast.Eval(p[3])

def p_properties(p):
    'statements : KEY COLON value'
    p[0] = [ast.StyleStatement(p[1], p[3])]

def p_set_tag_value(p):
    'statements : KEY KEY EQUALS value'
    p[0] = [ast.TagStatement(p[2], p[4])]

def p_set_tag(p):
    'statements : KEY KEY'
    p[0] = [ast.TagStatement(p[2])]

def p_set_class(p):
    'statements : KEY CLASS'
    p[0] = [ast.ClassStatement(p[2])]

def p_properties_multiple(p):
    'statements : statements statements'
    p[0] = p[1]
    p[0] += p[2]

#Eval
def p_eval_expression_string(p):
    'eval_expression : STRING'
    p[0] = ast.EvalExpressionString(str(p[1]))

def p_eval_expression_number(p):
    'eval_expression : NUMBER'
    p[0] = ast.EvalExpressionString(str(p[1]))

def p_eval_expression_operation(p):
    'eval_expression : eval_expression OPERATION eval_expression'
    p[0] = ast.EvalExpressionOperation(p[2], p[1], p[3])

def p_eval_expression_parens(p):
    'eval_expression : LPAREN eval_expression RPAREN'
    p[0] = ast.EvalExpressionGroup(p[2])

def p_eval_expression_function(p):
    'eval_expression : eval_function'
    p[0] = p[1]

def p_eval_function_argument_expression(p):
    'function_argument : eval_expression'
    p[0] = [p[1]]

def p_eval_function_argument_multiple(p):
    'function_argument : function_argument COMMA function_argument'
    p[0] = p[1]
    p[1] += p[3]

def p_eval_function(p): 
    'eval_function : FUNCTION LPAREN function_argument RPAREN'
    p[0] = ast.EvalFunction(p[1], p[3])

yacc.yacc(debug=0)    
