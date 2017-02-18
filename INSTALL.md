Installation Instructions
=========================

## Dependencies

CentOS:

    $ yum update
    $ yum install gnome-python2-rsvg pygobject2 pygobject2-devel librsvg2 librsvg2-devel cairo cairo-devel cairomm-devel pango pango-devel pangomm pangomm-devel npm nodejs python php php-php-gettext php-pgsql python-ply python-imaging pycairo python-cairosvg pygtk2 pygtk2-devel make cmake boost-devel expat-devel geos-devel proj-devel proj-epsg lua-devel gcc-c++

    $ yum install postgresql postgresql-contrib postgresql-server postgresql-libs postgresql-common postgresql-devel postgis

    $ yum install libjpeg-turbo-devel giflib-devel

    $ yum install git wget zlib zlib-devel gzip unzip bzip2-devel zip

Debian/Ubuntu:

    $ apt-get install --no-install-recommends postgresql-9.3-postgis-2.1
    $ apt-get install gzip postgresql-common libgeoip1 geoip-database geoip-bin php5-geoip php-gettext unzip python-ply python-imaging python-cairo python-cairosvg librsvg2-2 librsvg2-dev libpango1.0-dev libcairo2-dev libcairomm-1.0-dev libjpeg-turbo8-dev libpangomm-1.4-1 libpangomm-1.4-dev npm nodejs wget zlib1g-dev osm2pgsql php5-pgsql
    $ apt-get install git libgif-dev build-essential g++ make zip
    $ apt-get install nodejs-legacy # see https://stackoverflow.com/questions/21168141/can-not-install-packages-using-node-package-manager-in-ubuntu for the reason
    # in case you want to build osm2pgsql from sources
    $ apt-get install cmake

