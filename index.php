<?php
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
		<meta name="keywords" content="openstreetmap, openrailwaymap, alexander matheisen, rurseekatze, openlayers, osm, matheisen, olm, eisenbahnkarte, bahnkarte, railmap, railway, railways, eisenbahn, streckenkarte" />
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
		<link rel="stylesheet" type="text/css" href="css/map.css" />
		<link rel="stylesheet" href="css/leaflet.css" />
		<!--[if lte IE 8]>
			<link rel="stylesheet" href="css/leaflet.ie.css" />
		<![endif]-->
		<script type="text/javascript" src="js/leaflet-0.5.1.js"></script>
		<?php
			// params
			echo "<script type=\"text/javascript\">\n";
				echo "var params={\n";
				echo "id : ".(isset($_GET['id']) ? ($_GET['id']) : ("null")).",\n";
				$type = isset($_GET['type']) ? $_GET['type'] : null;
				if (!isset($type))
					$type = isset($_GET['objecttype']) ? $_GET['objecttype'] : null;
				echo "type : ".(isset($type) ? ("\"".$type."\"") : ("null")).",\n";
				echo "ext : ".((isset($_GET['ext']) && ($_GET['ext'] == 1)) ? ("true") : ("false")).",\n";
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
				echo "bounded : ".(((isset($_GET['bounded'])) && ($_GET['bounded'] == 1)) ? 1 : 0).",\n";
				echo "offset : ".(isset($_GET['offset']) ? ($_GET['offset']) : ("null")).",\n";
				echo "searchquery : \"".(isset($_GET['q']) ? ($_GET['q']) : (""))."\",\n";
				echo "lang : \"".$_GET['lang']."\"\n";
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
		<script type="text/javascript" src="js/functions.js"></script>
		<!-- Piwik -->
		<script type="text/javascript">
			var pkBaseURL = (("https:" == document.location.protocol) ? "https://piwik.openlinkmap.org/" : "http://piwik.openlinkmap.org/");
			document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
		</script>
		<script type="text/javascript">
			try
			{
				var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
				piwikTracker.trackPageView();
				piwikTracker.enableLinkTracking();
			}
			catch( err )
			{}
		</script>
		<noscript>
			<p><img src="http://piwik.openlinkmap.org/piwik.php?idsite=2" style="border:0" alt="" /></p>
		</noscript>
		<!-- End Piwik Tracking Code -->
		<script type="text/javascript">
		/* <![CDATA[ */
			(function(){
				var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
				s.type = 'text/javascript';
				s.async = true;
				s.src = 'http://api.flattr.com/js/0.6/load.js?mode=auto';
				t.parentNode.insertBefore(s, t);
			})();
		/* ]]> */</script>
	</head>
	<body onload="createMap();">
		<div id="fullscreen" class="fullscreenOut"></div>
		<div id="moreInfo" class="moreInfoFalse"></div>
		<div id="sideBar" class="sideBar" onmouseover="hoverSidebar();" onmouseout="unhoverSidebar();">
			<b id="header"><a href="index.php"><?=$appname?></a></b>
			<form id="langSelection">
				<select id="langSelector" name="language" size="1" onChange="changeLanguage(this.form.language.options[this.form.language.selectedIndex].value);">
					<?php
						$languages = array(
							"de" => "Deutsch",
							"en" => "English",
							"fr" => "Français",
							"it" => "Italiano",
							"ja" => "日本語",
							"nl" => "Nederlands",
							"ru" => "Русский"
						);
						foreach ($languages as $short => $name)
						{
							echo "<option value=\"".$short."\"";
							if ($short == $lang)
								echo " selected";
							echo ">".$name."</option>\n";
						}
					?>
				</select>
			</form>
			<br />
			<a href="http://joker.com/" id="poweredby"><img src="img/ad.png" /></a>
			<form target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" id="PaypalButton">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="ELF9KT74GH32G">
				<input type="image" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal">
				<img alt="" border="0" src="https://www.paypalobjects.com/<?=$paypalbuttonlang?>/i/scr/pixel.gif" width="1" height="1">
			</form>
			<a class="FlattrButton" id="FlattrButton" style="display:none;" rev="flattr;button:compact;" href="http://www.openrailwaymap.org/"></a>
			<noscript>
				<a href="http://flattr.com/thing/1327262/OpenRailwayMap" target="_blank">
					<img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" />
				</a>
			</noscript>
			<p id="info"></p>
			<div id="linkBar">
				<a class="links" id="spamButton" onclick="reportSpam();"><?=_("Report bug in map")?></a>&nbsp;•
				<a class="links" id="infoButton" href="http://wiki.openstreetmap.org/wiki/OpenLinkMap" target="_blank"><?=_("More Info")?></a>&nbsp;•
				<a class="links" id="contactButton" href="#"><?=_("Contact")?></a>
				<script language="javascript">
					var usr = "info";
					var dom = "openlinkmap";
					var tld = "org";
					gEBI("contactButton").href="mailto:"+usr+"@"+dom+"."+tld;
				</script>
			</div>
			<input type="text" id="searchBox" size="20" />
			<img id="searchButton" src="img/search.png" onclick="Search.request();" title="Search" />
			<img id="clearButton" src="img/clear.png" onclick="Search.clear();" />
			<br />
			<input type="checkbox" id="searchCheckbox"><label id="searchCheckboxCaption"><?=_("Search only in the current map view")?><label><br /><br />
			<div id="searchBar" class="infoBarOut"></div>
			<div id="detailsBar" class="infoBarOut"></div>
			<iframe id="josmFrame" src="about:blank"></iframe>
		</div>
		<div class="hideSidebarButton" id="hideSidebarButton" onclick="hideSideBar();" title="<?=_('Hide')?>"><b id="hideText">«</b></div>
		<img class="locateButton" id="locateButton" src="img/locate.png" />
		<div id="mapFrame" class="mapFrame">
			<noscript>
				<p><b><?=_("Javascript is not activated")?></b><br /><?=_("Javascript is needed to show the map and run this website. Please turn on Javascript in your browser settings.")?></p>
			</noscript>
		</div>
	</body>
</html>
