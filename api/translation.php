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
	$string = $_GET['string'];
	$format = $_GET['format'];
	$callback = $_GET['callback'];


	if ($string)
	{
		$parts = explode(",", $string);

		if ($format == "xml")
		{
			echo xmlStart("translations");
			// echo provided languages
			echo "<langs>";
			echo $langs[0];
			for ($i=1; $i<count($langs); $i++)
				echo ",".$langs[$i];
			echo "</langs>\n";
			// echo current translation language
			echo "<lang>".$_GET['lang']."</lang>";
			// echo translated strings
			foreach ($parts as $part)
			{
				$part = explode(".", $part);
				$translation = translateKeyValue($part[0], $part[1]);
				if ($translation)
					echo "<translation key=\"".$part[0]."\" value=\"".$part[1]."\">".$translation."</translation>\n";
			}
			echo "</translations>";
		}
		else if ($format == "json")
		{
			$list = array();
			foreach ($parts as $part)
			{
				$part = explode(".", $part);
				$translation = translateKeyValue($part[0], $part[1]);
				if ($translation)
					array_push($list, array(
							'key' => $part[0],
							'value' => $part[1],
							'translation' => $translation
						)
					);
			}
			$langlist = $langs[0];
			for ($i=1; $i<count($langs); $i++)
				$langlist .= ",".$langs[$i];
			$jsonData = json_encode(
				array(
					'langs' => $langs,
					'lang' => $_GET['lang'],
					'translations' => $list
				)
			);
			// JSONP request?
			if (isset($callback))
				echo $callback.'('.$jsonData.')';
			else
				echo $jsonData;
		}
		else
		{
			header("Content-Type: text/plain; charset=UTF-8");
			foreach ($parts as $part)
			{
				$part = explode(".", $part);
				$translation = translateKeyValue($part[0], $part[1]);
				if ($translation)
					echo $translation."\n";
			}
		}
	}
	else
		echo "NULL";
?>
