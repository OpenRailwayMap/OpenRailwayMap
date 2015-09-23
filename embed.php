<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/

	require_once("api/functions.php");

	if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $langs))
		$lang = $_GET['lang'];
	else
		$lang = getUserLang();

	includeLocale($lang);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<? echo $lang; ?>" lang="<? echo $lang; ?>">
	<head>
		<title>OpenRailwayMap</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="content-language" content="<? echo $lang; ?>" />
		<meta name="keywords" content="openstreetmap, openrailwaymap, alexander matheisen, rurseekatze, openlayers, osm, matheisen, orm, eisenbahnkarte, bahnkarte, railmap, railway, railways, eisenbahn, streckenkarte" />
		<meta name="title" content="OpenRailwayMap" />
		<meta name="author" content="rurseekatze, Alexander Matheisen" />
		<meta name="publisher" content="rurseekatze, Alexander Matheisen" />
		<meta name="copyright" content="GNU General Public License v3" />
		<meta name="revisit-after" content="after 90 days" />
		<meta name="date" content="2010-01-01" />
		<meta name="page-topic" content="OpenRailwayMap" />
		<meta name="robots" content="index,follow" />
		<link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
		<link rel="icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
		<meta http-equiv="content-script-type" content="text/javascript" />
		<meta http-equiv="content-style-type" content="text/css" />
		<link rel="stylesheet" type="text/css" href="css/embed.css" />
		<link rel="stylesheet" href="css/leaflet.css" />
		<!--[if lte IE 8]>
			<link rel="stylesheet" href="css/leaflet.ie.css" />
		<![endif]-->
		<script type="text/javascript" src="js/leaflet-0.6.2.js"></script>
		<script type="text/javascript" src="js/L.TileLayer.Grayscale.js"></script>
		<?php
			// params
			echo "<script type=\"text/javascript\">\n";
				echo "var params={\n";
				echo "id : ".(isValidId('id') ? ($_GET['id']) : ("null")).",\n";
				echo "type : ".(isValidType('type') ? ("'".$_GET['type']."'") : ("null")).",\n";
				echo "lat : ";
					if (isValidCoordinate('lat'))
						echo $_GET['lat'].",\n";
					else
					{
						$latlon = getLatLon('id', $type);
						if ($latlon)
							echo $latlon[1].",\n";
						else
							echo "null,\n";
					}
				echo "lon : ";
					if (isValidCoordinate('lon'))
						echo $_GET['lon'].",\n";
					else
					{
						$latlon = getLatLon('id', $type);
						if ($latlon)
							echo $latlon[0].",\n";
						else
							echo "null,\n";
					}
				echo "zoom : ".(isValidZoom('zoom') ? ($_GET['zoom']) : ("null")).",\n";
				echo "offset : ".(isValidOffset('offset') ? ($_GET['offset']) : ("null")).",\n";
				echo "searchquery : ".(isset($_GET['q']) ? (json_encode($_GET['q'])) : ("''")).",\n";
				echo "lang : '".$lang."',\n";
				echo "ref : ".(isset($_GET['ref']) ? (json_encode($_GET['ref'])) : ("null")).",\n";
				echo "name : ".(isset($_GET['name']) ? (json_encode($_GET['name'])) : ("null")).",\n";
				echo "position : ".(isValidPosition($_GET['position']) ? (json_encode($_GET['position'])) : ("null")).",\n";
				echo "line : ".(isset($_GET['line']) ? (json_encode($_GET['line'])) : ("null")).",\n";
				echo "operator : ".(isset($_GET['operator']) ? (json_encode($_GET['operator'])) : ("null")).",\n";
				echo "style : ".(isset($_GET['style']) ? (json_encode($_GET['style'])) : ("null"))."\n";
				echo "};\n";
			echo "</script>\n";
		?>
		<script type="text/javascript" src="api/jstranslations.php?lang=<? echo $lang; ?>"></script>
		<script type="text/javascript" src="js/startposition.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		<script type="text/javascript" src="js/bitmap-map.js"></script>
	</head>
	<body onload="createMap(true);">
		<div id="mapFrame">
			<noscript>
				<p><b><?=_("Javascript is not activated")?></b><br /><?=_("Javascript is needed to show the map and run this website. Please turn on Javascript in your browser settings.")?></p>
			</noscript>
		</div>
	</body>
</html>
