SHELL = /bin/sh -e

.PHONY: all update_po

POFILES = $(shell ls -1 */LC_MESSAGES/messages.po)
MOFILES = $(patsubst %.po,%.mo,$(POFILES))
JSONFILES = $(patsubst %.po,%.json,$(POFILES))
LEGENDFILES = $(shell ls -1 ../styles/*.json)
MSGFMT = msgfmt

all: $(MOFILES) $(JSONFILES)

update_po:
	./scan_legends.py $(LEGENDFILES:%=-i %) $(POFILES:%=-o %)

%.mo: %.po
	msgfmt -o $@ $^

%.json: %.po
	pojson $^ > $@

clean:
	rm -f $(MOFILES)
	rm -f $(JSONFILES)
