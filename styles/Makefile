.phony: all

JSFILES = maxspeed.js signals.js standard.js

all: $(JSFILES)

%.js: %.mapcss
	python ../renderer/mapcss_converter.py --mapcss $^ --icons-path .

clean:
	rm -f $(JSFILES)
	rm -f $(patsubst %.js,%.png,$(JSFILES))
	rm -f parsetab.py

check: $(JSFILES)
	if [ -n "`grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'`" ]; then \
		echo "bad image references found:"; \
		grep 'var external_images = ' $^ | grep -v 'var external_images = \[\];$$'; \
		false; \
	fi
	for i in $(JSFILES); do \
		python -m json.tool < $${i}on > /dev/null || exit 1; \
	done
