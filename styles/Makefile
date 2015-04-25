.phony: all

JSFILES = maxspeed.js signals.js standard.js

all: $(JSFILES)

%.js: %.mapcss
	python ../renderer/mapcss_converter.py --mapcss $^ --icons-path .

clean:
	rm -f $(JSFILES)
	rm -f $(patsubst %.js,%.png,$(JSFILES))
	rm -f parsetab.py
