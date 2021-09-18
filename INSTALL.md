Installation Instructions
=========================

This guide should help you to set up your own instance of OpenRailwayMap. Have a look into our [Ansible playbooks](https://github.com/OpenRailwayMap/server-admin/tree/master/ansible) if you want to look how the main instance at openrailwaymap.org is set up.

## What this guide does not cover

The following topics are out of scope of this setup guide:

* basic security measures on your system which are related to the database (PostgreSQL) and the web server (Apache)
* PostgreSQL and Apache tuning
* HTTPS support (if you follow this guide, all services will support unencrypted HTTP only)
* automatic OpenStreetMap data updates
* Linux distributions other than Debian/Ubuntu

## Dependencies

OpenRailwayMap requires Linux. It might work on other Unix-like systems if you do not want to set up the tile server.

Required versions:

* PostgreSQL >= 9.3
* osm2pgsql >= 0.96.0
* Apache >= 2.4

```shell
$ apt-get install postgresql postgis osm2pgsql wget nodejs npm bc git osmium-tool tar gzip
$ apt-get install postgresql-common php-gettext unzip zip python3-pip npm nodejs wget php-pgsql libapache2-mod-php apache2 python3-pil python3-cairo python3-ply zlib1g-dev
$ apt-get install git build-essential g++ make zip
$ apt-get install apache2 apache2-dev
$ apt-get install nodejs-legacy # see https://stackoverflow.com/questions/21168141/can-not-install-packages-using-node-package-manager-in-ubuntu for the reason
# in case you want to build osm2pgsql from sources
$ apt-get install cmake
```

```shell
$ pip3 install pojson polib
```

## Installation

The following instructions assume installation on an Debian or Ubuntu server with root permissions. It may be necessary to change parts of this instructions for using on other environments.

Clone this repository (in the following `/var/www/html/OpenRailwayMap/`):

```shell
$ cd /var/www/html/
$ git clone https://github.com/openrailwaymap/OpenRailwayMap.git
$ cd OpenRailwayMap
```

Install Leaflet and the Leaflet extension that provides the edit link:

```shell
$ make install-deps
```

 Install osm2pgsql 0.96.0 or greater (Ubuntu and Debian users may use their `osm2pgsql` package provided by their distribution instead, if it's new enough):

```shell
$ cd import
$ wget https://github.com/openstreetmap/osm2pgsql/archive/0.96.0.tar.gz
$ tar -xvzf 0.96.0.tar.gz
$ mkdir osm2pgsql-build
$ cd osm2pgsql-build
$ cmake ../osm2pgsql-0.96.0
$ make
$ sudo make install
$ cd ..
$ rm -fr osm2pgsql-build osm2pgsql-0.96.0 0.96.0.tar.gz
```

## Setting Up the Database

This chapter describes the installation of the PostgreSQL database with PostGIS and hstore extensions.

```shell
$ mkdir -p /data
$ adduser --shell /usr/sbin/nologin --home /data/planet osmimport
$ sudo -u postgres createuser osmimport
$ sudo -u postgres createuser openrailwaymap
$ sudo -u postgres createdb -E UTF8 -O osmimport openrailwaymap

$ sudo -u postgres psql -d openrailwaymap -c "CREATE EXTENSION postgis;"
$ sudo -u postgres psql -d openrailwaymap -c "CREATE EXTENSION postgis_topology;"
$ sudo -u postgres psql -d openrailwaymap -c "CREATE EXTENSION postgis_sfcgal;"
$ sudo -u postgres psql -d openrailwaymap -c "CREATE EXTENSION hstore;"
```

For authentication to the database, we are using `peer` method for connections using the Unix socket and `md5` for connections using TCP/IP. Edit `/etc/postgresql/11/main/pg_hba.conf` (you might need to replace the version number `11`):

```
local   replication     all     peer
local   gis     osmimport       peer
local   gis     tirex   peer
local   all     postgres        peer
local   all     all     peer
host    replication     all     127.0.0.1/32    md5
host    replication     all     ::1/128 md5
host    all     all     127.0.0.1/32    md5
host    all     all     ::1/128 md5
```

 The database password is managed in a `pgpass` file. Create a `pgpass` file (or edit the existing one) in the home directory of the user that will be used for running the processes of API:

```shell
$ vim ~/.pgpass
```

 Add a line with this format:

    hostname:port:database:username:password

 in this example (replace `YOURPASSWORD` by the password you entered in the `createuser` command):

    localhost:5432:openrailwaymap:openrailwaymap:YOURPASSWORD

 Then set the correct file permissions:

```shell
$ chmod 600 ~/.pgpass
```

 It is important to configure the maximum number of concurrent connections to your PostgreSQL database. Otherwise it can happen that for example the database update fails because of missing free database connections. Search for the setting `max_connections` in your `/etc/postgresql/11/main/postgresql.conf` and choose a value which is equal to or greater than the result of the following formula. If there are more applications connecting to PostgreSQL on your system, you have to consider them too in this calculation.

    max_connections = (procs in /etc/tirex/renderer/mapnik.conf) + (maxPoolSize in api/config.json) + (OSM2PGSQL_NUMBER_PROCESSES in /srv/OpenRailwayMap-setup/scripts/config.cfg) + (superuser_reserved_connections in postgresql.conf)

## Loading Data into the Database

Clone the server configuration repository:

```shell
mkdir /srv/OpenRailwayMap-setup
git clone https://github.com/OpenRailwayMap/server-admin.git /srv/OpenRailwayMap-setup/
cd /srv/OpenRailwayMap-setup/scripts
```

Edit `/srv/OpenRailwayMap-setup/scripts/config.cfg`:

* Replace the link to the planet dump by a [nearby mirror](https://wiki.openstreetmap.org/wiki/Planet.osm#Planet.osm_mirrors) (planet.openstreetmap.org is rate-limited!).
* Set `OSM_DIR=/data/planet`
* Set `OSM2PGSQL_FLATNODES` to a path where an about 50 GB large file of OSM node locations fits. This should be located on a SSD or NVMe drive! Leave it empty if you do not want to cache node locations on disk but prefer to use a database table.

Run the import as user `osmimport` now (using a screen/Tmux session is recommended because it takes about an hour):

```shell
sudo -u osmimport /srv/OpenRailwayMap-scripts/scripts/import.sh
```


## Setting Up the Webserver and PHP

 We use Apache. Set up one vhost per subdomain (website, tileserver, API). They are placed at
 `/etc/apache2/sites-available/` on Ubuntu/Debian. Other distros use `/etc/apache/vhosts.d/` or
 just another directory. Log files will be saved to `/var/log/apache2/` You should change this
 path if you are using other systems, e.g. to `/var/log/httpd/` on CentOS/RHEL.

 If you want to mask IP addresses in your webserver logs for privacy reasons, install [apache2-mod-log-ipmask](https://github.com/aquenos/apache2-mod-log-ipmask) on your system. This is optional and out of scope for this guide.

 The following documentation describes these parts of the configuration which are specific for OpenRailwayMap. The complete VirtualHost configuration files used on production (including e.g. Let's Encrypt HTTPS) can be found in the [repository holding the Ansible playbooks](https://github.com/OpenRailwayMap/server-admin/tree/master/ansible).

 Vhost configuration of the website (`www.openrailwaymap.org.conf`):

```ApacheConf
<VirtualHost *:80>
    DocumentRoot /var/www/html/OpenRailwayMap/
    ServerName www.openrailwaymap.org
    ServerAlias openrailwaymap.org

    <Directory /var/www/html/OpenRailwayMap >
        AllowOverride None
    </Directory>

    DirectoryIndex index.php

    AddType application/json .json

    # alias for imprint
    Alias /de/imprint /var/www/html/OpenRailwayMap/imprint-de.html
    Alias /en/imprint /var/www/html/OpenRailwayMap/imprint-en.html

    # language redirection for imprint page
    RewriteEngine On
    RewriteCond %{REQUEST_URI} ^/imprint$
    RewriteCond %{HTTP:Accept-Language} ^de[-,;].*$ [NC]
    RewriteRule ^/imprint$ /imprint-de.html [L,R=307]
    RewriteCond %{HTTP:Accept-Language} ^en[-,;].*$ [NC]
    RewriteRule ^/imprint$ /imprint-en.html [L,R=307]
    RewriteCond %{HTTP:Accept-Language} [,;]de[-,;].*$ [NC]
    RewriteRule ^/imprint$ /imprint-de.html [L,R=307]
    RewriteCond %{HTTP:Accept-Language} [,;]en[-,;].*$ [NC]
    RewriteRule ^/imprint$ /imprint-en.html [L,R=307]

    ErrorLog /var/log/apache2/www.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/apache2/www.openrailwaymap.org.access.log combined
</VirtualHost>
```

 API is served by api.js which listens on port 9002, therefore we forward incoming request to this port.
 Create a ProxyPass exception and Alias for the timestamp file, so that it is accessible under http://api.openrailwaymap.org/timestamp.
 Vhost configuration of the API (`api.openrailwaymap.org.conf`) looks like this:

```ApacheConf
<VirtualHost *:80>
    ServerName api.openrailwaymap.org
    DocumentRoot /var/www/html/OpenRailwayMap

    ProxyPass /server-status !

    ProxyPass /timestamp !
    Alias "/timestamp" "/var/www/html/OpenRailwayMap/import/timestamp"
    Header set Access-Control-Allow-Origin "*"
    <location /timestamp>
        ForceType text/plain
    </location>

    ProxyPreserveHost On
    ProxyPass / http://localhost:9002/
    ProxyPassReverse / http://localhost:9002/

    ErrorLog /var/log/httpd/api.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/httpd/api.openrailwaymap.org.access.log combined
</VirtualHost>
```

 Tileserver is served by tileserver.js which listens on port 9000, therefore we forward incoming request to this port.
 Vhost configuration of the API (`tiles.openrailwaymap.org.conf`) looks like this:

```ApacheConf
<VirtualHost *:80>
    ServerName tiles.openrailwaymap.org
    ServerAlias a.tiles.openrailwaymap.org b.tiles.openrailwaymap.org c.tiles.openrailwaymap.org

    ProxyPreserveHost On
    ProxyPass / http://localhost:9000/
    ProxyPassReverse / http://localhost:9000/
    ProxyPass /server-status !

    ErrorLog /var/log/httpd/tiles.openrailwaymap.org.error.log
    LogLevel warn
    CustomLog /var/log/httpd/tiles.openrailwaymap.org.access.log combined
</VirtualHost>
```

Make sure that your server does not accept request on port 9000 and 9002 from outside (to circumvent the proxy and its logging).

## Setting up the Tileserver and the Mapnik map style

The tileserver consists of:

* *mod_tile*, the Apache module to serve tiles from a tile cache or to render them in real-time
* *Tirex*, a daemon managing the queue of tiles to be rendered
* *Mapnik*, a map rendering library

Install dependencies:

```shell
apt install apache2 apache2-dev mapnik-utils fonts-noto-cjk fonts-noto-hinted fonts-noto-unhinted fonts-hanazono ttf-unifont
```

Build mod_tile for Debian/Ubuntu:

```shell
mkdir ~/mod_tile
cd ~/mod_tile
wget -O mod_tile-0.5.tar.gz https://github.com/openstreetmap/mod_tile/archive/0.5.tar.gz
tar -xvzf mod_tile-0.5.tar.gz
rm ../mod_tile-0.5.tar.gz
cd mod_tile-0.5
debuild
```

You will now have a file `libapache2-mod-tile_*.deb` in the parent directory. Install it:

```shell
dpgk -i ../libapache2_mod-tile_*.deb
```

Build Tirex for Debian/Ubuntu:

```shell
mkdir ~/tirex
cd ~/tirex
wget -O tirex-0.6.3.tar.gz https://github.com/openstreetmap/tirex/archive/v0.6.3.tar.gz
tar -xvzf tirex-0.6.3.tar.gz
cd tirex-0.6.3
rm ../tirex-0.6.3.tar.gz
debuild
```

You will now have a couple of files called `tirex-*.deb` in the parent directory. Install the `tirex-core` and `tirex-backend-mapnik` packages.
All other packages are not required:

```shell
dpgk -i ../tirex-master*.deb ../tirex-backend-mapnik*.deb
```

Check out the map style (located in a separate repository) and build it:

```shell
mkdir /opt/OpenRailwayMap-CartoCSS
git clone https://github.com/OpenRailwayMap/OpenRailwayMap-CartoCSS.git /opt/OpenRailwayMap-CartoCSS/
cd /opt/OpenRailwayMap-CartoCSS
npm install carto
export PATH=$PATH:$(pwd)/node_modules/carto/bin
make
```

Create database indexes to improve the tile rendering performance:

```shell
cat <<EOF | sudo -u postgres psql -d gis
CREATE INDEX openrailwaymap_line_all_but_ab_raz_prop ON planet_osm_line USING gist(way) WHERE railway IN ('rail', 'tram', 'light_rail', 'subway', 'narrow_gauge', 'disused', 'construction');
CREATE INDEX openrailwaymap_line_low ON planet_osm_line USING gist(way) WHERE railway = 'rail' AND tags->'usage' IN ('main', 'branch') AND tags->'service' IS NULL;
CREATE INDEX openrailwaymap_line_med ON planet_osm_line USING gist(way) WHERE railway = 'rail' AND tags->'usage' = 'main' AND tags->'service' IS NULL;
CREATE INDEX openrailwaymap_electrification_signals ON planet_osm_line USING gist(way) WHERE railway = 'signal' AND tags ? 'railway:signal:electricity';
EOF
```

Create some views, functions and a materialized view required by the map style:

```shell
sudo -u osmimport psql -d gis -f /opt/OpenRailwayMap-CartoCSS/sql/osm_carto_views.sql
sudo -u osmimport psql -d gis -f /opt/OpenRailwayMap-CartoCSS/sql/functions.sql
sudo -u osmimport psql -d gis -f /opt/OpenRailwayMap-CartoCSS/sql/update_station_importance.sql
```

Create database user for Tirex:

```shell
sudo -u postgres createuser tirex
sudo -u postgres psql -d gis "GRANT SELECT ON ALL TABLES IN SCHEMA public TO tirex;"
```

Create a symlink to Tirex's location of the tile cache:

```shell
ln -s /var/lib/tirex/tiles /var/lib/mod_tile
chown tirex:tirex /var/lib/tirex/tiles
```

Ensure that the Tirex configuration contains the correct Mapnik plugin path, Syslog facility and font directory, and that the recursive search on the font directory is enabled. The file `/etc/tirex/renderer/mapnik.conf` should contain the following lines:

```
plugindir=/usr/lib/mapnik/3.0/input/
syslog_facility=daemon
fontdir=/usr/share/fonts/
fontdir_recurse=1
```

Enable mod_tile:

```shell
cd /etc/apache2/mods-available
a2enmod tile
```

Deactivate default mod_tile Apache virtual host configuration:

```shell
cd /etc/apache2/sites-available
a2dissite tilserver_site.conf
```

Add the following Apache configuration to `/etc/apache2/sites-available/tiles.openrailwaymap.org.conf`

```ApacheConf
ServerName tiles.openrailwaymap.org
ServerAlias a.tiles.openrailwaymap.org
ServerAlias b.tiles.openrailwaymap.org
ServerAlias c.tiles.openrailwaymap.org

DocumentRoot /var/www/tiles
LogLevel info tile:warn ssl:warn
ModTileRenderdSocketName /var/lib/tirex/modtile.sock
ModTileTileDir           /var/lib/tirex/tiles
AddTileConfig            /standard standard
AddTileConfig            /maxspeed maxspeed
AddTileConfig            /signals signals
AddTileConfig            /electrification electrification
ModTileRequestTimeout 0
ModTileMissingRequestTimeout 90
ModTileMaxLoadOld 4
ModTileMaxLoadMissing 8

Header set Access-Control-Allow-Origin "*"

<Location />
    Require all granted
</Location>

ErrorLog /var/log/apache2/tiles.error.log
CustomLog /var/log/apache2/tiles.access.log combined
```

Create tile cache directories for all the styles:

```shell
mkdir /var/lib/tirex/tiles/standard
mkdir /var/lib/tirex/tiles/maxspeed
mkdir /var/lib/tirex/tiles/signals
mkdir /var/lib/tirex/tiles/electrification
```

Now create configurations for each map style. The files should be called `/etc/tirex/renderer/mapnik/STYLENAME.conf` where `STYLENAME` is the name of the map styles (`standard`, `maxspeed`, `signals`, `electrification`). Each of the files should have the following content (don't forget to replace `STYLENAME` with then name of the style):

```
name=STYLENAME
tiledir=/var/lib/tirex/tiles/STYLENAME
minz=0
maxz=19
mapfile=/opt/OpenRailwayMap-CartoCSS/STYLENAME.xml
maxrequests=50
tilesize=512
scalefactor=2.0
buffersize=50
```

Tirex and mod_tile should be ready now. Let's start them:

```shell
systemctl start tirex-backend-manager tirex-master
systemctl restart apache
```

You can pre-render tiles on low and medium zoom levels to fill the cache because they take longer to render (modify the `bbox` argument as you need it):

```shell
for STYLE in standard maxspeed signals electrification ; do
    tirex-batch -p 25 map=$STYLE z=0-12 bbox=-180,-85,180,85
done
```

You can monitor the tile rendering queue using the `tirex-status` command.

## Setting up the MapCSS map style (for legend and JOSM)

Now get the code for node-tileserver:

```shell
$ cd /var/www/html/OpenRailwayMap
$ git submodule update --init renderer
```

Compile the MapCSS styles, JOSM presets and translations:

```shell
$ make
```

Switch to the renderer subdirectory:

```shell
$ cd renderer
```

 After that you can install all necessary NodeJS modules with npm:

```shell
$ npm install
```

## Setting up the API

 In case your system uses systemd you can install the unit file for the API server:

```shell
$ cd /var/www/html/OpenRailwayMap/api
$ sudo make install-systemd
```

 The user and group the service will run defaults to "openrailwaymap", you can change this in the makefile or by passing the ORM_USER or ORM_GROUP variables to make.

 If you are not using systemd either write an init script or start the server in a screen session.

 After that you can install all necessary NodeJS modules with npm:

```shell
$ npm install
```

Create database views:

```
sudo -u postgres psql -d gis -f api/api_views_and_indexes.sql
```

 Start the API server:

```shell
$ sudo systemctl start orm-api.service
```

 Optionally enable autostart:

```shell
$ sudo systemctl enable orm-api.service
```

## Enabling New Apache Configuration

 Now you enable the necessary Apache modules (mod_proxy, mod_proxy_http), enable the new virtual
 hosts and restart Apache. On Ubuntu/Debian this is done using

```shell
$ a2enmod proxy
$ a2enmod proxy_http
$ cd /etc/apache2/site-available
$ a2ensite www.openrailwaymap.org.conf
$ a2ensite api.openrailwaymap.org.conf
$ a2ensite tiles.openrailwaymap.org.conf
```

 On other distros this is done by adding following entries to your Apache configuration (vhost do not have to be enabled because your Apache configuration contains `IncludeOptional /etc/apache2/vhosts.d/*.conf`. Check that the proxy modules are enabled. `httpd.conf should contain

```ApacheConf
LoadModule mod_proxy
LoadModule mod_proxy_http
```

Now restart Apache (the daemon is called *httpd* on some systems):

```shell
$ systemctl restart apache2.service
```

## Keeping Your Data Up To Date

The Ansible repository contains a [script](https://github.com/OpenRailwayMap/server-admin/blob/master/scripts/update_osm.sh) to apply OpenStreetMap data updates to the database.
