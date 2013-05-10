OpenRailwayMap - A free railway network map based on OpenStreetMap.
===================================================================

OpenRailwayMap Copyright (C) 2012 Alexander Matheisen (Rurseekatze) <info@openrailwaymap.org>
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
Website: http://www.openrailwaymap.org/


Requirements:
* See http://wiki.openstreetmap.org/wiki/OpenRailwayMap


Download:
* git: git clone git://github.com/rurseekatze/OpenRailwayMap.git


Wikipage:
* http://wiki.openstreetmap.org/wiki/OpenRailwayMap


Installation:
* Copy all files and folders into a webserver directory
* Run manually the install script import/install.sh - it might not run correctly on every distribution/platform and has no error exceptions
* After successful installation, modify paths and parameters in every file and run import/import.sh
* Add a cronjob to run import/update.sh (daily seems to be a good frequency)


License:
If there is neither a license attribution header nor a README or COPYING file in the same directory of a file, this file is part of of this project and licensed under these conditions:

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.


This repository/package also contains copies of other projects, which may be licensed under other conditions.
Detailled license information can be found at the beginning of the files or in a README or COPYING file in the same directory of this file.

* The icon is taken from the Oxygen-Iconset, available under GNU LGPLv3: http://www.oxygen-icons.org/
* osmfilter
    * http://wiki.openstreetmap.org/wiki/Osmfilter
    * Author: Markus Weber
    * available under GNU GPLv3
* osmconvert
    * http://wiki.openstreetmap.org/wiki/Osmconvert
    * Author: Markus Weber
    * available under GNU GPLv3
* osmupdate
    * http://wiki.openstreetmap.org/wiki/Osmupdate
    * Author: Markus Weber
    * available under GNU GPLv3
* osm2pgsql
    * http://wiki.openstreetmap.org/wiki/Osm2pgsql
    * Authors: https://raw.github.com/openstreetmap/osm2pgsql/master/AUTHORS
    * available under GNU GPLv2
* Some functions in renderer/vtiler.php are PHP-rewritten and modified functions from twms
    * https://code.google.com/p/twms/
    * Copyright © 2009—2013 Darafei Praliaskoiski <me@komzpa.net>
    * Copyright © 2010—2013 Andrew Shadura <bugzilla@tut.by>
    * available under Do What The Fuck You Want To Public License
* Some functions in renderer/vtiler.php are PHP-rewritten and modified functions from Kothic
    * https://github.com/kothic/kothic
    * available under GNU GPLv3
* Leaflet
    * http://leafletjs.com
    * Copyright (c) 2010-2013, Vladimir Agafonkin
    * Copyright (c) 2010-2011, CloudMade
    * All rights reserved.
    * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* Leaflet Zoomslider plugin
    * https://github.com/kartena/Leaflet.zoomslider
    * Author: Kartena AB
    * Copyright (c) 2012, Kartena AB
    * All rights reserved.
    * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 
    * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
    * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 
    * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


ATTENTION: The included binaries can only be used on i386 Linux systems. If you use other systems, you have to compile the programs for your environment.
