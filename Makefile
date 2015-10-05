.phony: check

PHP := php

check-php: *.php api/*.php

check:
	for pf in $$(find . -name '*.php'); do \
		$(PHP) -l $${pf} || exit 1; \
	done
	make -C josm-presets $@
	make -C styles $@
