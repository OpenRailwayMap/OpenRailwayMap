SHELL = /bin/sh -e

.PHONY: all

POFILES = $(shell ls -1 */LC_MESSAGES/messages.po)
MOFILES = $(patsubst %.po,%.mo,$(POFILES))
JSONFILES = $(patsubst %.po,%.json,$(POFILES))
MSGFMT = msgfmt

all: $(MOFILES) $(JSONFILES)

%.mo: %.po
	msgfmt -o $@ $^

%.json: %.po
	pojson $^ > $@

clean:
	rm -f $(MOFILES)
	rm -f $(JSONFILES)
