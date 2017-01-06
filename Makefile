SHELL = /bin/sh -e
DEP_LEAFLET_VERSION = 0.7.7

.PHONY: check all

PHP := php

all:
	$(MAKE) -C josm-presets $@
	$(MAKE) -C styles $@
	$(MAKE) -C locales $@

clean:
	$(MAKE) -C josm-presets $@
	$(MAKE) -C styles $@
	$(MAKE) -C locales $@

check-php: *.php api/*.php

check:
	@for pf in $$(find . -name '*.php'); do \
		$(PHP) -l $${pf}; \
	done
	$(MAKE) -C josm-presets $@
	$(MAKE) -C styles $@

distclean: clean
	rm -rf download css/leaflet.css

download/leaflet-$(DEP_LEAFLET_VERSION).zip:
	mkdir -p download
	# do this in 2 steps to make sure only a completely downloaded file is used
	wget -O download/leaflet.zip http://cdn.leafletjs.com/leaflet/v$(DEP_LEAFLET_VERSION)/leaflet.zip
	mv download/leaflet.zip download/leaflet-$(DEP_LEAFLET_VERSION).zip

download-deps: download/leaflet-$(DEP_LEAFLET_VERSION).zip

css/leaflet.css: download/leaflet-$(DEP_LEAFLET_VERSION).zip
	mkdir -p download/leaflet-extract js/images; \
	rm -rf download/leaflet-extract/*; \
	cd download/leaflet-extract; \
	unzip ../leaflet-$(DEP_LEAFLET_VERSION).zip; \
	mv leaflet.js ../../js; \
	mv images/* ../../js/images/; \
	sed s,images/,../js/images/, leaflet.css > ../leaflet.css; \
	mv ../leaflet.css ../../css/

install-deps: css/leaflet.css
