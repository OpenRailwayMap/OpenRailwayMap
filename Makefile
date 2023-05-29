SHELL = /bin/sh -e
DEP_LEAFLET_VERSION = 1.9.3
DEP_LEAFLET_EDITOR_FILES = download/Leaflet.EditInOSM.js download/Leaflet.EditInOSM.css download/edit-in-osm.png
DEP_LEAFLET_GRAYSCALE_VERSION = 8675605f71f856299ebdd05a635ba1494817f5ff

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
	wget -O download/leaflet.zip https://leafletjs-cdn.s3.amazonaws.com/content/leaflet/v$(DEP_LEAFLET_VERSION)/leaflet.zip
	mv download/leaflet.zip download/leaflet-$(DEP_LEAFLET_VERSION).zip

$(DEP_LEAFLET_EDITOR_FILES):
	wget -O $@.tmp https://raw.githubusercontent.com/yohanboniface/Leaflet.EditInOSM/master/$(notdir $@)
	mv $@.tmp $@

download/TileLayer.Grayscale.js:
	mkdir -p download
	wget -O $@.tmp https://raw.githubusercontent.com/Zverik/leaflet-grayscale/$(DEP_LEAFLET_GRAYSCALE_VERSION)/$(notdir $@)
	mv $@.tmp $@

download-deps: download/leaflet-$(DEP_LEAFLET_VERSION).zip \
		$(DEP_LEAFLET_EDITOR_FILES)

css/leaflet.css: download/leaflet-$(DEP_LEAFLET_VERSION).zip
	unzip -o download/leaflet-$(DEP_LEAFLET_VERSION).zip leaflet.js leaflet.js.map -d js
	unzip -o download/leaflet-$(DEP_LEAFLET_VERSION).zip images/ -d js/images
	unzip -p download/leaflet-$(DEP_LEAFLET_VERSION).zip leaflet.css | sed s,images/,../js/images/, > css/leaflet.css

css/Leaflet.EditInOSM.css: $(DEP_LEAFLET_EDITOR_FILES)
	cp download/Leaflet.EditInOSM.js js/
	cp download/edit-in-osm.png img/
	sed 's#"./edit-in-osm#"../img/edit-in-osm#' download/Leaflet.EditInOSM.css > download/Leaflet.EditInOSM.css_
	mv download/Leaflet.EditInOSM.css_ $@

js/L.TileLayer.Grayscale.js: download/TileLayer.Grayscale.js
	cp download/TileLayer.Grayscale.js js/L.TileLayer.Grayscale.js

install-deps: css/leaflet.css css/Leaflet.EditInOSM.css js/L.TileLayer.Grayscale.js
