ORM_USER = openrailwaymap
ORM_GROUP = openrailwaymap
API_BASEDIR = $(CURDIR)

.PHONY: install-systemd

install-systemd:
	install -D orm-api.service $(DESTDIR)/etc/systemd/system/orm-api.service
	sed "s/@@ORM_USER@@/$(ORM_USER)/g;s/@@ORM_GROUP@@/$(ORM_GROUP)/g;s#@@API_BASEDIR@@#$(API_BASEDIR)#g" -i \
		$(DESTDIR)/etc/systemd/system/orm-api.service

install-rsyslog:
	install -D orm.conf $(DESTDIR)/etc/rsyslog.d/orm.conf
