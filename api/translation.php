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


	if ($string)
	{
		// xml start
		if ($format == "xml")
		{
			echo xmlStart("translations");

			// echo provided languages
			echo "<langs>";
			echo $langs[0];
			for ($i=1; $i<count($langs); $i++)
				echo ",".$langs[$i];
			echo "</langs>\n";
		}
		else
			header("Content-Type: text/plain; charset=UTF-8");

		$parts = explode(",", $string);

		foreach ($parts as $part)
		{
			$translation = getTranslationString($part);
			if ($translation)
				if ($format == "xml")
					echo xmlTranslationLine($translation, $lang, $part);
				else
					echo $translation."\n";
		}

		// xml end
		if ($format == "xml")
			echo "</translations>";
	}
	else
		echo "NULL";


	// return one line to be output of translation api in xml format
	function xmlTranslationLine($translation, $lang, $request)
	{
		return "<translation lang=\"".$_GET['lang']."\" request=\"".$request."\">".$translation."</translation>\n";
	}
?>
