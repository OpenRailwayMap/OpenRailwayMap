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


	// returns human-readable timestamp of given timestamp
	function timestampString($timestamp, $offset)
	{
		return date("d.m.Y H:i", ($timestamp+($offset*3600)));
	}


	// returns the difference between two timestamps
	function timeAgo($latest, $reference, $offset = 0)
	{
		return ($latest+($offset*3600))-$reference;
	}


	// returns an human-readable string of the given difference timestamp
	function timeAgoString($diff)
	{
		if (!$diff)
			return false;

		// unit conversion factors
		$units[0] = 60;	// seconds
		$units[1] = 60;	// minutes
		$units[2] = 24;	// hours
		$units[3] = 7;	// days
		$units[4] = 4;	// weeks
		$units[5] = 12;	// months

		// calculating difference as human readable string
		for ($i=0; $i<count($units); $i++)
		{
			if ($diff >= $units[$i])
				$diff = $diff / $units[$i];
			else
				break;
		}

		// singular and plural forms
		$interval[0] = sprintf(ngettext("%d second", "%d seconds", (int)$diff), (int)$diff);
		$interval[1] = sprintf(ngettext("%d minute", "%d minutes", (int)$diff), (int)$diff);
		$interval[2] = sprintf(ngettext("%d hour", "%d hours", (int)$diff), (int)$diff);
		$interval[3] = sprintf(ngettext("%d day", "%d days", (int)$diff), (int)$diff);
		$interval[4] = sprintf(ngettext("%d week", "%d weeks", (int)$diff), (int)$diff);
		$interval[5] = sprintf(ngettext("%d month", "%d months", (int)$diff), (int)$diff);

		return sprintf(_("more than %s ago"), $interval[$i]);
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


	// returns a lat/lon pair for a given IP by requesting hostip.info
	function getPositionByIp($ip)
	{
		if (!$ip)
			return false;

		// request location for api
		$url = "http://api.hostip.info/?ip=".$ip;
		$response = apiRequest($url);
		$data = $response[0];
		if (!$data)
		{
			reportError("Location request by IP didn't reponse.");
			return false;
		}

		// extract lat/lon and return string
		$data = explode("tes>", $data);
		$data = explode("</gml:coo", $data[1]);

		return $data[0];
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


	// requests a given url by using curl and returns the response
	function apiRequest($url)
	{
		if (!$url)
			return false;
		$c = curl_init();
		curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($c, CURLOPT_URL, $url);
		curl_setopt($c, CURLOPT_USERAGENT, $useragent);
		$response = curl_exec($c);
		$info = curl_getinfo($c);
		curl_close($c);
		if ($response && $info)
			return array($response, $info);

		return false;
	}


	// beginning of xml output: header, first root element
	function xmlStart($root)
	{
		header("Content-Type: application/xml; charset=UTF-8");
		return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<".$root.">\n";
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


	// produces a JSON(P) output
	function jsonOutput($data, $callback)
	{
		header("Content-Type: application/json; charset=UTF-8");
		$jsonData = json_encode($data);
		// JSONP request?
		if (isset($callback))
			echo $callback.'('.$jsonData.')';
		else
			echo $jsonData;
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
			echo "offset : " . (isValidOffset('offset') ? ($_GET['offset']) : ("null")) . ",\n";
			echo "searchquery : " . (isset($_GET['q']) ? (json_encode($_GET['q'])) : ("''")) . ",\n";
			echo "lang : '" . $lang . "',\n";
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