## Installation

 The following instructions assume installation on an CentOS server with sudo permissions. These steps assume CentOS 6, if using different version of Ubuntu the available versions of software may change requiring slight modifications to these steps. It may be necessary to change parts of this instructions for using on other environments.

 Login as root user:

    $ su root

 Clone this repository (in the following `/var/www/html/OpenRailwayMap/`):

    $ cd /var/www/html/
    $ git clone https://github.com/rurseekatze/OpenRailwayMap.git
    $ cd OpenRailwayMap

 First install all dependencies. Depending on your operating system and environment, you may use another command like apt-get. Package names can differ from the names mentioned below:

 For system-specific installation of Cairo view the [node-canvas Wiki](https://github.com/LearnBoost/node-canvas/wiki/_pages).

 Install Leaflet:

    $ make install-deps

 Install osm2pgsql (Ubuntu and Debian users may use their `osm2pgsql` package provided by their distribution instead):

    $ cd import
    $ git clone https://github.com/openstreetmap/osm2pgsql.git
    $ mkdir osm2pgsql-build
    $ cd osm2pgsql-build
    $ cmake ../osm2pgsql
    $ make
    $ sudo make install
    $ cd ..
    $ rm -fr osm2pgsql osm2pgsql-build

 Install osmctools (Ubuntu and Debian users may use their `osmctools` package provided by their distribution instead):

    $ git clone https://gitlab.com/osm-c-tools/osmctools.git
    $ cd osmctools
    $ gcc src/osmupdate.c -o osmupdate
    $ gcc src/osmfilter.c -O3 -o osmfilter
    $ gcc src/osmconvert.c -lz -O3 -o osmconvert
    $ cp osmupdate osmfilter osmconvert /usr/local/bin
    $ cd ..
    $ rm -fr osmctools

## Setting Up the Database

 Set up the PostgreSQL database with PostGIS and hstore extensions:

    $ sudo -u postgres createuser railmap
    $ sudo -u postgres createdb -E UTF8 -O railmap railmap

    $ sudo -u postgres psql -d railmap -c "CREATE EXTENSION postgis;"
    $ sudo -u postgres psql -d railmap -c "CREATE EXTENSION postgis_topology;"
    $ sudo -u postgres psql -d railmap -c "CREATE EXTENSION postgis_sfcgal;"
    $ sudo -u postgres psql -d railmap -c "CREATE EXTENSION hstore;"

    $ sudo service postgresql-9.5 initdb
    $ sudo service postgresql-9.5 start
    $ sudo chkconfig postgresql-9.5 on

For authentication to the database, we are using `md5` method. Edit your `pg_hba.conf` to use `md5` authentication for local unix sockets and local TCP/IP connections from your host.

The database password is managed in a `pgpass` file. Create a `pgpass` file (or edit the existing one) in the home directory of the user that will be used for running the processes of API, tileserver and import/update scripts:

    $ vim ~/.pgpass

Add a line with this format:

    hostname:port:database:username:password

in this example (replace `YOURPASSWORD` by the password you entered in the `createuser` command):

    localhost:5432:railmap:railmap:YOURPASSWORD

Then set the correct file permissions:

    $ chmod 600 ~/.pgpass

## Setting Up the Webserver and PHP

 We use Apache. Set up one vhost per subdomain (website, tileserver, API). They are placed at
 `/etc/apache2/sites-available/` on Ubuntu/Debian. Other distros use `/etc/apache/vhosts.d/` or
 just another directory. Log files will be saved to `/var/log/apache2/` You should change this
 path if you are using other systems, e.g. to `/var/log/httpd/` on CentOS/RHEL.

 Vhost configuration of the website (`www.openrailwaymap.org.conf`)

    <VirtualHost *:80>
    DocumentRoot /var/www/html/OpenRailwayMap/
    ServerName www.openrailwaymap.org
    ServerAlias openrailwaymap.org
    <Directory /var/www/html/OpenRailwayMap/>
         AllowOverride None
    </Directory>
    ErrorLog /var/log/apache2/www.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/apache2/www.openrailwaymap.org.access.log combined
    </VirtualHost>

 API is served by api.js which listens on port 9002, therefore we forward incoming request to this port.
 Vhost configuration of the API (`api.openrailwaymap.org.conf`) looks like this:

    <VirtualHost *:80>
    ServerName api.openrailwaymap.org
    ProxyPreserveHost On
    ProxyPass / http://localhost:9002/
    ProxyPassReverse / http://localhost:9002/
    ErrorLog /var/log/apache2/api.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/apache2/api.openrailwaymap.org.access.log combined
    </VirtualHost>

 Tileserver is served by tileserver.js which listens on port 9000, therefore we forward incoming request to this port.
 Vhost configuration of the API (`tiles.openrailwaymap.org.conf`) looks like this:

    <VirtualHost *:80>
    ServerName tiles.openrailwaymap.org
    ServerAlias  a.tiles.openrailwaymap.org b.tiles.openrailwaymap.org c.tiles.openrailwaymap.org
    ProxyPreserveHost On
    ProxyPass / http://localhost:9000/
    ProxyPassReverse / http://localhost:9000/
    ErrorLog /var/log/apache2/tiles.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/apache2/tiles.openrailwaymap.org.access.log combined
    </VirtualHost>

Make sure that your server does not accept request on port 9000 and 9002 from outside (to circumvent the proxy and its logging).

## Setting up the Tileserver

 Now get the code for node-tileserver:

    $ cd ..
    $ git submodule update --init renderer

 Compile the MapCSS styles, JOSM presets and translations:

    $ make

 Switch to the renderer subdirectory:

    $ cd renderer

 After that you can install all necessary NodeJS modules with npm:

    $ npm install

 In case your system uses systemd you can install the unit file for the API server:

    $ sudo make install-systemd

 The user and group the service will run defaults to "openrailwaymap", you can change this in the makefile or by passing the ORM_USER or ORM_GROUP variables to make.

 If you are not using systemd either write an init script or start the server in a screen session.

 Start the API server:

    $ sudo systemctl start orm-tileserver.service

 Optionally enable autostart:

    $ sudo systemctl enable orm-tileserver.service

 Run

    $ cd ../import
    $ ./import.sh

 initially to download OSM data, import it into the database and prerender some tiles.

 Note that you have to recompile the stylesheets every time you change the MapCSS files to apply the changes. It is also necessary to restart the tileserver to reload the stylesheets.

    $ make -C styles
    $ sudo systemctl restart orm-tileserver.service

## Setting up the API

 In case your system uses systemd you can install the unit file for the API server:

    $ cd api
    $ sudo make install-systemd

 The user and group the service will run defaults to "openrailwaymap", you can change this in the makefile or by passing the ORM_USER or ORM_GROUP variables to make.

 If you are not using systemd either write an init script or start the server in a screen session.

 After that you can install all necessary NodeJS modules with npm:

    $ npm install

 Start the API server:

    $ sudo systemctl start orm-api.service

 Optionally enable autostart:

    $ sudo systemctl enable orm-api.service

 If you want to filter the OpenRailwayMap log entries into their own files using rsyslogd you can install the config file and restart rsyslogd:

    $ sudo make install-rsyslog
    $ sudo systemctl restart rsyslog.service

 Do not forget to add the logfiles to logrotate.

## Enabling New Apache Configuration

 Now you enable the necessary Apache modules (mod_proxy, mod_proxy_http), enable the new virtual
 hosts and restart Apache. On Ubuntu/Debian this is done using

    $ sudo a2enmod proxy
    $ sudo a2enmod proxy_http
    $ cd /etc/apache2/site-available
    $ sudo a2ensite www.openrailwaymap.org.conf
    $ sudo a2ensite api.openrailwaymap.org.conf
    $ sudo a2ensite tiles.openrailwaymap.org.conf

 On other distros this is done by adding following entries to your Apache configuration (vhost do not have to be enabled because your Apache configuration contains `IncludeOptional /etc/apache2/vhosts.d/*.conf`. Check that the proxy modules are enabled. `httpd.conf should contain

    LoadModule mod_proxy
    LoadModule mod_proxy_http

 Now reload (maybe restart?) Apache (the daemon is called *httpd* on some systems). On systems using systemd:

    $ sudo systemctl reload apache2.service

 On systems using SysVinit:

    $ sudo /etc/init.d apache2 reload

 You can jump back to the session to see log output or to restart the processes:

    $ screen -r tileserver

## Keeping Your Data Up To Date

 Create a cronjob that executes the following script to update the database and rerender expired tiles:

    $ ./update.sh

 The update script should be executed no more than once a day because of the long running processes.


## Configuration

 There are a lot of configuration settings in `renderer/config.json`. See https://github.com/rurseekatze/node-tileserver/blob/master/README.md for further details. The default params are ok for most cases. The tileserver has to be restarted after configuration changes.

 It is also necassary to change setting parameters in `import/config.cfg` and `api/config.json` depending on your environment. More information on detailled configuration will be added in future.
