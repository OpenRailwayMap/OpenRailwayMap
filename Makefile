SHELL = /bin/sh -e

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
