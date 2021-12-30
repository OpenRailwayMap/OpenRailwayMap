#! /usr/bin/env python3

import argparse
import io
import os.path
import re
import sys

import_re = re.compile(r'^\s*@import\s+url\("([^"]+)"\)\s*;\s*$')
wrong_import_re = re.compile(r'^\s*@import')

def import_like(row, path, row_number):
    """Warn if a row looks like an import but is not any.
    """
    if wrong_import_re.match(row):
        sys.stderr.write("WARNING: Syntax error in {} line {}:\n{}".format(path, row_number, row))


def print_and_resolve_imports(input_file, opened_files):
    """Print content of input_file (file-like object or file path as string) and replace @import
    directives by the content of the file they point to).
    """
    f = input_file
    if not isinstance(f, io.IOBase):
        f = open(f, "r")
    try:
        row_number = 0
        for row in f.readlines():
            row_number += 1
            match = import_re.match(row)
            if not match:
                import_like(row, f.name, row_number)
                sys.stdout.write(row)
            else:
                path = match.group(1)
                full_path = os.path.abspath(path)
                if full_path in opened_files:
                    raise RecursionError("Import loop detected. {} imports {} but {} has been read already.".format(f.name, path, path))
                opened_files.append(full_path)
                print_and_resolve_imports(path, opened_files)
    finally:
        if f != input_file:
            f.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Resolve @import directives in MapCSS files.")
    parser.add_argument("input_file", type=argparse.FileType("r"), help="Input file")
    args = parser.parse_args()
    base_dir = os.path.dirname(os.path.abspath(args.input_file.name))
    os.chdir(base_dir)
    read_files = [os.path.abspath(args.input_file.name)]
    print_and_resolve_imports(args.input_file, read_files)
