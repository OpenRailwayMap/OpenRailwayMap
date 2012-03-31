<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");
	// including translation file
	require_once("../".includeLocale($_GET['lang']));

	$callback = $_GET['callback'];
	$format = $_GET['format'];


	if ($format == "json")
	{
		header("Content-Type: text/plain; charset=UTF-8");
		$jsonData = json_encode($translations['tags']);
		// JSONP request?
		if (isset($callback))
			echo $callback.'('.$jsonData.')';
		else
			echo $jsonData;
	}
	else
	{
		header("Content-Type: application/x-javascript; charset=UTF-8");
		echo "var tags = {};";
		foreach ($translations['tags'] as $key => $value)
		{
			echo "tags['".$key."'] =\n{\n";
			foreach ($value as $osmkey => $osmvalue)
				echo "'".$osmkey."' : '".$osmvalue."',\n";
			echo "};\n";
		}
	}
?>
