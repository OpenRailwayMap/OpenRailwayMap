<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $langs))
		$lang = $_GET['lang'];
	else
		$lang = getUserLang();
	includeLocale($lang);

	$zoom = isset($_GET['zoom']) ? ($_GET['zoom']) : (null);
	$filename = isset($_GET['style']) ? ("styles/".$_GET['style'].".json") : (null);
?>
<!DOCTYPE html>
<html>
	<head>
		<title><?=$appname?></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" type="text/css" href="css/legend.css" />
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
		<script type="text/javascript" src="styles/<?php echo $_GET['style']; ?>.js"></script>
		<script type="text/javascript" src="js/functions.js"></script>
		</script>
	</head>
	<?php
		$output = "";

		function writeLine($index, $height, $payload, $caption)
		{
			$line = "\t\t\t<tr><td";

			if ($height) {
				$line .= ' style="height: ' . $height . 'px;"';
			} else {
				$height = '16';
			}

			return $line . '><canvas width="70" height="' . $height . '" id="legend-' . $index
					. '" data-geojson=' . "'" . $payload
					. "'></canvas></td>\n\t\t\t\t<td>"
					. htmlspecialchars(_($caption)) . "</td></tr>\n";
		}

		if (file_exists($filename))
		{
			$legend = json_decode(file_get_contents($filename), true);
			$cnt = -1;

			foreach ($legend['mapfeatures'] as $feature)
			{
				if ($zoom >= $feature['minzoom'] && (!isset($feature['maxzoom']) || $zoom <= $feature['maxzoom']) && (isset($feature['features']) || isset($feature['heading'])))
				{
					$lineheight = isset($feature['lineheight']) ? $feature['lineheight'] : '';

					if (isset($feature['heading'])) {
						$output .= "\t\t\t<tr><td colspan=\"2\" class=\"section\">" . htmlspecialchars(_($feature['heading'])) . "</td></tr>\n";
					} else if (isset($feature['replace'])) {
						foreach ($feature['replace'] as $replace) {
							$caption = str_replace(array_keys($replace), array_values($replace), _($feature['caption']));
							$payload = str_replace(array_keys($replace), array_values($replace), json_encode($feature['features']));
							$output .= writeLine(++$cnt, $lineheight, $payload, $caption);
						}
					} else {
						$output .= writeLine(++$cnt, $lineheight, json_encode($feature['features']), _($feature['caption']));
					}
				}
			}

			// if no features are rendered in this zoom level, show message
			if ($output == "")
				$output = "<body>\n<p>" . _('Nothing to see in this zoom level. Please zoom in.') . "</p>\n";
			else
				$output = "<body onload=\"drawLegendIcons($cnt, $zoom, '" . $_GET['style'] . "')\">\n\t\t<table>\n" . $output . "\t\t</table>\n";
		}
		// if legend cannot be loaded
		else
			$output = "<body>\n\t\t<p>" . _('Legend not available for this style.') . "</p>\n";

		echo $output;
	?>
	</body>
</html>
