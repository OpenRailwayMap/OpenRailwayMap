import os
from subprocess import Popen, PIPE

def call(cmd,fail=False):
    try:
        response = Popen(cmd.split(' '),stdin=PIPE, stdout=PIPE, stderr=PIPE)
        cm = response.communicate()
        return cm[0]
    except Exception, e:
        if fail:
            raise SystemExit(e)
        else:
            return None

def color_print(color, text, no_color=False):
    """
    Accepts an integer key for one of several color choices along with the text string to color
      keys = 1:red, 2:green, 3:yellow, 4: dark blue, 5:pink, 6:teal blue, 7:white
    Prints a colored string of text.
    """
    if not os.name == 'nt' and not no_color:
        print "\033[9%sm%s\033[0m" % (color,text)
    else:
        print text

def color_text(color, text, no_color=False):
    """
    Accepts an integer key for one of several color choices along with the text string to color
      keys = 1:red, 2:green, 3:yellow, 4: dark blue, 5:pink, 6:teal blue, 7:white
    Returns a colored string of text.
    """
    if not os.name == 'nt' and not no_color:
        return "\033[9%sm%s\033[0m" % (color,text)
    else:
        return text