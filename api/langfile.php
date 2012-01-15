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

	$lang = $_GET['lang'];


	header("Content-Type: application/x-javascript; charset=UTF-8");

	echo "var tags = {};";

	foreach ($translations['tags'] as $key => $value)
	{
		echo "tags['".$key."'] =\n{\n";
		foreach ($value as $osmkey => $osmvalue)
			echo "'".$osmkey."' : '".$osmvalue."',\n";
		echo "};\n";
	}
?>
