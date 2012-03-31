<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");

	$format = $_GET['format'];
	$callback = $_GET['callback'];

	header("Content-Type: text/plain; charset=UTF-8");
	if ($format == "json")
	{

		$jsonData = json_encode(array('lang' => getUserLang()));
		// JSONP request?
		if (isset($callback))
			echo $callback.'('.$jsonData.')';
		else
			echo $jsonData;
	}
	else
		echo getUserLang();
?>
