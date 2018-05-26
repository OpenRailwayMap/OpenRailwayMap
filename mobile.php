<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/

	require_once("api/functions.php");

	if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $langs))
		$lang = $_GET['lang'];
	else
		$lang = getUserLang();

	includeLocale($lang);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="content-language" content="<?php echo $lang; ?>" />

		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<title>OpenRailwayMap</title>
		<meta name="title" content="OpenRailwayMap" />
		<meta name="application-name" content="OpenRailwayMap" />
		<meta name="page-topic" content="OpenRailwayMap" />
		<meta name="description" content="OpenRailwayMap - An OpenStreetMap-based project for creating a map of the world&#39;s railway infrastructure." />
		<meta name="keywords" content="openstreetmap, openrailwaymap, alexander matheisen, rurseekatze, openlayers, osm, matheisen, orm, eisenbahnkarte, bahnkarte, railmap, railway, railways, eisenbahn, streckenkarte" />
		<meta name="robots" content="index,follow" />

		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap Deutsch" href="https://blog.openrailwaymap.org/de.rss" hreflang="de" />
		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap English" href="https://blog.openrailwaymap.org/en.rss" hreflang="en" />

		<link rel="search" type="application/opensearchdescription+xml" href="opensearch.xml" title="OpenRailwayMap" />

		<link rel="shortcut icon" href="img/openrailwaymap-16.png" type="image/png" />
		<link rel="icon" href="img/openrailwaymap-16.png" type="image/png" />

		<meta http-equiv="content-script-type" content="text/javascript" />
		<meta http-equiv="content-style-type" content="text/css" />

		<link rel="stylesheet" type="text/css" href="css/mobile.css" />
		<link rel="stylesheet" type="text/css" href="css/leaflet.css" />

		<script type="text/javascript" src="js/leaflet.js"></script>
		<script type="text/javascript" src="js/L.TileLayer.Grayscale.js"></script>
		<script>L_DISABLE_3D = true;</script>

		<?php
			urlArgsToParam(true, $urlbase);
		?>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/startposition.js"></script>
		<script type="text/javascript" src="js/timestamp.js"></script>
		<script type="text/javascript" src="js/mobilemenu.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		<script type="text/javascript" src="js/mobile.js"></script>

		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-title" content="OpenRailwayMap">
		<link rel="manifest" href="webapp-manifest.json">
		<meta name="theme-color" content="#4e9a06">

		<meta name="twitter:card" content="summary" />
		<meta name="twitter:site" content="@openrailwaymap" />
		<meta name="twitter:title" content="OpenRailwayMap" />
		<meta name="twitter:description" content="OpenRailwayMap - An OpenStreetMap-based project for creating a map of the world&amp;#39;s railway infrastructure." />
		<meta name="twitter:url" content="https://www.openrailwaymap.org/">
		<meta name="twitter:image" content="https://www.openrailwaymap.org/img/openrailwaymap-310.png" />
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
				<a style="display:block" class="resultEntry" id="infoButton" href="https://wiki.openstreetmap.org/wiki/OpenRailwayMap"><?=_("More Info")?></a>
				<a style="display:block" class="resultEntry" id="infoButton" href="https://blog.openrailwaymap.org/"><?=_("Blog")?></a>
				<a style="display:block" class="resultEntry" id="contactButton" href="#"><?=_("Contact")?></a>
				<a style="display:block" class="resultEntry" id="paypalButton" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=9KCKT39N7AGL8"><?=_("Donate")?></a>
				<a style="display:block" class="resultEntry" id="imprintButton" href="/imprint"><?=_("Imprint &amp; Privacy Policy")?></a>
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
