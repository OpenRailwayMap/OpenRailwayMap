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
<!DOCTYPE html>
<html>
	<head>
		<title>OpenRailwayMap</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="content-language" content="<?php echo $lang; ?>" />
		<meta name="keywords" content="openstreetmap, openrailwaymap, alexander matheisen, rurseekatze, openlayers, osm, matheisen, orm, eisenbahnkarte, bahnkarte, railmap, railway, railways, eisenbahn, streckenkarte" />
		<meta name="title" content="OpenRailwayMap" />
		<meta name="author" content="rurseekatze, Alexander Matheisen" />
		<meta name="publisher" content="rurseekatze, Alexander Matheisen" />
		<meta name="copyright" content="GNU General Public License v3" />
		<meta name="revisit-after" content="after 90 days" />
		<meta name="date" content="2010-01-01" />
		<meta name="page-topic" content="OpenRailwayMap" />
		<meta name="robots" content="index,follow" />

		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap Deutsch" href="https://blog.openrailwaymap.org/de.rss" hreflang="de" />
		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap English" href="https://blog.openrailwaymap.org/en.rss" hreflang="en" />

		<link rel="search" type="application/opensearchdescription+xml" href="opensearch.xml" title="OpenRailwayMap" />
		<link rel="shortcut icon" href="img/openrailwaymap-16.png" type="image/png" />
		<link rel="icon" href="img/openrailwaymap-16.png" type="image/png" />
		<meta http-equiv="content-script-type" content="text/javascript" />
		<meta http-equiv="content-style-type" content="text/css" />
		<link rel="stylesheet" type="text/css" href="css/map.css" />
		<link rel="stylesheet" href="css/leaflet.css" />
		<script type="text/javascript" src="js/leaflet.js"></script>
		<script type="text/javascript" src="js/L.TileLayer.Grayscale.js"></script>
		<?php
			urlArgsToParam(true, $urlbase);

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
		<script type="text/javascript" src="api/jstranslations.php?lang=<?php echo $lang; ?>"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/startposition.js"></script>
		<script type="text/javascript" src="js/timestamp.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		<script type="text/javascript" src="js/bitmap-map.js"></script>
		<!-- redirect to mobile version if necessary -->
		<script type="text/javascript">
			mobileRedirection();
		</script>

		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-title" content="OpenRailwayMap">
		<link rel="manifest" href="webapp-manifest.json">
	</head>
	<body onload="createMap(false);">
		<div id="moreInfo" class="moreInfoFalse"></div>
		<div id="sideBar" class="sideBar">
			<b id="header"><a href="index.php">OpenRailwayMap</a></b>
			<form id="langSelection">
				<select id="langSelector" size="1" onChange="changeLanguage(gEBI('langSelector').options[gEBI('langSelector').selectedIndex].value)">
					<?php
						foreach ($langs as $short => $name)
						{
							echo "<option value=\"".$short."\"";
							if ($short == $lang)
								echo " selected";
							echo ">".$name[1]."</option>\n";
						}
					?>
				</select>
			</form>
			<br />
			<p id="info"></p>
			<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" id="PaypalButton">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="9KCKT39N7AGL8">
				<input type="image" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal">
				<img alt="" border="0" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/scr/pixel.gif" width="1" height="1">
			</form>
			<div id="linkBar">
				<a class="links" id="infoButton" href="http://wiki.openstreetmap.org/wiki/OpenRailwayMap" target="_blank"><?=_("More Info")?></a>&nbsp;•
				<a class="links" id="infoButton" href="http://blog.openrailwaymap.org/" target="_blank"><?=_("Blog")?></a>&nbsp;•
				<a class="links" id="contactButton" href="#"><?=_("Contact")?></a>&nbsp;•
				<a class="links" id="permalinkButton" href=""><?=_("Permalink")?></a>
				<script language="javascript">
					var usr = "info";
					var dom = "openrailwaymap";
					var tld = "org";
					gEBI("contactButton").href="mailto:"+usr+"@"+dom+"."+tld;
				</script>
			</div>
			<input type="text" id="searchBox" size="20" />
			<div id="clearButton" onclick="Search.clear();">
				<b>&#10060;</b>
			</div>
			<div id="searchButton" onclick="Search.request();">
				<b>&#8629;</b>
			</div>
			<br />
			<div id="searchBar" class="infoBarOut"></div>
			<div id="detailsBar" class="infoBarOut"></div>
			<div id="styleSelectionBar"></div>
			<div id="legendBar">
				<b><?=_("Legend")?>:</b>
				<iframe id="legend" scrolling="no" onload="setIframeHeight(this.id)" src=""></iframe>
			</div>
			<iframe id="josmFrame" src="about:blank"></iframe>
		</div>
		<div id="locateButton"></div>
		<div id="mapFrame">
			<noscript>
				<p><b><?=_("Javascript is not activated")?></b><br /><?=_("Javascript is needed to show the map and run this website. Please turn on Javascript in your browser settings.")?></p>
			</noscript>
		</div>
	</body>
</html>
