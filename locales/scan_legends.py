#!/usr/bin/python3

import fileinput
import json
import re
import polib

if __name__ == "__main__":
	from optparse import OptionParser
	parser = OptionParser(usage="%prog [options]")

	parser.add_option("-i", "--input",
		action="append", type="string", dest="ifiles",
		help="JSON input file, required")

	parser.add_option("-o", "--output",
		action="append", type="string", dest="output",
		help="po output file, required")

	(options, args) = parser.parse_args()

	if not options.ifiles or not options.output:
		print("input and output parameters are required")
		raise SystemExit(1)

	ostrings = set()

	capt_re = re.compile('^%[^%]+%$')

	# get all possible translatable strings from the styles
	for i in options.ifiles:
		with open(i, 'r') as f:
			jsondoc = json.load(f)

		for x in jsondoc['mapfeatures']:
			if 'heading' in x:
				ostrings.add(x['heading'])
			elif 'caption' in x:
				# check if the whole caption is a single replace expression,
				# then do not put that into the file, but only the matching
				# expressions from the replace list
				if 'replace' in x and capt_re.match(x['caption']):
					for r in x['replace']:
						ostrings.add(r[x['caption']])
				else:
					ostrings.add(x['caption'])

	for outf in options.output:
		po = polib.pofile(outf, check_for_duplicates = True)

		# loop over all translatable strings
		for i in ostrings:
			try:
				po.append(polib.POEntry(msgid = i))
			except ValueError:
				True

		po.save(outf)
