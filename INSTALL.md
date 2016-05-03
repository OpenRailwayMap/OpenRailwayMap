Installation Instructions
=========================

## Dependencies

CentOS:

    $ yum update
    $ yum install gzip zlib zlib-devel postgresql-server postgresql-libs postgresql postgresql-common postgresql-devel postgis unzip gnome-python2-rsvg pygobject2 pygobject2-devel librsvg2 librsvg2-devel cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel npm nodejs git python wget php php-php-gettext php-pgsql python-ply python-imaging pycairo python-cairosvg pygtk2 pygtk2-devel make
    # in case you want to build osm2pgsql from sources
    $ yum install cmake

Debian/Ubuntu:

    $ apt-get install --no-install-recommends postgresql-9.3-postgis-2.1
    $ apt-get install gzip postgresql-common libgeoip1 geoip-database geoip-bin php5-geoip php-gettext unzip python-ply python-imaging python-cairo python-cairosvg librsvg2-2 librsvg2-dev libpango1.0-dev libcairo2-dev libcairomm-1.0-dev libjpeg-turbo8-dev libpangomm-1.4-1 libpangomm-1.4-dev npm nodejs wget zlib1g-dev osm2pgsql php5-pgsql
    $ apt-get install git libgif-dev build-essential g++ make
    $ apt-get install nodejs-legacy # see https://stackoverflow.com/questions/21168141/can-not-install-packages-using-node-package-manager-in-ubuntu for the reason
    # in case you want to build osm2pgsql from sources
    $ apt-get install cmake

