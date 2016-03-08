SHELL = /bin/sh -e

.PHONY: all

POFILES = $(shell ls -1 */LC_MESSAGES/messages.po)
MOFILES = $(patsubst %.po,%.mo,$(POFILES))
MSGFMT = msgfmt

all: $(MOFILES)

%.mo: %.po
	msgfmt -o $@ $^

clean:
	rm -f $(MOFILES)
