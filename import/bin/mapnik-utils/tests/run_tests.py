# stolen from shapely
# http://trac.gispython.org/projects/PCL/browser/Shapely/trunk/tests/test_doctests.py
# Copyright (c) 2007, Sean C. Gillies

import os
import sys
import glob
import doctest
import unittest

optionflags = (doctest.NORMALIZE_WHITESPACE |
               doctest.ELLIPSIS)

def list_doctests():
    return [filename
            for filename
            in glob.glob(os.path.join(os.path.dirname(__file__), '*.txt'))]

def open_file(filename, mode='r'):
    """Helper function to open files from within the tests package."""
    return open(os.path.join(os.path.dirname(__file__), filename), mode)

def setUp(test):
    test.globs.update(dict(
            open_file = open_file,
            ))

def run_doc_tests():
    return unittest.TestSuite(
        [doctest.DocFileSuite(os.path.basename(filename),
                              optionflags=optionflags,
                              setUp=setUp)
         for filename
         in list_doctests()])

def main():
    # append working directory so we can import 'mapnik_util' without installing them
    sys.path.append(os.getcwd())
    # test importing so a failure happens here
    # rather than later during docstests
    import mapnik_utils
    runner = unittest.TextTestRunner()
    runner.run(run_doc_tests())

if __name__ == "__main__":
    main()