## Installation

 The following instructions assume installation on an CentOS server with sudo permissions. These steps assume CentOS 6, if using different version of Ubuntu the available versions of software may change requiring slight modifications to these steps. It may be necessary to change parts of this instructions for using on other environments.

 Login as root user:

    $ su root

 Move to your favorite directory and clone this repository:

    $ git clone https://github.com/rurseekatze/OpenRailwayMap.git
    $ cd OpenRailwayMap

 First install all dependencies. Depending on your operating system and environment, you may use another command like apt-get. Package names can differ from the names mentioned below:



 For system-specific installation of Cairo view the [node-canvas Wiki](https://github.com/LearnBoost/node-canvas/wiki/_pages).

 Install Leaflet:

    $ wget http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.zip
    $ unzip leaflet.zip
    $ mv leaflet.js images js
    $ sed s,images/,../js/images/, leaflet.css > css/leaflet.css
    $ rm leaflet.zip leaflet-src.js leaflet.css

 Install osm2pgsql (Ubuntu and Debian users may use their `osm2pgsql` package provided by their distribution instead):

    $ cd import
    $ git clone https://github.com/openstreetmap/osm2pgsql.git
    $ mkdir osm2pgsql-build
    $ cd osm2pgsql-build
    $ cmake ../osm2pgsql
    $ make
    $ cp osm2pgsql /usr/local/bin
    $ cd ..
    $ rm -fr osm2pgsql osm2pgsql-build

 Install osmctools (Ubuntu and Debian users may use their `osmctools` package provided by their distribution instead):

    $ git clone https://gitlab.com/osm-c-tools/osmctools.git
    $ cd osmctools
    $ gcc osmupdate.c -o ../osmupdate
    $ gcc osmfilter.c -O3 -o ../osmfilter
    $ gcc osmconvert.c -lz -O3 -o ../osmconvert
    $ cp osmupdate osmfilter osmconvert /usr/local/bin
    $ cd ..
    $ rm -fr osmctools

 Set up the PostgreSQL database with PostGIS and hstore extensions:

    $ su postgres
    $ createuser railmap
    $ createdb -E UTF8 -O railmap railmap
    $ createlang plpgsql railmap # not necessary on Postgres >= 9.3
    $ psql -d railmap -f /usr/share/pgsql/contrib/postgis-64.sql # Postgres < 9.x
    $ psql -d railmap -f /usr/share/pgsql/contrib/postgis-1.5/spatial_ref_sys.sql # Postgres < 9.x
    $ psql -d railmap -c "CREATE extension postgis;" # Postgres >= 9.x
    $ psql -d railmap -f /usr/share/pgsql/contrib/hstore.sql # Postgres < 9.x
    $ psql -d railmap -c "CREATE extension hstore;" # Postgres >= 9.x
    $ psql -d railmap -f osm2pgsql/900913.sql # not necessary for PostGIS >= 2.x

 If you are using PostgreSQL version < 9.3 you also need to add a function (from https://gist.github.com/kenaniah/1315484):

    $ echo "CREATE OR REPLACE FUNCTION public.hstore2json (
      hs public.hstore
    )
    RETURNS text AS
    $body$
    DECLARE
      rv text;
      r record;
    BEGIN
      rv:='';
      for r in (select key, val from each(hs) as h(key, val)) loop
        if rv<>'' then
          rv:=rv||',';
        end if;
        rv:=rv || '"'  || r.key || '":';

        --Perform escaping
        r.val := REPLACE(r.val, E'\\', E'\\\\');
        r.val := REPLACE(r.val, '"', E'\\"');
        r.val := REPLACE(r.val, E'\n', E'\\n');
        r.val := REPLACE(r.val, E'\r', E'\\r');

        rv:=rv || CASE WHEN r.val IS NULL THEN 'null' ELSE '"'  || r.val || '"' END;
      end loop;
      return '{'||rv||'}';
    END;
    $body$
    LANGUAGE 'plpgsql'
    IMMUTABLE
    CALLED ON NULL INPUT
    SECURITY INVOKER
    COST 100;" | psql -d railmap

 It is necessary to to set permissions for the tables. Note that the `railmap` in `railmap_point` and others is the database prefix as used in `osm2pqsql`. Replace `user` by the username of the user that runs the API server process:

    $ echo "ALTER TABLE geometry_columns OWNER TO railmap;" | psql -d railmap
    $ echo "ALTER TABLE spatial_ref_sys OWNER TO railmap;" | psql -d railmap
    $ echo "CREATE ROLE user;" | psql -d railmap
    $ echo "ALTER ROLE user LOGIN;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_point TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_line TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_polygon TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_rels TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_nodes TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_ways TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON railmap_roads TO user;" | psql -d railmap
    $ echo "GRANT SELECT ON geography_columns TO user;"  | psql -d railmap
    $ echo "GRANT SELECT ON geometry_columns TO user;"  | psql -d railmap
    $ echo "GRANT SELECT ON spatial_ref_sys TO user;"  | psql -d railmap

 Now get the code for node-tileserver:

    $ cd ..
    $ git submodule update --init renderer

 Compile the MapCSS styles, JOSM presets and translations:

    $ make

 Switch to the renderer subdirectory:

    $ cd renderer

 After that you can install all necessary NodeJS modules with npm:

    $ npm install

 Start the tileserver in a screen session:

    $ screen -R tileserver
    $ node tileserver.js
    $ [Ctrl][A][D]

 Run

    $ cd ../import
    $ ./import.sh

 initially to download OSM data, import it into the database and prerender some tiles.

 Note that you have to recompile the stylesheets every time you change the MapCSS files to apply the changes. It is also necessary to restart the tileserver to reload the stylesheets.

    $ make -C styles
    $ screen -r tileserver
    $ [Ctrl][C]
    $ node tileserver.js
    $ [Ctrl][A][D]

 You need a proxy that routes incoming requests.Configure the parallel running webserver (in most cases Apache) to listen on `127.0.0.1:8080`. A NodeJS proxy will redirect each request either to the webserver or the tileserver. Keep in mind that now 127.0.0.1 will appear as the user IP address - so you may have to change the configuration of geolocation or user statistics. Start the proxy in a screen session:

 Remember to change the domains in the script and the configuration of your parallel running webservers. The NodeJS proxy listens on port 80 while parallel webservers should listen on 8080.

    $ cd ..
    $ screen -R proxy
    $ node proxy.js
    $ [Ctrl][A][D]

 You can jump back to the session to see log output or to restart the processes:

    $ screen -r tileserver
    $ screen -r proxy

 Create a cronjob that executes the following script to update the database and rerender expired tiles:

    $ ./update.sh

 The update script should be executed no more than once a day because of the long running processes.


## Configuration

 There are a lot of configuration settings in `renderer/config.json`. See https://github.com/rurseekatze/node-tileserver/blob/master/README.md for further details. The default params are ok for most cases. The tileserver has to be restarted after configuration changes.

 It is also necassary to change setting parameters in `import/config.cfg`, `api/config.json` and `proxy.js` depending on your envoironment. More information on detailled configuration will be added in future.
