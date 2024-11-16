SHELL = /bin/sh -e

.PHONY: all update_po

POFILES = $(shell ls -1 */LC_MESSAGES/messages.po)
MOFILES = $(patsubst %.po,%.mo,$(POFILES))
JSONFILES = $(patsubst %.po,%.json,$(POFILES))
LEGENDFILES = $(shell ls -1 ../styles/*.json)
MSGFMT = msgfmt

all: $(MOFILES) $(JSONFILES)

update_po:
	pip install polib
	python scan_legends.py $(LEGENDFILES:%=-i %) -o messages.pot
	$(foreach msg,$(POFILES),msgmerge -w 100 -N -U $(msg) messages.pot;)

%.mo: %.po
	msgfmt -o $@ $^

%.json: %.po
	pojson $^ > $@

clean:
	rm -f $(MOFILES)
	rm -f $(JSONFILES)
