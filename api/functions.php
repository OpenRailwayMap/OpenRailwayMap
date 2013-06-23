<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	// email address to send error reports to
	$mail = "info@openrailwaymap.org";
	// available translations
	$langs = array("de"=>"de_DE", "en"=>"en_GB");
	// name of database
	$db = "railmap";
	// prefix of osm2pgsql tables
	$prefix = "railmap";
	// name of application
	$appname = "OpenRailwayMap";
	// useragent used for curl requests
	$useragent = "openrailwaymap.org";


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


	// sets a language file for gettext, either in the given or the most matching language
	function includeLocale($lang)
	{
		global $langs;

		if ((!$lang) || (!array_key_exists($lang, $langs)))
			$lang = getUserLang();

		setlocale(LC_ALL, $langs[$lang]);
		bind_textdomain_codeset("messages", "UTF-8");
		bind_textdomain_codeset("tags", "UTF-8");
		bindtextdomain("messages", "../locales");
		bindtextdomain("tags", "../locales");
		textdomain("messages");
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

		// display "more than"
		if (($diff > $units[$i]) && ($i > 2))
			return sprintf(_("more than %s ago"), $interval[$i]);
		else
			return sprintf(_("%s ago"), $interval[$i]);
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
			// delete everything after main article
			$content = explode("<div class=\"section\"><h2 class=\"section_heading\" id=\"section_1\">", $content);

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
			// delete everything after first paragraph
			$content = explode("<div class=\"section\"><h2 class=\"section_heading\" id=\"section_2\">", $content);

			// remove wikipedia images
			$content = preg_replace("<img alt=\".*\" src=\"//upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Disambig_gray.svg/25px-Disambig_gray.svg.png\" width=\"25\" height=\"19\" srcset=\"//upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Disambig_gray.svg/38px-Disambig_gray.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Disambig_gray.svg/50px-Disambig_gray.svg.png 2x\">", "", $content[0]);
			$content = preg_replace("<img alt=\".*\" src=\"//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Disambig-dark.svg/25px-Disambig-dark.svg.png\" width=\"25\" height=\"19\" srcset=\"//upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Disambig-dark.svg/38px-Disambig-dark.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Disambig-dark.svg/50px-Disambig-dark.svg.png 2x\">", "", $content);
			$content = preg_replace("<img alt=\".*\" src=\"//upload.wikimedia.org/wikipedia/commons/thumb/6/63/Homoph_colour.svg/20px-Homoph_colour.svg.png\" width=\"20\" height=\"15\" srcset=\"//upload.wikimedia.org/wikipedia/commons/thumb/6/63/Homoph_colour.svg/30px-Homoph_colour.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/63/Homoph_colour.svg/40px-Homoph_colour.svg.png 2x\">", "", $content);
			$content = preg_replace("<img alt=\".*\" src=\"//upload.wikimedia.org/wikipedia/en/thumb/9/99/Question_book-new.svg/50px-Question_book-new.svg.png\" width=\"50\" height=\"39\" srcset=\"//upload.wikimedia.org/wikipedia/en/thumb/9/99/Question_book-new.svg/75px-Question_book-new.svg.png 1.5x, //upload.wikimedia.org/wikipedia/en/thumb/9/99/Question_book-new.svg/100px-Question_book-new.svg.png 2x\">", "", $content);
			$content = preg_replace("<img alt=\".*\" src=\"//upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disambig_colour.svg/20px-Disambig_colour.svg.png\" width=\"20\" height=\"15\" srcset=\"//upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disambig_colour.svg/30px-Disambig_colour.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disambig_colour.svg/40px-Disambig_colour.svg.png 2x\">", "", $content);

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


	// request all objects with given tags for a given bbox and echo them
	function getObjectsForBbox($connection, $bbox)
	{
		// if no bbox was given
		if (!$bbox)
		{
			reportError("Some parameters are missing.");
			return false;
		}

		// if there is no connecting to server
		if (!$connection)
		{
			reportError("Not connected to database.");
			return false;
		}

		// requests
		$types = array("node", "way", "relation");

		// executing requests
		$list = array();
		foreach ($types as $type)
		{
			$response = requestDetails("SELECT ST_X(geom), ST_Y(geom), id
											FROM ".$type."s
											WHERE geom && ST_SetSRID(ST_MakeBox2D(ST_Point(".$bbox[0].",".$bbox[1]."), ST_Point(".$bbox[2].",".$bbox[3].")), 4326);", $connection);
			// putting out the results
			if ($response)
			{
				foreach ($response as $element)
					array_push($list, array($element['st_x'], $element['st_y'], $element['id'], $type));
			}
		}
		return $list;
	}


	// request all public transports with given tags for a given bbox and echo them
	function getPtForBbox($connection, $bbox)
	{
		// if no bbox was given
		if (!$bbox)
		{
			reportError("Some parameters are missing.");
			return false;
		}

		// if there is no connecting to server
		if (!$connection)
		{
			reportError("Not connected to database.");
			return false;
		}

		// requests
		$types = array("node", "way");

		// executing requests
		$list = array();
		foreach ($types as $type)
		{
			$response = requestDetails("SELECT ST_X(geom), ST_Y(geom), id
											FROM ".$type."s
											WHERE geom && ST_SetSRID(ST_MakeBox2D(ST_Point(".$bbox[0].",".$bbox[1]."), ST_Point(".$bbox[2].",".$bbox[3].")), 4326) AND (tags->'highway'='bus_stop' OR tags->'amenity'='bus_station' OR tags->'railway'='station' OR tags->'railway'='halt' OR tags->'railway'='tram_stop' OR tags->'railway'='platform' OR tags->'highway'='platform' OR tags->'public_transport'='platform') AND (tags ? 'name');", $connection);
			// putting out the results
			if ($response)
			{
				foreach ($response as $element)
					array_push($list, array($element['st_x'], $element['st_y'], $element['id'], $type));
			}
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
		curl_setopt($c, CURLOPT_USERAGENT, $useragent);
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
		global $db;

		if ($id && $type)
		{
			$connection = connectToDatabase($db);
			if (!$connection)
				exit;
			$query = "SELECT
						id, ST_X(geom), ST_Y(geom)
						FROM ".$type."s
						WHERE (id = ".$id.");";
			$response = requestDetails($query, $connection);
			pg_close($connection);

			if (!$response)
			{
				$connection = connectToDatabase($ptdb);
				if (!$connection)
					exit;
				$response = requestDetails($query, $connection);
				pg_close($connection);
				if (!$response)
					return false;
			}

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
		$tag = $key."=".$value;
		$keyvalue = dgettext("tags", $tag);
		if ($name[0] == $keyvalue)
			return "";
		else
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
			reportError("No return for database request: ".pg_last_error());
			return false;
		}

		return pg_fetch_all($result);
	}


	// returns all tags of an osm object
	function getTags($db, $id, $type)
	{
		// request
		$request = "SELECT tags FROM ".$type."s WHERE (id = ".$id.");";

		// connnecting to database
		$connection = connectToDatabase($db);
		// if there is no connection
		if (!$connection)
			exit;
		$response = requestDetails($request, $connection);
		pg_close($connection);

		if ($response)
		{
			$text = substr($response[0]['tags'], 1, -1);
			$temp = explode("\", \"", $text);
			for ($i=0; $i<count($temp); $i++)
			{
				$tag = explode("\"=>\"", $temp[$i]);
				$tags[$tag[0]] = $tag[1];
			}
			return $tags;
		}
		else
			return false;
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
		$rawnumber = str_replace(" - ", "-", $rawnumber);
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
		$original = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "off", "PH", "SH", "+", ";", ",", "24/7");
		$translation = array(_("Mo"), _("Tu"), _("We"), _("Th"), _("Fr"), _("Sa"), _("Su"), _("closed"), _("Public holiday"), _("School holiday"), " "._("open ending"), "<br />", " "._("and")." ", _("24/7"));
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
	function getNearObjectsForId($connection, $lat, $lon, $tags, $maxdistance)
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
						WHERE (".$tagquery.") AND (NOT (tags ? 'disused')) AND ((NOT (tags ? 'access')) OR (tags->'access' = 'customers') OR (tags->'access' = 'permissive') OR (tags->'access' = 'yes') OR (tags->'access' = 'public') OR (tags->'access' = 'destination')) AND geom && ST_Buffer(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), 2000)
						ORDER BY distance
						LIMIT 10)
						UNION
						(SELECT tags->'name' AS name, geom AS next, id AS osmid,  ST_Distance_Sphere(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), geom) AS distance
						FROM ways
						WHERE (".$tagquery.") AND (NOT (tags ? 'disused')) AND ((NOT (tags ? 'access')) OR (tags->'access' = 'customers') OR (tags->'access' = 'permissive') OR (tags->'access' = 'yes') OR (tags->'access' = 'public') OR (tags->'access' = 'destination')) AND geom && ST_Buffer(GeometryFromText('POINT ( ".$lat." ".$lon." )', 4326 ), 2000)
						ORDER BY distance
						LIMIT 10)
					) AS foo
					WHERE foo.distance < ".$maxdistance."
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


	// creates an address in the format of country $country from the tags given with $tagset
	function formatAddress($tagset, $country)
	{
		global $addressformats;

		// select template
		if ($country)
			$template = $addressformats[strtolower($country)];
		if (!$country || $country == null || $template == null)
			$template = $addressformats['default'];

		// replace placeholders
		$template = str_replace("#street#", $tagset['street'], $template);
		$template = str_replace("#housenumber#", $tagset['housenumber'], $template);
		$template = str_replace("#country#", strtoupper($tagset['country']), $template);
		$template = str_replace("#city#", $tagset['city'], $template);
		$template = str_replace("#postcode#", $tagset['postcode'], $template);
		$template = str_replace("#housename#", $tagset['housename'], $template);
		$template = str_replace("#suburb#", $tagset['suburb'], $template);
		$template = str_replace("#province#", $tagset['province'], $template);
		// remove some format mistakes because of missing tags
		$template = str_replace("</span>,", "</span>", $template);
		$template = str_replace("-</span>", "</span>", $template);
		$template = str_replace("()", "", $template);
		// remove whitespaces
		return trim($template);
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


	// checks if given osm id is valid
	function isValidId($id)
	{
		if (!$id)
			return false;

		if (!ctype_digit($id))
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


	// apply tag-transformation-file on hstore-tags-field
	function tagTransform($filename, $tags, $osmtype)
	{
		$results = array();

		if (file_exists($filename))
   			$xml = simplexml_load_file($filename);
		else
    		reportError("Could not open file: ".$filename);

		foreach ($xml->translation as $translation)
		{
			if ($translation->match != false)
			{
				$tagsmatch = tagsMatch($translation->match, $tags, $osmtype);
				if (!$tagsmatch[0])
					continue;
			}
			$regexmatches = $tagsmatch[1];

			if ($translation->find != false)
				foreach ($translation->find->children() as $find)
					$regexmatches[(string)$find['match_id']] = tagMatch($find['k'], $find['v'], $tags);

			if ($translation->output != false)
			{
				foreach ($translation->output->children() as $output)
				{
					$type = $output->getName();
					if ($type == "copy-all")
						$results = $tags;
					else if ($type == "copy-unmatched")
					{
						$results = $tags;
						foreach ($regexmatches as $regexmatch)
							if ($results[$regexmatch[0][0]] == $regexmatch[1][0])
								unset($results[$regexmatch[0][0]]);
					}
					else if ($type == "copy-matched")
					{
						$results = $regexmatches;
						foreach ($regexmatches as $regexmatch)
							$results[$regexmatch[0][0]] == $regexmatch[1][0];
					}
					else if ($type == "tag")
					{
						if (($regexmatches[(string)$output['from_match']]) && ((string)$output['from_match']!=""))
						{
							for ($i=0; $i<count($regexmatches[(string)$output['from_match']][0]); $i++)
							{
								$newKey = preg_replace('/\{'.$i.'\}/', $regexmatches[(string)$output['from_match']][0][$i], (string)$output['k']);
								$newValue = preg_replace('/\{'.$i.'\}/', $regexmatches[(string)$output['from_match']][1][$i], (string)$output['v']);
							}
							$results[$newKey] = $newValue;
						}
						else
							$results[(string)$output['k']] = (string)$output['v'];
					}
				}
			}
			return $results;
		}
		return $tags;
	}


	// returns true, if xml-element "match" matches the given tags
	function tagsMatch($matches, $tags, $osmtype)
	{
		if (($osmtype != $matches['type']) && ($matches['type'] != ""))
			return false;
		
		foreach ($matches->children() as $match)
		{
			$type = $match->getName();
			if ($type == "tag")
			{
				$tagmatch = tagMatch((string)$match['k'], (string)$match['v'], $tags);
				$regexmatches[(string)$match['match_id']] = $tagmatch;
				if (($matches['mode'] == "or") && (gettype($tagmatch) == "array"))
					$condition = true;
				else if (($matches['mode'] == "and") || !$matches['mode'])
					$condition = $condition && (gettype($tagmatch) == "array");
			}
			else if ($type == "notag")
			{
				$notagmatch = !tagMatch((string)$match['k'], (string)$match['v'], $tags);
				$regexmatches[(string)$match['match_id']] = $notagmatch;
				if (($matches['mode'] == "or") && (gettype($tagmatch) != "array"))
					$condition = true;
				else if (($matches['mode'] == "and") || !$matches['mode'])
					$condition = $condition && (gettype($notagmatch) != "array");
			}
			else if ($type == "match")
			{
				$tagsmatch = tagsMatch($match, $tags, $osmtype);
				if ($matches['mode'] == "or")
				{
					if (!$condition)
						$condition = $tagsmatch[0];
					else
						$condition = $condition || $tagsmatch[0];
				}
				else if (($matches['mode'] == "and") || !$matches['mode'])
				{
					if (!$condition)
						$condition = $tagsmatch[0];
					else
						$condition = $condition && $tagsmatch[0];
				}
				if (!$regexmatches)
					$regexmatches = array();
				if (gettype($tagsmatch[1]) == "array")
					array_push($regexmatches, $tagsmatch[1]);

			}
		}

		return array($condition, $regexmatches);
	}


	// returns regex matches, if regex expressions for key and value match at least one of the given tags, otherwise false is returned
	function tagMatch($key, $value, $tags)
	{
		foreach ($tags as $k => $v)
		{
			if (preg_match('/'.$key.'/', $k, $keyMatch) && preg_match('/'.$value.'/', $v, $valueMatch))
				return array($keyMatch, $valueMatch);
		}
		return false;
	}


	// returns the lat/lon of a milestone $position on a line $ref
	function getMilestonePosition($ref, $position)
	{
		global $db, $prefix;

		$query = "SELECT ST_X(foo.geom) AS lat, ST_Y(foo.geom) AS lon FROM
					(
						SELECT ST_Transform(ST_Centroid(ST_MakeLine(".$prefix."_point.way)), 4326) AS geom
						FROM ".$prefix."_point
						INNER JOIN ".$prefix."_ways ON ".$prefix."_point.osm_id = ANY(".$prefix."_ways.nodes)
						WHERE (".$prefix."_ways.tags@>string_to_array('ref,".$ref."', ',')) AND (".$prefix."_point.tags->'railway:position'='".$position."')
					) AS foo;";

		$connection = connectToDatabase($db);
		if (!$connection)
			return false;
		$response = requestDetails($query, $connection);

		pg_close($connection);

		if ($response[0])
			return array($response[0]['lat'], $response[0]['lon']);
		else
			return false;
	}


	// checks if given railroad line ref is in valid format
	function isValidLine($value)
	{
		if (!$value)
			return false;
		if (!ctype_alnum($value))
			return false;

		return true;
	}


	// checks if given milestone position is in valid format
	function isValidPosition($value)
	{
		if (!$value)
			return false;
		if ((ctype_digit(str_replace(".", "", $value))) && (substr_count($value, '.') == 1))
			return true;

		return false;
	}

	// returns the full name of a facility by a $ref
	function getFullName($ref)
	{
		global $db, $prefix;

		$query = "SELECT tags->'name' AS name
					FROM ".$prefix."_point
					WHERE tags->'railway:ref'='".$ref."';";

		$connection = connectToDatabase($db);
		if (!$connection)
			return false;
		$response = requestDetails($query, $connection);

		pg_close($connection);

		if ($response[0]['name'])
			return $response[0]['name'];
		else
			return false;
	}

	// checks if given railroad line ref is in valid format
	function isValidRef($ref)
	{
		if (!$ref)
			return false;
		if (!ctype_alnum($ref))
			return false;

		return true;
	}
?>
