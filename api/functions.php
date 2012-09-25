<?php
	/*
	OpenRailwayMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	// email address to send error reports to
	$mail = "AlexanderMatheisen@ish.de";
	// available translations
	$langs = array("de", "en", "fr", "it", "ru");
	// name of database
	$db = "railmap";
	// name of application
	$appname = "OpenRailwayMap";


	// connects do database
	function connectToDatabase($dbname)
	{
		if (!isset($dbname))
		{
			reportError("Database name was not given.");
			return false;
		}

		$connection = pg_pconnect("dbname=".$dbname);
		// if connection could not be set up
		if (!$connection)
		{
			reportError("Could not connect to database.");
			return false;
		}

		return $connection;
	}


	// needed for usort
	function compare($a, $b)
	{
		if ((int)$a[3] == (int)$b[3])
		    return 0;

		return ((int)$a[3] < (int)$b[3]) ? -1 : 1;
	}


	// sorts a multidimensional array of next objects by distance
	function sortArray($array)
	{
		usort($array, "compare");
		return $array;
	}


	// includes a translation string file, either the given or the most matching language
	function includeLocale($lang)
	{
		global $langs;

		if ((!$lang) || (!in_array($lang, $langs)))
			$lang = getUserLang();

		return "locales/".$lang.".php";
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
		{
			if (in_array($value, $langs))
				return $value;
		}

		// if no matching language could be found, choose english
		return "en";
	}


	// returns human-readable timestamp of given timestamp
	function timestampString($timestamp)
	{
		return date("d.m.Y H:i", $timestamp);
	}


	// returns the difference between two timestamps
	function timeAgo($latest, $reference, $offset = 0)
	{
		return ($latest+($offset*3600))-$reference;
	}


	// returns an human-readable string of the given difference timestamp
	function timeAgoString($diff)
	{
		global $translations;

		if (!$diff)
			return false;

		// translations and unit conversion factors
		$units[0][0] = 60;
		$units[0][1] = $translations['date']['seconds'];
		$units[0][2] = $translations['date']['second'];
		$units[1][0] = 60;
		$units[1][1] = $translations['date']['minutes'];
		$units[1][2] = $translations['date']['minute'];
		$units[2][0] = 24;
		$units[2][1] = $translations['date']['hours'];
		$units[2][2] = $translations['date']['hour'];
		$units[3][0] = 7;
		$units[3][1] = $translations['date']['days'];
		$units[3][2] = $translations['date']['day'];
		$units[4][0] = 4;
		$units[4][1] = $translations['date']['weeks'];
		$units[4][2] = $translations['date']['week'];
		$units[5][0] = 12;
		$units[5][1] = $translations['date']['months'];
		$units[5][2] = $translations['date']['month'];

		// calculating difference as human readable string
		for ($i=0; $i<count($units); $i++)
		{
			if ($diff >= $units[$i][0])
			{
				if (($diff > $units[$i][0]) && ($i > 2))
					$more = $translations['date']['morethan']." ";
				$diff=$diff / $units[$i][0];
			}
			else
				break;
		}

		// singular and plural forms
		if ((int)$diff == 1)
			$unit = $units[$i][2];
		else
			$unit = $units[$i][1];

		return $more.(int)$diff." ".$unit." ".$translations['date']['ago'];
	}


	// send error report to own mail account
	function reportError($error = "")
	{
		global $mail;
		global $appname;

		// generating message
		$message = "An error happened in ".$appname.":";
		$message .= "\n\nTime..... ".date("d.m.Y-H:i", time());
		$message .= "\nIP....... http://www.utrace.de/?query=".$_SERVER['REMOTE_ADDR'];
		$message .= "\nHeader... ".$_SERVER['HTTP_USER_AGENT'];
		$message .= "\nError.... ".$error;

		// sending error report by mail to given mail address
		$sended = mail($mail, "Error Report ".$appname, $message, "From: ".$appname." <info@openlinkmap.org>");

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


	// returns translation of a caption
	function getTranslationString($string)
	{
		global $translations;

		if (!$string)
			return false;

		$level = explode(".", $string);

		$caption = $translations[$level[0]];
		for ($i = 1; $i < count($level); $i++)
			$caption = $caption[$level[$i]];

		if (isset($caption))
			return $caption;

		return false;
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


	// gets a wikipedia article by given link and returns the first lines
	function getWikipediaBeginning($url)
	{
		if (!$url)
			return false;

		$url = str_replace(" ", "_", rawurldecode($url));
		// mobile version of wikipedia is easier to parse
		$url = str_replace(".wikipedia.org", ".m.wikipedia.org", $url);

		// download article
		$response = apiRequest($url);
		$content = $response[0];

		if ($content)
		{
			// delete everything before main article
			$content = explode("<h1 id=\"firstHeading\">", $content);

			// delete everything after first paragraph
			$content = explode("<h2> <span class=\"mw-headline\"", $content[1]);

			// delete headline
			$content = explode("</h1>", $content[0]);

			// remove tables and other not needed elements
			$content = preg_replace("/<table\b[^>]*>.*<\/table>/s", "", $content[1]);
			$content = preg_replace("/<span\b[^>]*>.*<\/span>/s", "", $content);
			$content = preg_replace("/<sup\b[^>]*>.*<\/sup>/s", "", $content);
			$content = preg_replace("/<div.class=.thumbcaption\b[^>]*>.*<\/div>/s", "", $content);

			return trim(strip_tags($content));
		}

		return false;
	}


	// gets the first image of a wikipedia article
	function getWikipediaImage($url)
	{
		if (!$url)
			return false;

		$url = str_replace(" ", "_", rawurldecode($url));
		// mobile version of wikipedia is easier to parse
		$url = str_replace(".wikipedia.org", ".m.wikipedia.org", $url);

		// download article
		$response = apiRequest($url);
		$content = $response[0];

		if ($content)
		{
			// delete everything before main article
			$content = explode("<h1 id=\"firstHeading\">", $content);

			// delete everything after first paragraph
			$content = explode("<h2> <span class=\"mw-headline\"", $content[1]);

			// remove wikipedia images
			$content = str_replace("<img alt=\"\" src=\"//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Disambig-dark.svg/25px-Disambig-dark.svg.png\" width=\"25\" height=\"19\">", "", $content[0]);

			// get image url
			$pattern = "/<img.+src=\"(\S+)\"\s\w+=.+>/i";
			preg_match($pattern, $content, $matches);

			// change link from thumb-link to link to the big image
			// if width was given in the image url
			if (strpos($matches[1], "/thumb/") !== false)
			{
				$pos = strripos($matches[1], "/");
				$image = substr($matches[1], 0, $pos);
			}
			$image = str_replace("thumb/", "", $image);

			return str_replace("//", "http://", $image);
		}
		return false;
	}


	// gets the url of an image's thumbnail
	function getWikipediaThumbnailUrl($url)
	{
		// size of thumbnails
		$thumbsize = 280;

		if (!$url)
			return false;

		// check if thumbnail size is bigger than original size
		if (strpos($url, "special:filepath") === false)
			$imagesize = getimagesize($url);
		if ($response && ($imagesize[0] > $thumbsize) || substr($url, -3, 3))
		{
			// don't use archive images
			$url = str_replace("archive/", "", $url);
			$url = preg_replace("/20.+%21/", "", $url);
			// get thumbnail
			if (substr($url, 0, 29) == "http://commons.wikimedia.org/")
				return $url."?width=".$thumbsize."px";
			else if ((substr($url, 0, 38) == "http://upload.wikimedia.org/wikipedia/") && (substr($url, 38, 7) != "commons"))
				return $url;
			else
			{
				$url = str_replace("wikipedia/commons", "wikipedia/commons/thumb", $url);
				$filename = explode("/", $url);
				$url = $url."/".$thumbsize."px-".$filename[count($filename)-1];

				// svg thumbs need a .png at the end
				if (substr($filename[count($filename)-1], -3, 3 ) == "svg")
					$url = $url.".png";
			}
		}
		return $url;
	}


	// request all milestones for a given bbox and return them
	function getNodesForBbox($connection, $request)
	{
		// if there is no connecting to server
		if (!$connection)
		{
			reportError("Not connected to database.");
			return false;
		}

		// executing requests
		$response = requestDetails($request, $connection);
		// putting out the results
		if ($response)
		{
			$list = array();
			foreach ($response as $element)
				array_push($list, array($element['st_x'], $element['st_y'], $element['caption']));
		}

		return $list;
	}


	// convertes integer to olm object type
	function intToType($type)
	{
		switch($type)
		{
			case 0:
				return "node";
			case 1:
				return "way";
			default:
				return false;
		}
	}


	// requests a given url by using curl and returns the response
	function apiRequest($url)
	{
		if (!$url)
			return false;
		$c = curl_init();
		curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($c, CURLOPT_URL, $url);
		curl_setopt($c, CURLOPT_USERAGENT, "openlinkmap.org");
		$response = curl_exec($c);
		$info = curl_getinfo($c);
		curl_close($c);
		if ($response && $info)
			return array($response, $info);

		return false;
	}


	// returns latlon of given id and type
	function getLatLon($id, $type)
	{
		if ($id && $type)
		{
			$connection = connectToDatabase("olm");

			// if there is no connection
			if (!$connection)
				exit;

			$query = "SELECT
						id, ST_X(geom), ST_Y(geom)
						FROM ".$type."s
						WHERE (id = ".$id.");";
			$response = requestDetails($query, $connection);

			pg_close($connection);

			if ($response)
				foreach ($response as $element)
					return array($element['st_x'], $element['st_y']);
		}

		return false;
	}


	// get the url to a given article for an given translation
	function getWikipediaTranslation($article, $lang, $langs)
	{
		// if no translation is needed because source lang and translation lang are equal
		if ($lang == $langs[0])
			return "http://".$lang.".wikipedia.org/wiki/".$article;

		// api request
		$url = "http://".$lang.".wikipedia.org/w/api.php?action=query&titles=".$article."&prop=langlinks&lllimit=max&format=php&redirects";
		$response = apiRequest($url);
		$request = $response[0];

		if ($request)
		{
			// search for translation with the highest user rating
			$data = unserialize($request);

			foreach ($langs as $translation)
			{
				if (isset($data['query']['pages']))
				{
					foreach ($data['query']['pages'] as $element)
					{
						for ($i=0; $i < count($element['langlinks']); $i++)
						{
							if ($element['langlinks'][$i]['lang'] == $translation)
								return "http://".$translation.".wikipedia.org/wiki/".$element['langlinks'][$i]['*'];

							if ($element['langlinks'][$i]['lang'] == "en")
								$english = $element['langlinks'][$i]['*'];
						}
					}
				}
			}
		}

		if ($english)
			return "http://en.wikipedia.org/wiki/".$english;

		// if no translation was found, return source article
		return "http://".$lang.".wikipedia.org/wiki/".$article;
	}


	// returns translation for given key-value-pair
	function translateKeyValue($key, $value)
	{
		global $translations;

		$keyvalue = $translations['tags'][$key][$value];
		if (!$keyvalue)
			return "";

		return $keyvalue;
	}


	// returns the name of an wikipedia article by an given url
	function formatWikipediaName($wikipedia)
	{
		if (!$wikipedia)
			return false;

		// take article name out of url
		$name = explode("#", substr($wikipedia, 29));
		return str_replace("_", " ", $name[0]);
	}


	// make a database request by a given query string
	function requestDetails($request, $connection)
	{
		$result = pg_query($connection, $request);

		if (!$result)
		{
			reportError($request);
			reportError("No return for database request.");
			return false;
		}

		return pg_fetch_all($result);
	}


	// beginning of xml output: header, first root element
	function xmlStart($root)
	{
		header("Content-Type: application/xml; charset=UTF-8");
		return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<".$root.">\n";
	}


	// returns the tag which has a e-mail address and correct errors in format
	function getMailDetail($emails)
	{
		// select value which is set
		foreach ($emails as $email)
			if ($email)
				return $email;

		return false;
	}


	// return the tag which has a phone or fax number and correct errors in format
	function getPhoneFaxDetail($numbers)
	{
		// select value which is set
		foreach ($numbers as $number)
			if ($number)
				$rawnumber = $number;

		// correct some mistakes
		$rawnumber = str_replace(" ", "-", $rawnumber);
		$rawnumber = str_replace("(", "", $rawnumber);
		$rawnumber = str_replace(")", "", $rawnumber);

		if (substr($rawnumber, 0, 2) == "00")
			$rawnumber = "+".substr($rawnumber, 2);

		// create number to be used in e.g. callto: links
		$linkNumber = str_replace("-", "", $rawnumber);
		$linkNumber = str_replace("(", "", $linkNumber);
		$linkNumber = str_replace(")", "", $linkNumber);

		// return values as array
		if ($linkNumber && $rawnumber)
			return array($linkNumber, $rawnumber);

		return false;
	}


	// translate and parse the opening hours
	function getOpeninghoursDetail($openinghours)
	{
		global $translations;

		$original = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "off", "PH", "SH", "+", ";", ",", "24/7");
		$translation = array($translations['opening']['mo'], $translations['opening']['tu'], $translations['opening']['we'], $translations['opening']['th'], $translations['opening']['fr'], $translations['opening']['sa'], $translations['opening']['su'], $translations['opening']['off'], $translations['opening']['ph'], $translations['opening']['sh'], " ".$translations['opening']['+'], "<br />", " ".$translations['opening']['and']." ", $translations['opening']['247']);
		return str_replace($original, $translation, $openinghours);
	}


	// returns the tag which has a link to a website and correct errors in format
	function getWebsiteDetail($websites)
	{
		// select value which is set
		foreach ($websites as $website)
			if ($website)
				$rawurl = $website;

		// do some corrections because of different value
		if (substr($rawurl, 0, 7) != "http://" && substr($rawurl, 0, 8) != "https://" && strlen($rawurl) != 0)
			$rawurl = "http://".$rawurl;

		// cut http://www. or http:// or similar strings
		$caption = str_replace("http://", "", $rawurl);
		$caption = str_replace("https://", "", $caption);
		$caption = str_replace("www.", "", $caption);

		// remove last slash
		if (substr($caption, -1, 1) == "/")
			$caption = substr($caption, 0, -1);

		// return values as array
		return array($rawurl, $caption);
	}


	// get objects near a given object which have are of a given type
	function getNearObjectsForId($connection, $lat, $lon, $tags)
	{
		// combine tags to one request
		$command = array();
		$objects = array();
		$tagcount = count($tags);

		// construct query from array
		for ($i=0; $i<$tagcount-1; $i++)
			$tagquery .= "tags-> '".$tags[$i][0]."' = '".$tags[$i][1]."' OR ";
		$tagquery .= "tags-> '".$tags[$i][0]."' = '".$tags[$i][1]."'";

		// first select next objects ordered by distance, then throw out multiple names, then reorder by distance and limit on 2 objects
		$query = "
			SELECT *
			FROM (
				SELECT DISTINCT ON (uniques.name) *
				FROM (
					SELECT
						ST_X(foo.next),
						ST_Y(foo.next),
						foo.name,
						foo.distance,
						foo.osmid
					FROM (
						(SELECT tags->'name' AS name, geom AS next, id AS osmid,  ST_Distance_Sphere(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), geom) AS distance
						FROM nodes
						WHERE (".$tagquery.") AND (NOT (tags ? 'access') OR NOT (tags->'access' = 'private')) AND geom && ST_Buffer(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), 2000)
						ORDER BY distance
						LIMIT 10)
						UNION
						(SELECT tags->'name' AS name, geom AS next, id AS osmid,  ST_Distance_Sphere(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), geom) AS distance
						FROM ways
						WHERE (".$tagquery.") AND (NOT (tags ? 'access') OR NOT (tags->'access' = 'private')) AND geom && ST_Buffer(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), 2000)
						ORDER BY distance
						LIMIT 10)
					) AS foo
					ORDER BY foo.distance
					LIMIT 10
				) AS uniques
				ORDER BY uniques.name, uniques.distance
			) AS ordered
			ORDER BY ordered.distance
			LIMIT 2;";

		$result = pg_query($connection, $query);
		$response = pg_fetch_all($result);
		if ($response)
		{
			foreach ($response as $element)
			{
				$data[0] = $element['st_x'];
				$data[1] = $element['st_y'];
				$data[2] = $element['name'];
				$data[3] = $element['distance'];
				$data[4] = $element['osmid'];

				array_push($objects, $data);
			}
		}

		if ((count($types) > 1) || (count($tags) > 1))
			return sortArray($objects);

		return $objects;
	}


	// get article name and article language by a given value and key-language
	function formatWikipediaLink($value, $keyLang)
	{
		// if if the article name is already encoded because it was given in a full url, or like this
		$preencoded = true;

		// if a full url is given
		if (substr($value, 0, 7) == "http://")
		{
			$article[0] = substr($value, 29);
			$article[1] = substr($value, 7, 2);
			$preencoded = true;
		}

		// if given value has the form "de:Baum"
		else if (substr($value, 2, 1) == ":")
		{
			$article[0] = substr($value, 3);
			$article[1] = substr($value, 0, 2);
			$preencoded = false;
		}

		// if only the article name is given
		else
		{
			$article[0] = $value;
			$preencoded = false;
			// if language is mentoined in the key
			if ($keyLang)
				$article[1] = $keyLang;
			// else if no language is mentioned, use english
			else
				$article[1] = "en";
		}

		// if string is not preencoded,
		if (!$preencoded)
			$article[0] = rawurlencode($article[0]);

		return $article;
	}


	// returns the name wich matches most the user's language
	function getNameDetail($langs, $names)
	{
		// do translation of name
		if (count($names) > 0)
		{
			// select name in most matching language
			foreach ($langs as $lang)
			{
				foreach ($names as $caption)
				{
					$tmplang = substr($caption['keys'], 5, 2);
					if ($lang == $tmplang)
					{
						$namelang = $tmplang;
						$name = $caption['values'];
						break 2;
					}
				}
			}
			// if no name for a specific language was found, use standard name=*
			if (!isset($name))
			{
				foreach ($names as $caption)
				{
					if ($caption['keys'] == "name")
					{
						$namelang = "name";
						$name = $caption['values'];
						break;
					}
				}
			}
		}
		else
			return false;

		// return values as array
		return array($name, $namelang);
	}


	// returns the tag which has a wikipedia link and correct errors in format
	function getWikipediaDetail($langs, $wikipedias)
	{
		// do translation of wikipedia link
		if (count($wikipedias) > 0)
		{
			// select translation
			foreach ($langs as $lang)
			{
				foreach ($wikipedias as $article)
				{
					$wplang = substr($article['keys'], 10, 2);
					if ($lang == $wplang)
					{
						$wikipedialang = $wplang;
						$wikipedia = $article['values'];
						break 2;
					}
				}
			}
			// if no tag with explicit language was found, take the first (language doesn't matter because of wikipedia translation)
			if (!isset($wikipedia))
			{
				$wikipedialang = substr($wikipedias[0]['keys'], 10, 2);
				$wikipedia = $wikipedias[0]['values'];
			}

			$wikipedia = formatWikipediaLink($wikipedia, $wikipedialang);
			$wikilink = getWikipediaTranslation($wikipedia[0], $wikipedia[1], $langs);
			$wikipediatitle = formatWikipediaName($wikilink);
		}
		else
			return false;

		// return values as array
		return array($wikipedia, $wikilink, $wikipediatitle);
	}


	// formats a given distance in meters
	function formatDistance($meters)
	{
		if ($meters > 1000)
			$distance = round($meters/1000, 2)."km";
		else
			$distance = (int)$meters."m";

		return $distance;
	}


	// parse given openinghours and check if poi is open now
	function isPoiOpen($openinghours, $offset)
	{
		// simplest case
		if ($openinghours == "24/7" || $openinghours == "00:00-24:00" || $openinghours == "Mo-Fr 00:00-24:00")
			return true;

		// get actual timestamp of user's timezone
		$timestamp = time()+$offset*3600;
		$actday = (int)gmdate("w", $timestamp)-1;
		if ($actday == -1)
			$actday = 6;
		$actmonth = (int)"7".gmdate("n", $timestamp);
		$acttime = (int)gmdate("Hi", $timestamp);

		// serialising
		$openinghours = strtolower($openinghours);

		// remove wrong spaces
		$openinghours = str_replace(", ", ",", $openinghours);

		// replacing words by numbers for easier processing
		$original = array("mo", "tu", "we", "th", "fr", "sa", "su", "+");
		$translation = array("0", "1", "2", "3", "4", "5", "6", "-23:59");
		$openinghours = str_replace($original, $translation, $openinghours);

		// example: Mo-Fr 10:00-12:00,16:00-18:00; Sa 16:00+; Su off
		// split into each entry: Mo-Fr 10:00-12:00,16:00-18:00
		$sets = explode(";", $openinghours);
		foreach ($sets as $set)
		{
			// remove spaces
			$set = trim($set);

			// if the string contains only a time interval, e.g. 10:00-20:00
			if (ctype_digit(str_replace("-", "", str_replace(":", "", str_replace(",", "", $set)))))
			{
				$timepart = $set;
				// check if any time bound matches now
				if (inTimes($acttime, $timepart))
					return true;
			}
			else
			{
				// split to get each part
				$parts = explode(" ", $set);

				// check if any day bound matches today
				if (inDays($actday, $parts[0]))
					// then check if any time bound matches now
					if (inTimes($acttime, $parts[1]))
						return true;
			}
		}
		return false;
	}


	// returns true when timeinterval matches now
	function inTimes($now, $timepart)
	{
		// split at commas for single time intervals: 10:00-12:00  16:00-18:00
		$timeintervals = explode(",", $timepart);

		foreach ($timeintervals as $timeinterval)
		{
			// split to get hour bounds: 10:00  12:00
			$time = explode("-", $timeinterval);

			if ($time[0] == "off")
				return false;

			if ((($now >= (int)str_replace(":", "", $time[0])) && ($now <= (int)str_replace(":", "", $time[1]))) || (($now >= (int)str_replace(":", "", $time[0])) && ((int)str_replace(":", "", $time[1]) <= (int)str_replace(":", "", $time[0]))))
				return true;
		}

		return false;
	}


	// returns true when dayinterval matches today
	function inDays($now, $daypart)
	{
		$dayvalues = explode(",", $daypart);

		foreach ($dayvalues as $dayvalue)
		{
			// split to get day bounds: Mo  Fr
			$daybounds = explode("-", $dayvalue);

			// if only one time bound is given
			if (!$onlyTime && !$daybounds[1] && (($daybounds[1] != 0) || ($daybounds[1] == "")))
				$daybounds[1] = $daybounds[0];

			// if today is in this time interval or every day is given (e.g. fr-th)
			if
			(
				// e.g. Mo-Fr
				( ((int)$daybounds[0] == 0) && ($now >= (int)$daybounds[0]) && ($now <= (int)$daybounds[1]) ) ||
				// e.g. Tu-Fr
				( ($now >= (int)$daybounds[0]) && ($now <= (int)$daybounds[1]) && ((int)$daybounds[0] < (int)$daybounds[1]) && ((int)$daybounds[0] != 0) && ((int)$daybounds[1] != 0) ) ||
				// e.g. Th-Tu
				( ((int)$daybounds[0] != 0) && ((int)$daybounds[1] != 0) && ((int)$daybounds[1] < (int)$daybounds[0]) && ($actday >= (int)$daybounds[0]) && ($now <= 6) && ($actday >= 0) && ($now <= (int)$daybounds[1]) ) ||
				// e.g. Th-Mo
				( ((int)$daybounds[1] == 0) && ($now >= (int)$daybounds[0]) && ($now <= 6) && ((int)$daybounds[0] != (int)$daybounds[1]) ) ||
				// e.g. Su-Th
				( ((int)$daybounds[0] != 0) && ((int)$daybounds[1] != 0) && ((int)$daybounds[1] < (int)$daybounds[0]) && ($now <= (int)$daybounds[0]) && ($now <= (int)$daybounds[1]) && ((int)$daybounds[0] == 6)) ||
				// e.g. We
				( ((int)$daybounds[0] == (int)$daybounds[1]) && ($now == (int)$daybounds[0]) ) ||
				// only time interval, e.g. 10:00-20:00
				( $onlyTime )
			)
				return true;
		}

		return false;
	}


	// check if pois has now open if today is a day of the holidays
	function isInHoliday($openinghours, $offset)
	{
		// simplest case
		if ($openinghours == "24/7" || $openinghours == "00:00-24:00")
			return true;

		// get actual timestamp of user's timezone
		$actual = time()+$offset*3600;
		$acttime = (int)gmdate("Hi", $actual);

		// serialising
		$openinghours = strtolower($openinghours);

		// remove wrong spaces
		$openinghours = str_replace(", ", ",", $openinghours);

		// replacing words by numbers for easier processing
		$original = array("+");
		$translation = array("23:59");
		$openinghours = str_replace($original, $translation, $openinghours);

		// example: Mo-Fr 10:00-12:00,16:00-18:00; Sa 16:00+; Su off
		// split into each entry: Mo-Fr 10:00-12:00,16:00-18:00
		$sets = explode(";", $openinghours);
		foreach ($sets as $set)
		{
			// contains PH or SH
			if ((strpos($set, "PH") !== false) || (strpos($set, "SH") !== false))
			{
				// split at space for time intervals: 10:00-12:00  16:00-18:00
				$timeintervals = explode(" ", $set);

				foreach ($timeintervals as $timeinterval)
				{
					// split to get hour bounds: 10:00  12:00
					$time = explode("-", $timeinterval);

					if ((($acttime >= (int)str_replace(":", "", $time[0])) && ($acttime <= (int)str_replace(":", "", $time[1]))) || (($acttime >= (int)str_replace(":", "", $time[0])) && ((int)str_replace(":", "", $time[1]) <= (int)str_replace(":", "", $time[0]))))
						return true;
				}
			}
		}

		return false;
	}


	// checks if given type-parameter is valid
	function isValidType($type)
	{
		if (!$type)
			return false;

		// check if given object type is invalid
		if (($type != "node") && ($type != "way") && ($type != "relation"))
		{
			reportError("Given type was invalid: ".$type);
			return false;
		}

		return true;
	}


	// checks if given id-parameter is valid
	function isValidId($id)
	{
		if (!$id)
			return false;

		if (!ctype_digit(substr($id, 1)))
		{
			reportError("Given id contains not-numeric characters: ".$id);
			return false;
		}

		return true;
	}


	// returns equivalent osm object type by given olm type
	function olm2osm($type)
	{
		switch ($type)
		{
			case "point":
				return "node";
			case "line":
				return "way";
			case "polygon":
				return "way";
			default:
				return $type;
		}
	}


	// returns true if the poi with given openinghours string is always open
	function isOpen247($openinghours)
	{
		if (($openinghours == "24/7") || ($openinghours == "Mo-Su 00:00-24:00"))
			return true;

		return false;
	}


	// returns image url if only url to image website is given
	function getImageUrl($url)
	{
		if (substr($url, 0, 39) == "http://commons.wikimedia.org/wiki/File:")
			return "http://commons.wikimedia.org/wiki/special:filepath/".substr($url, 39);
		else if (substr($url, 0, 40) == "http://commons.wikimedia.org/wiki/Image:")
			return "http://commons.wikimedia.org/wiki/special:filepath/".substr($url, 40);
		else
			return $url;
	}
?>