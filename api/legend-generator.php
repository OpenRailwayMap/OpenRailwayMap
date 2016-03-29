<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $langs))
		$lang = $_GET['lang'];
	else
		$lang = getUserLang();
	includeLocale($lang);

	$zoom = isset($_GET['zoom']) ? ($_GET['zoom']) : (null);
	$filename = isset($_GET['style']) ? ("../styles/".$_GET['style'].".json") : (null);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $lang; ?>" lang="<?php echo $lang; ?>">
	<head>
		<title><?=$appname?></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta http-equiv="content-language" content="<?php echo $lang; ?>" />
		<link rel="stylesheet" type="text/css" href="../css/legend.css" />
		<meta http-equiv="content-style-type" content="text/css" />
	</head>
	<body>
		<?php
			$output = "";

			function writeLine($payload, $caption)
			{
				return '<tr><td style="width: 80px; height: 16px;">' . $payload . '</td><td>' . htmlspecialchars(_($caption)) . "</td></tr>\n";
			}

			if (file_exists($filename))
			{
				$legend = json_decode(file_get_contents($filename), true);

				foreach ($legend['mapfeatures'] as $feature)
				{
					if ($zoom >= $feature['minzoom'] && (!isset($feature['maxzoom']) || $zoom <= $feature['maxzoom']))
					{
						if (isset($feature['symbol']) && $feature['symbol'] != null)
							$payload = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">' . $feature['symbol'] . '</svg>';
						else
							$payload = '<img src="../styles/' . $feature['icon'] . '" />';
						$output .= writeLine($payload, $feature['caption']);
					}
				}

				// if no features are rendered in this zoom level, show message
				if ($output == "")
					$output = '<p>' . _('Nothing to see in this zoom level. Please zoom in.') . "</p>\n";
				else
					$output = "\t\t<table>\n" . $output . "\t\t</table>\n";
			}
			// if legend cannot be loaded
			else
				$output = '<p>' . _('Legend not available for this style.') . "</p>\n";

			echo $output;
		?>
	</body>
</html>
