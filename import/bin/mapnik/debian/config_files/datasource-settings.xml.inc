<!--
Settings for your postgres setup.

Note: feel free to leave password, host, port, or use blank
-->

<Parameter name="type">postgis</Parameter>
<Parameter name="password">gis</Parameter>
<!-- Parameter name="host">localhost</Parameter -->
<!-- Parameter name="port">%(port)s</Parameter -->
<Parameter name="user">www-data</Parameter>
<Parameter name="dbname">gis</Parameter>
<!-- this should be 'false' if you are manually providing the 'extent' -->
<Parameter name="estimate_extent">true</Parameter>
<!-- manually provided extent in epsg 900913 for whole globe -->
<!-- providing this speeds up Mapnik database queries -->
<!-- Parameter name="extent">%(extent)s</Parameter -->
