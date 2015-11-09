.PHONY: check clean

PRESETFILES = at.zip at-signals-v2.zip de.zip de-avg-signals.zip de-signals-eso.zip

all: $(PRESETFILES)

%.zip: %.xml
	@zip $@ $^
	cd ../styles/icons; find . -name "*.png" | zip -r ../../josm-presets/$@ -@

check: *.xml
	@xmllint --schema http://josm.openstreetmap.de/tagging-preset-1.0 --noout *.xml

clean:
	@rm -f *.zip
