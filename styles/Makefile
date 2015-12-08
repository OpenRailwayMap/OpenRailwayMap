SHELL = /bin/sh -e

.PHONY: all

JSFILES = maxspeed.js signals.js standard.js electrified.js
ZIPFILES = maxspeed.zip signals.zip standard.zip electrified.zip josm-additional.zip

all: $(JSFILES) $(ZIPFILES)

%.js: %.mapcss
	python ../renderer/mapcss_converter.py --mapcss $^ --icons-path .

%.zip: %.mapcss
	zip $@ $^ | sed '/^[ \t]*adding: /d'
	grep -o 'icon-image: "[^"]*' $^ | sed 's/icon-image: "//' | zip -r $@ -@ | sed '/^[ \t]*adding: /d'

clean:
	rm -f $(JSFILES)
	rm -f $(patsubst %.js,%.png,$(JSFILES))
	rm -f parsetab.py
	rm -f $(ZIPFILES)

check: $(JSFILES)
	@if [ -n "`grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'`" ]; then \
		echo "bad image references found:"; \
		@grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'; \
		false; \
	fi
	@for i in $(JSFILES); do \
		python -m json.tool < $${i}on > /dev/null; \
	done
