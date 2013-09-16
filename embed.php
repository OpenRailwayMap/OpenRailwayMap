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
		<title><?=$appname?></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="content-language" content="<? echo $lang; ?>" />
		<meta name="keywords" content="openstreetmap, openrailwaymap, alexander matheisen, rurseekatze, openlayers, osm, matheisen, orm, eisenbahnkarte, bahnkarte, railmap, railway, railways, eisenbahn, streckenkarte" />
		<meta name="title" content="<?=$appname?>" />
		<meta name="author" content="rurseekatze, Alexander Matheisen" />
		<meta name="publisher" content="rurseekatze, Alexander Matheisen" />
		<meta name="copyright" content="GNU General Public License v3" />
		<meta name="revisit-after" content="after 90 days" />
		<meta name="date" content="2010-01-01" />
		<meta name="page-topic" content="<?=$appname?>" />
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
		<script type="text/javascript" src="js/kothic.js"></script>
		<script type="text/javascript" src="js/renderer/path.js"></script>
		<script type="text/javascript" src="js/renderer/line.js"></script>
		<script type="text/javascript" src="js/renderer/polygon.js"></script>
		<script type="text/javascript" src="js/renderer/shields.js"></script>
		<script type="text/javascript" src="js/renderer/texticons.js"></script>
		<script type="text/javascript" src="js/renderer/text.js"></script>
		<script type="text/javascript" src="js/style/mapcss.js"></script>
		<script type="text/javascript" src="js/style/style.js"></script>
		<script type="text/javascript" src="js/utils/collisions.js"></script>
		<script type="text/javascript" src="js/utils/geom.js"></script>
		<script type="text/javascript" src="js/utils/rbush.js"></script>
		<script type="text/javascript" src="js/kothic-leaflet.js"></script>
		<script type="text/javascript" src="styles/standard.js"></script>
		<script type="text/javascript" src="styles/signals.js"></script>
		<script type="text/javascript" src="styles/maxspeed.js"></script>
		<?php
			// params
			echo "<script type=\"text/javascript\">\n";
				echo "var params={\n";
				echo "id : ".(isset($_GET['id']) ? ($_GET['id']) : ("null")).",\n";
				$type = isset($_GET['type']) ? $_GET['type'] : null;
				if (!isset($type))
					$type = isset($_GET['objecttype']) ? $_GET['objecttype'] : null;
				echo "type : ".(isset($type) ? ("\"".$type."\"") : ("null")).",\n";
				echo "lat : ";
					if (isset($_GET['lat']))
						echo $_GET['lat'].",\n";
					else
					{
						$latlon = getLatLon($_GET['id'], $type);
						if ($latlon)
							echo $latlon[1].",\n";
						else
							echo "null,\n";
					}
				echo "lon : ";
					if (isset($_GET['lon']))
						echo $_GET['lon'].",\n";
					else
					{
						$latlon = getLatLon($_GET['id'], $type);
						if ($latlon)
							echo $latlon[0].",\n";
						else
							echo "null,\n";
					}
				echo "zoom : ".(isset($_GET['zoom']) ? ($_GET['zoom']) : ("null")).",\n";
				echo "offset : ".(isset($_GET['offset']) ? ($_GET['offset']) : ("null")).",\n";
				echo "searchquery : \"".(isset($_GET['q']) ? ($_GET['q']) : (""))."\",\n";
				echo "lang : \"".$_GET['lang']."\",\n";
				echo "ref : ".(isset($_GET['ref']) ? ("\"".$_GET['ref']."\"") : ("null")).",\n";
				echo "name : ".(isset($_GET['name']) ? ("\"".$_GET['name']."\"") : ("null")).",\n";
				echo "position : ".(isset($_GET['position']) ? ("\"".$_GET['position']."\"") : ("null")).",\n";
				echo "line : ".(isset($_GET['line']) ? ("\"".$_GET['line']."\"") : ("null")).",\n";
				echo "operator : ".(isset($_GET['operator']) ? ("\"".$_GET['operator']."\"") : ("null")).",\n";
				echo "style : ".(isset($_GET['style']) ? ("\"".$_GET['style']."\"") : ("null"))."\n";
				echo "};\n";
			echo "</script>\n";
		?>
		<script type="text/javascript" src="api/jstranslations.php?lang=<? echo $lang; ?>"></script>
		<script type="text/javascript" src="js/startposition.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
	</head>
	<body onload="createMap(true);">
		<div id="mapFrame">
			<noscript>
				<p><b><?=_("Javascript is not activated")?></b><br /><?=_("Javascript is needed to show the map and run this website. Please turn on Javascript in your browser settings.")?></p>
			</noscript>
		</div>
	</body>
</html>
