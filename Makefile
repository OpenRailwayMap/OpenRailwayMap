SHELL = /bin/sh -e
DEP_LEAFLET_VERSION = 0.7.7
DEP_LEAFLET_EDITOR_FILES = download/Leaflet.EditInOSM.js download/Leaflet.EditInOSM.css download/edit-in-osm.png

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
	wget -O download/leaflet.zip https://cdn.leafletjs.com/leaflet/v$(DEP_LEAFLET_VERSION)/leaflet.zip
	mv download/leaflet.zip download/leaflet-$(DEP_LEAFLET_VERSION).zip

$(DEP_LEAFLET_EDITOR_FILES):
	wget -O $@.tmp https://raw.githubusercontent.com/yohanboniface/Leaflet.EditInOSM/master/$(notdir $@)
	mv $@.tmp $@

download-deps:	download/leaflet-$(DEP_LEAFLET_VERSION).zip \
		$(DEP_LEAFLET_EDITOR_FILES)

css/leaflet.css: download/leaflet-$(DEP_LEAFLET_VERSION).zip
	mkdir -p download/leaflet-extract js/images; \
	rm -rf download/leaflet-extract/*; \
	cd download/leaflet-extract; \
	unzip ../leaflet-$(DEP_LEAFLET_VERSION).zip; \
	mv leaflet.js ../../js; \
	mv images/* ../../js/images/; \
	sed s,images/,../js/images/, leaflet.css > ../leaflet.css; \
	mv ../leaflet.css ../../css/

css/Leaflet.EditInOSM.css: $(DEP_LEAFLET_EDITOR_FILES)
	cp download/Leaflet.EditInOSM.js js/
	cp download/edit-in-osm.png img/
	sed 's#"./edit-in-osm#"../img/edit-in-osm#' download/Leaflet.EditInOSM.css > download/Leaflet.EditInOSM.css_
	mv download/Leaflet.EditInOSM.css_ $@

install-deps: css/leaflet.css css/Leaflet.EditInOSM.css
