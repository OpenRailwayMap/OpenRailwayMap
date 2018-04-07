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
		<?php
			urlArgsToParam(false, $urlbase . '../');
		?>
	</head>
	<body onload="drawLegendIcons(<?php
		echo "$zoom, '" . $_GET['style'] . "', '" . $urlbase . "'";
	?>)">
		<div id='legend-container'>
		</div>
	</body>
</html>
