<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("config.php");


	// sets a language file for gettext, either in the given or the most matching language
	function includeLocale($lang)
	{
		global $langs;

		if ((!$lang) || (!array_key_exists($lang, $langs)))
			$lang = getUserLang();

		setlocale(LC_ALL, $langs[$lang][0]);
		bind_textdomain_codeset("messages", "UTF-8");
		bindtextdomain("messages", "../locales");
		textdomain("messages");
	}


	// returns the IP address of the current user; returns x-forwarded-for behind proxies
	function getUserIP()
	{
		return ($_SERVER['REMOTE_ADDR'] != "127.0.0.1") ? $_SERVER['REMOTE_ADDR'] : $_SERVER['HTTP_X_FORWARDED_FOR'];
	}


	// return an array of the user's languages, sorted by importance
	function getLangs()
	{
		$header = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
		$lang = explode(",", $header);

		$i = 0;
		foreach ($lang as $value)
		{
			$entry = explode(";", $value);
			$langpair = explode("-", $entry[0]);
			$langs[$i] = $langpair[0];
			$i++;
		}

		return $langs;
	}


	// returns the most matching language of the user
	function getUserLang()
	{
		global $langs;

		// read out language from header as array
		$langlist = getLangs();

		// choose most matching language from available langs
		foreach ($langlist as $value)
			if (array_key_exists($value, $langs))
				return $value;

		// if no matching language could be found, choose english
		return "en";
	}


	// send error report to own mail account
	function reportError($error = "")
	{
		global $mail;
		global $appname;

		// generating message
		$message = "An error happened in ".$appname.":";
		$message .= "\n\nTime..... ".date("d.m.Y-H:i", time());
		$message .= "\nIP....... http://www.utrace.de/?query=".getUserIP();
		$message .= "\nHeader... ".$_SERVER['HTTP_USER_AGENT'];
		$message .= "\nError.... ".$error;

		// sending error report by mail to given mail address
		$sended = mail($mail, "Error Report ".$appname, $message, "From: ".$appname." <".$mail.">");

		// check if mail was being send
		if(!$sended)
			return false;

		return true;
	}


	// checks if given offset-parameter is valid and takes standard value if missing
	function offset($offset)
	{
		if (!$offset)
			return 0;

		if (strlen($offset) > 4)
		{
			reportError("Given offset is too long: ".$offset);
			return 0;
		}

		return $offset;
	}


	// parse given bbox-string and check if given bbox is valid
	function getBbox($bbox)
	{
		// if no bbox is given
		if (!$bbox)
		{
			reportError("Bbox was not given.");
			return false;
		}

		// if bbox isn't too big
		if (abs($right - $left) > 0.5 or abs($top - $bottom) > 0.2)
		{
			reportError("Bbox too big.");
			return false;
		}

		// parsing values from given string
		$coordinates = explode(",", $bbox);
		// switch values if they are in wrong order
		if ($coordinates[0] > $right)
		{
			$temp = $coordinates[0];
			$coordinates[0] = $coordinates[2];
			$coordinates[2] = $temp;
		}
		if ($bottom > $top)
		{
			$temp = $coordinates[3];
			$coordinates[3] = $coordinates[1];
			$coordinates[1] = $temp;
		}

		return $coordinates;
	}


	// checks if given type-parameter is valid
	function isValidType($type)
	{
		if (!$type || !isset($type) || !isset($_GET[$type]))
			return false;

		$type = $_GET[$type];
		// check if given object type is invalid
		if (($type != "node") && ($type != "way") && ($type != "relation"))
		{
			reportError("Given type was invalid: ".$type);
			return false;
		}

		return true;
	}


	// checks if given osm id is valid
	function isValidId($id)
	{
		if (!$id || !isset($id) || !isset($_GET[$id]))
			return false;

		$id = $_GET[$id];
		if (!ctype_digit($id))
		{
			reportError("Given id contains not-numeric characters: ".$id);
			return false;
		}

		return true;
	}


	// checks if given coordinate is valid
	function isValidCoordinate($coord)
	{
		if (!$coord || !isset($coord) || !isset($_GET[$coord]))
			return false;

		$coord = $_GET[$coord];
		if (!is_numeric($coord))
		{
			reportError("Given coordinate contains not-numeric characters: ".$coord);
			return false;
		}

		return true;
	}


	// checks if given zoom level is valid
	function isValidZoom($zoom)
	{
		if (!$zoom || !isset($zoom) || !isset($_GET[$zoom]))
			return false;

		$zoom = $_GET[$zoom];
		if (!ctype_digit($zoom))
		{
			reportError("Given zoom level is not valid: ".$zoom);
			return false;
		}

		return true;
	}


	// checks if given timezone offset is valid
	function isValidOffset($offset)
	{
		if (!$offset || !isset($offset) || !isset($_GET[$offset]))
			return false;

		$offset = $_GET[$offset];
		if (!is_numeric($offset))
		{
			reportError("Given timezone offset is not valid: ".$offset);
			return false;
		}

		return true;
	}


	function urlArgsToParam($checkMobile, $urlbase)
	{
		echo "<script type=\"text/javascript\">\n";
			echo "var params={\n";
			echo "urlbase : '" . $urlbase . "',\n";
			echo "id : ".(isValidId('id') ? ($_GET['id']) : ("null")).",\n";
			echo "type : ".(isValidType('type') ? ("'".$_GET['type']."'") : ("null")).",\n";
			echo "lat : ";
				if (isValidCoordinate('lat'))
					echo $_GET['lat'].",\n";
				else
					echo "null,\n";
			echo "lon : ";
				if (isValidCoordinate('lon'))
					echo $_GET['lon'].",\n";
				else
					echo "null,\n";
			echo "zoom : " . (isValidZoom('zoom') ? ($_GET['zoom']) : ("null")) . ",\n";
			echo "lang : " . (isset($_GET['lang']) ? ("'".$_GET['lang']."'") : ("null")) . ",\n";
			echo "offset : " . (isValidOffset('offset') ? ($_GET['offset']) : ("null")) . ",\n";
			echo "searchquery : " . (isset($_GET['q']) ? (json_encode($_GET['q'])) : ("''")) . ",\n";
			echo "ref : " . (isset($_GET['ref']) ? (json_encode($_GET['ref'])) : ("null")) . ",\n";
			echo "name : " . (isset($_GET['name']) ? (json_encode($_GET['name'])) : ("null")) . ",\n";
			echo "line : " . (isset($_GET['line']) ? (json_encode($_GET['line'])) : ("null")) . ",\n";
			echo "operator : " . (isset($_GET['operator']) ? (json_encode($_GET['operator'])) : ("null")) . ",\n";
			if ($checkMobile)
				echo "mobile : " . (isset($_GET['mobile']) ? (($_GET['mobile'] != '0' && $_GET['mobile'] != 'false') ? "true" : "false") : ("null")) . ",\n";
			echo "style : " . (isset($_GET['style']) ? (json_encode($_GET['style'])) : ("null")) . "\n";
			echo "};\n";
		echo "</script>\n";
	}
?>
