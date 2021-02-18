SHELL = /bin/bash -e

.PHONY: all

PYTHON = python3
JSFILES = maxspeed.js signals.js standard.js electrification.js
ZIPFILES = maxspeed.zip signals.zip standard.zip electrification.zip josm-additional.zip

all: $(JSFILES) $(ZIPFILES)

%.js: %.mapcss common.mapcss
	$(PYTHON) ../renderer/mapcss_converter.py --mapcss $^ --icons-path .

%.zip: %.mapcss common.mapcss josm-import.awk
	echo $(shell TDIR=$$(mktemp -d); \
		gawk -f $(CURDIR)/josm-import.awk $< > $${TDIR}/$<; \
		pushd $${TDIR}; \
			zip $@ $< | sed '/^[ \t]*adding: /d'; \
		popd; \
		mv $${TDIR}/$@ . ; \
		rm -r $${TDIR})
	grep -o 'icon-image: "[^"]*' $< | sed 's/icon-image: "//' | zip -r $@ -@ | sed '/^[ \t]*adding: /d'

clean:
	rm -f $(JSFILES)
	rm -f $(patsubst %.js,%.png,$(JSFILES))
	rm -f parsetab.py
	rm -f $(ZIPFILES)

check: $(JSFILES)
	@if [ -n "`grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'`" ]; then \
		echo "bad image references found:"; \
		grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'; \
		false; \
	fi
	@for i in $(JSFILES); do \
		$(PYTHON) -m json.tool < $${i}on > /dev/null; \
	done
