#CFLAGS += -g
CFLAGS += -O2 -Wall
CFLAGS += $(shell xml2-config --cflags)
LDFLAGS += $(shell xml2-config --libs) -lm

APPS:=tilecount

.PHONY: all clean

all: $(APPS)

clean: 
	rm -f  $(APPS) tilecount.o bst.o

tilecount: tilecount.o bst.o
