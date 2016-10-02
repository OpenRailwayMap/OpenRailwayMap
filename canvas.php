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
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $lang; ?>" lang="<?php echo $lang; ?>">
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
		<link rel="alternate" type="application/rss+xml" title="OpenRailwayMap RSS Feed" href="http://www.matheisen.org/<?php echo ($lang == 'de') ? 'de' : 'en'; ?>/orm.rss" />
		<link rel="search" type="application/opensearchdescription+xml" href="opensearch.xml" title="OpenRailwayMap" />
		<link rel="shortcut icon" href="img/openrailwaymap-16.png" type="image/png" />
		<link rel="icon" href="img/openrailwaymap-16.png" type="image/png" />
		<meta http-equiv="content-script-type" content="text/javascript" />
		<meta http-equiv="content-style-type" content="text/css" />
		<link rel="stylesheet" type="text/css" href="css/map.css" />
		<link rel="stylesheet" href="css/leaflet.css" />
		<script type="text/javascript" src="js/leaflet.js"></script>
		<script type="text/javascript" src="js/L.TileLayer.Grayscale.js"></script>
		<script type="text/javascript" src="renderer/kothic/kothic.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/path.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/line.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/polygon.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/shields.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/texticons.js"></script>
		<script type="text/javascript" src="renderer/kothic/renderer/text.js"></script>
		<script type="text/javascript" src="renderer/kothic/style/mapcss.js"></script>
		<script type="text/javascript" src="renderer/kothic/style/style.js"></script>
		<script type="text/javascript" src="renderer/kothic/utils/collisions.js"></script>
		<script type="text/javascript" src="renderer/kothic/utils/geom.js"></script>
		<script type="text/javascript" src="renderer/kothic/utils/rbush.js"></script>
		<script type="text/javascript" src="renderer/kothic/kothic-leaflet.js"></script>
		<script type="text/javascript" src="styles/standard.js"></script>
		<script type="text/javascript" src="styles/signals.js"></script>
		<script type="text/javascript" src="styles/maxspeed.js"></script>
		<script type="text/javascript" src="styles/electrified.js"></script>
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
		<script type="text/javascript" src="js/canvas-map.js"></script>
		<!-- Piwik -->
		<script type="text/javascript">
			var _paq = _paq || [];
			_paq.push(["trackPageView"]);
			_paq.push(["enableLinkTracking"]);

			(function() {
			var u=(("https:" == document.location.protocol) ? "https" : "http") + "://piwik.openrailwaymap.org/";
			_paq.push(["setTrackerUrl", u+"piwik.php"]);
			_paq.push(["setSiteId", "2"]);
			var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
			g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
			})();
		</script>
		<!-- End Piwik Code -->
		<script type="text/javascript">
		/* <![CDATA[ */
			(function(){
				var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
				s.type = 'text/javascript';
				s.mode = 'auto';
				s.async = true;
				s.src = 'http://api.flattr.com/js/0.6/load.js?mode=auto';
				t.parentNode.insertBefore(s, t);
			})();
		/* ]]> */</script>
	</head>
	<body onload="createMap(false);">
		<div id="fullscreen" class="fullscreenOut"></div>
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
			<a href="http://joker.com/" id="poweredby"><img src="img/ad.png" /></a>
			<p id="info"></p>
			<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" id="PaypalButton">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="9KCKT39N7AGL8">
				<input type="image" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal">
				<img alt="" border="0" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/scr/pixel.gif" width="1" height="1">
			</form>
			<a class="FlattrButton" id="FlattrButton" style="display:none;" rev="flattr;button:compact;" href="http://www.openrailwaymap.org/"></a>
			<noscript>
				<a href="http://flattr.com/thing/1327262/OpenRailwayMap" target="_blank">
					<img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" />
				</a>
			</noscript>
			<div id="linkBar">
				<a class="links" id="infoButton" href="http://wiki.openstreetmap.org/wiki/OpenRailwayMap" target="_blank"><?=_("More Info")?></a>&nbsp;•
				<a class="links" id="infoButton" href="http://blog.openrailwaymap.org/" target="_blank"><?=_("Blog")?></a>&nbsp;•
				<a class="links" id="contactButton" href="#"><?=_("Contact")?></a>&nbsp;•
				<a class="links" id="permalinkButton" href="#"><?=_("Permalink")?></a>
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
