.POSIX:

.PHONY: check

PHP := php

check-php: *.php api/*.php

check:
	@for pf in $$(find . -name '*.php'); do \
		$(PHP) -l $${pf}; \
	done
	@make -C josm-presets $@
	@make -C styles $@
