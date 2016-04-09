<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("config.php");


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


	// returns latlon of given id and type
	function getLatLon($id, $type)
	{
		global $db;

		if (isValidId($id) && isValidType($type))
		{
			$connection = connectToDatabase($db);
			if (!$connection)
				exit;
			$query = "SELECT
						id, ST_X(geom), ST_Y(geom)
						FROM " . $_GET[$type] . "s
						WHERE (id = " . $_GET[$id] . ");";
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


	// make a database request by a given query string
	function requestDetails($request, $connection)
	{
		$result = pg_query($connection, $request);

		if (!$result)
			return false;

		return pg_fetch_all($result);
	}


	// beginning of xml output: header, first root element
	function xmlStart($root)
	{
		header("Content-Type: application/xml; charset=UTF-8");
		return "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<".$root.">\n";
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

	// formats a given distance in meters
	function formatDistance($meters)
	{
		if ($meters > 1000)
			$distance = round($meters/1000, 2)."km";
		else
			$distance = (int)$meters."m";

		return $distance;
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
				{
					$latlon = getLatLon('id', isset($type) ? $type : "");
					if ($latlon)
						echo $latlon[1].",\n";
					else
						echo "null,\n";
				}
			echo "lon : ";
				if (isValidCoordinate('lon'))
					echo $_GET['lon'].",\n";
				else
				{
					$latlon = getLatLon('id', isset($type) ? $type : "");
					if ($latlon)
						echo $latlon[0].",\n";
					else
						echo "null,\n";
				}
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
