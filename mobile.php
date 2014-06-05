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
		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap RSS Feed" href="http://www.matheisen.org/<? echo ($lang == 'de') ? 'de' : 'en'; ?>/orm.rss" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
		<link rel="icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
		<meta http-equiv="content-script-type" content="text/javascript" />
		<meta http-equiv="content-style-type" content="text/css" />
		<link rel="stylesheet" type="text/css" href="css/mobile.css" />
		<link rel="stylesheet" href="css/leaflet.css" />
		<!--[if lte IE 8]>
			<link rel="stylesheet" href="css/leaflet.ie.css" />
		<![endif]-->
		<script type="text/javascript" src="js/leaflet-0.6.2.js"></script>
		<script type="text/javascript" src="js/L.TileLayer.Grayscale.js"></script>
		<script>L_DISABLE_3D = true;</script>

		<?php
			// params
			echo "<script type=\"text/javascript\">\n";
				echo "var params={\n";
				echo "id : ".(isValidId($_GET['id']) ? ($_GET['id']) : ("null")).",\n";
				echo "type : ".(isValidType($_GET['type']) ? ("'".$_GET['type']."'") : ("null")).",\n";
				echo "lat : ";
					if (isValidCoordinate($_GET['lat']))
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
					if (isValidCoordinate($_GET['lon']))
						echo $_GET['lon'].",\n";
					else
					{
						$latlon = getLatLon($_GET['id'], $type);
						if ($latlon)
							echo $latlon[0].",\n";
						else
							echo "null,\n";
					}
				echo "zoom : ".(isValidZoom($_GET['zoom']) ? ($_GET['zoom']) : ("null")).",\n";
				echo "offset : ".(isValidOffset($_GET['offset']) ? ($_GET['offset']) : ("null")).",\n";
				echo "searchquery : ".(isset($_GET['q']) ? (json_encode($_GET['q'])) : ("''")).",\n";
				echo "lang : '".$lang."',\n";
				echo "ref : ".(isset($_GET['ref']) ? (json_encode($_GET['ref'])) : ("null")).",\n";
				echo "name : ".(isset($_GET['name']) ? (json_encode($_GET['name'])) : ("null")).",\n";
				echo "position : ".(isValidPosition($_GET['position']) ? (json_encode($_GET['position'])) : ("null")).",\n";
				echo "line : ".(isset($_GET['line']) ? (json_encode($_GET['line'])) : ("null")).",\n";
				echo "operator : ".(isset($_GET['operator']) ? (json_encode($_GET['operator'])) : ("null")).",\n";
				echo "style : ".(isset($_GET['style']) ? (json_encode($_GET['style'])) : ("null")).",\n";
				echo "mobile : ".(isset($_GET['mobile']) ? (($_GET['mobile'] != '0' && $_GET['mobile'] != 'false') ? "true" : "false") : ("null"))."\n";
				echo "};\n";
			echo "</script>\n";

			switch ($lang)
			{
				case "de":
					$paypalbuttonlang = "de_DE";
					break;
				case "en":
					$paypalbuttonlang = "en_US";
					break;
				case "fr":
					$paypalbuttonlang = "fr_FR";
					break;
				case "es":
					$paypalbuttonlang = "es_ES";
					break;
				case "nl":
					$paypalbuttonlang = "nl_NL";
					break;
				case "it":
					$paypalbuttonlang = "it_IT";
					break;
				case "ru":
					$paypalbuttonlang = "ru_RU";
					break;
				case "pl":
					$paypalbuttonlang = "pl_PL";
					break;
				default:
					$paypalbuttonlang = "en_US";
					break;
			}
		?>
		<script type="text/javascript" src="api/jstranslations.php?lang=<? echo $lang; ?>"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/startposition.js"></script>
		<script type="text/javascript" src="js/timestamp.js"></script>
		<script type="text/javascript" src="js/mobilemenu.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		<script type="text/javascript" src="js/mobile.js"></script>
		<!-- Piwik -->
		<script type="text/javascript">
			var _paq = _paq || [];
			_paq.push(["trackPageView"]);
			_paq.push(["enableLinkTracking"]);

			(function() {
			var u=(("https:" == document.location.protocol) ? "https" : "http") + "://piwik.openlinkmap.org/";
			_paq.push(["setTrackerUrl", u+"piwik.php"]);
			_paq.push(["setSiteId", "2"]);
			var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
			g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
			})();
		</script>
		<!-- End Piwik Code -->
	</head>
	<body onload="createMap(false);">
		<div id="header">
			<b>OpenRailwayMap</b>
			<div id="menuButton"></div>
		</div>
		<div id="menu" class="menuOut">
			<div class="box">
				<div class="headEntry"><?=_("Style")?></div>
				<div id="styleSelectionBar"></div>
			</div>
			<div class="box">
				<div class="headEntry"><?=_("Search")?></div>
				<div class="headEntry">
					<div>
						<input type="text" id="searchBox" size="21" placeholder="<?=_('Search')?>" />
					</div>
					<div id="clearButton" onclick="Search.clear();">
						<b>&#10060;</b>
					</div>
					<div id="searchButton" onclick="Search.request();">
						<b>&#8629;</b>
					</div>
				</div>
				<div id="searchBar" class="infoBarOut"></div>
			</div>
			<div class="box">
				<div class="headEntry"><?=_("Legend")?></div>
				<div id="legendBar">
					<iframe id="legend" scrolling="no" onload="setIframeHeight(this.id)" src=""></iframe>
				</div>
			</div>
			<div class="box">
				<div class="headEntry"><?=_("Last update")?></div>
				<p id="info"></p>
			</div>
			<div class="box">
				<div class="headEntry"><?=_("Language")?></div>
				<?php
					foreach ($langs as $short => $name)
					{
						if ($short == $lang)
							echo '<div class="resultEntry">'.$name[1].'<small>&#10003;</small></div>';
						else
							echo '<div class="resultEntry" onclick="changeLanguage(\''.$short.'\')">'.$name[1].'</div>';
					}
				?>
			</div>
			<hr class="separator" />
			<div class="box">
				<a style="display:block" class="resultEntry" id="infoButton" href="http://wiki.openstreetmap.org/wiki/OpenRailwayMap"><?=_("More Info")?></a>
				<a style="display:block" class="resultEntry" id="infoButton" href="http://blog.openrailwaymap.org/"><?=_("Blog")?></a>
				<a style="display:block" class="resultEntry" id="contactButton" href="#"><?=_("Contact")?></a>
				<a style="display:block" class="resultEntry" id="permalinkButton" href=""><?=_("Permalink")?></a>
				<a style="display:block" class="resultEntry" id="desktopButton" href=""><?=_("Desktop version")?></a>
				<script language="javascript">
					var usr = "info";
					var dom = "openrailwaymap";
					var tld = "org";
					gEBI("contactButton").href = "mailto:"+usr+"@"+dom+"."+tld;
				</script>
			</div>
		</div>
		<div id="locateButton"></div>
		<script language="javascript">
			if (isMobileDevice())
				gEBI("locateButton").className = "leaflet-touch";
		</script>
		<div id="mapFrame">
			<noscript>
				<p><b><?=_("Javascript is not activated")?></b><br /><?=_("Javascript is needed to show the map and run this website. Please turn on Javascript in your browser settings.")?></p>
			</noscript>
		</div>
	</body>
</html>
