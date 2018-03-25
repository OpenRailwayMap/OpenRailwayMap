SHELL = /bin/sh -e

.PHONY: check clean

PRESETFILES = at-signals-v2.zip de.zip de-avg-signals.zip de-signals-eso.zip de-signals-bostrab.zip pl.zip pl-signals.zip

all: $(PRESETFILES)

%.zip: %.xml
	@zip $@ $^ | sed '/^[ \t]*adding: /d'
	cd ../styles/icons; grep -o 'icon="[^"]*' ../../josm-presets/$^ | sed 's/^icon="//' | zip -r ../../josm-presets/$@ -@ | sed '/^[ \t]*adding: /d'

check: *.xml
	@xmllint --schema http://josm.openstreetmap.de/tagging-preset-1.0 --noout *.xml

clean:
	@rm -f *.zip
