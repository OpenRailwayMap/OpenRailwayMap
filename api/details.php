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

	$format = $_GET['format'];
	$id = $_GET['id'];
	$type = $_GET['type'];
	// offset of user's timezone to UTC
	$offset = offset($_GET['offset']);

	date_default_timezone_set('UTC');


	// prohibition of sql injections
	if (!isValidType($type) || !isValidId($id))
	{
		echo "NULL";
		exit;
	}

	// get the most important langs of the user
	$langs = getLangs();
	if ($_GET['lang'])
		$langs[0] = $_GET['lang'];

	if (!getDetails($db, $id, $type, $langs, $offset))
		echo "NULL";


	function getDetails($db, $id, $type, $langs, $offset)
	{
		global $format;

		// request
		$request = "SELECT
				tags->'addr:street' AS \"street\",
				tags->'addr:housenumber' AS \"housenumber\",
				tags->'addr:country' AS \"country\",
				tags->'addr:postcode' AS \"postcode\",
				tags->'addr:city' AS \"city\",
				tags->'phone' AS \"phone1\",
				tags->'contact:phone' AS \"phone2\",
				tags->'addr:phone' AS \"phone3\",
				tags->'fax' AS \"fax1\",
				tags->'contact:fax' AS \"fax2\",
				tags->'addr:fax' AS \"fax3\",
				tags->'website' AS \"website1\",
				tags->'url' AS \"website2\",
				tags->'url:official' AS \"website3\",
				tags->'contact:website' AS \"website4\",
				tags->'operator' AS \"operator\",
				tags->'email' AS \"email1\",
				tags->'contact:email' AS \"email2\",
				tags->'addr:email' AS \"email3\",
				tags->'opening_hours' AS \"openinghours\",
				tags->'service_times' AS \"servicetimes\"
			FROM ".$type."s WHERE (id = ".$id.");";

		$wikipediarequest = "SELECT
								foo.keys, foo.values
							FROM (
								SELECT
									skeys(tags) AS keys,
									svals(tags) AS values
								FROM ".$type."s
								WHERE (id = ".$id.")
							) AS foo
							WHERE substring(foo.keys from 1 for 9) = 'wikipedia';";

		$namerequest = "SELECT
								foo.keys, foo.values
							FROM (
								SELECT
									skeys(tags) AS keys,
									svals(tags) AS values
								FROM ".$type."s
								WHERE (id = ".$id.")
							) AS foo
							WHERE substring(foo.keys from 1 for 4) = 'name';";

		// connnecting to database
		$connection = connectToDatabase($db);
		// if there is no connection
		if (!$connection)
			exit;

		$response = requestDetails($request, $connection);
		$wikipediaresponse = requestDetails($wikipediarequest, $connection);
		$nameresponse = requestDetails($namerequest, $connection);

		pg_close($connection);

		if ($response)
		{
			if ($format == "text")
				echo textDetailsOut($response[0], $nameresponse, $wikipediaresponse, $langs, $offset);
			else
				echo xmlDetailsOut($response[0], $nameresponse, $wikipediaresponse, $langs, $offset, $id, $type);

			return true;
		}
		else
			return false;
	}


	// output of details data in plain text format
	function textDetailsOut($response, $nameresponse, $wikipediaresponse, $langs = "en", $offset = 0)
	{
		global $translations;

		if ($response)
		{
			// setting header
			header("Content-Type: text/html; charset=UTF-8");
			$output = "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">";

			// translation of name
			if ($nameresponse)
				$name = getNameDetail($langs, $nameresponse);

			$phone = getPhoneFaxDetail(array($response['phone1'], $response['phone2'], $response['phone3']));
			$phonenumber = $phone[0];
			$phone = $phone[1];

			$fax = getPhoneFaxDetail(array($response['fax1'], $response['fax2'], $response['fax3']));
			$fax = $fax[1];

			$mobilephone = getPhoneFaxDetail(array($element['mobilephone1'], $element['mobilephone2']));
			$mobilephonenumber = $mobilephone[0];
			$mobilephone = $mobilephone[1];

			$website = getWebsiteDetail(array($response['website1'], $response['website2'], $response['website3'], $response['website4']));

			$email = getMailDetail(array($response['email1'], $response['email2'], $response['email3']));

			// get wikipedia link and make translation
			if ($wikipediaresponse)
				$wikipedia = getWikipediaDetail($langs, $wikipediaresponse);

			$openinghours = getOpeninghoursDetail($response['openinghours']);
			$servicetimes = getOpeninghoursDetail($response['servicetimes']);

			// printing popup details
			if ($name)
			{
				$output .= "<div class=\"container hcard vcard\"><div class=\"header\">\n";
				$output .= "<strong class=\"name\">".$name[0]."</strong>\n";
				$output .= "</div>\n";
			}

			// address information
			if ($response['street'] || $response['housenumber'] || $response['country'] || $response['city'] || $response['postcode'])
			{
				$output .= "<div class=\"adr\">\n";
				if ($response['street'] || $response['housenumber'])
					$output .= "<div class=\"street-address\">".$response['street']." ".$response['housenumber']."</div>\n";
				if ($response['country'])
					$output .= "<span class=\"country-name\">".strtoupper($response['country'])."-</span>";
				if ($response['postcode'])
					$output .= "<span class=\"postal-code\">".$response['postcode']." </span>\n";
				if ($response['city'])
					$output .= "<span class=\"locality\">".$response['city']."</span>\n";
				$output .= "</div>\n";
			}

			// contact information
			if ($phone || $fax || $mobilephone || $email)
			{
				$output .= "<div class=\"contact\">\n";
				if ($phone)
					$output .= "<div class=\"tel\"><span class=\"type\">".$translations['captions']['phone']."</span>: <a class=\"value\" href=\"callto:".$phonenumber."\">".$phone."</a></div>\n";
				if ($fax)
					$output .= "<div class=\"tel\"><span class=\"type\">".$translations['captions']['fax']."</span>: <span class=\"value\">".$fax."</span></div>\n";
				if ($mobilephone)
					$output .= "<div class=\"tel\"><span class=\"type\">".$translations['captions']['mobile']."</span>: <span class=\"value\" href=\"callto:".$mobilephonenumber."\">".$mobilephone."</span></div>\n";
				if ($email)
					$output .= "<div>".$translations['captions']['email'].": <a class=\"email\" href=\"mailto:".$email."\">".$email."</a></div>\n";
				$output .= "</div>\n";
			}

			// website and wikipedia links
			if ($website[0] || $wikipedia[0])
			{
				$output .= "<div class=\"web\">\n";
				if ($website[0])
				{
					if (($caption = strlen($website[1]) > 37) && (strlen($website[1]) > 40))
						$caption = substr($website[1], 0, 37)."...";
					else
						$caption = $website[1];
					$output .= "<div>".$translations['captions']['homepage'].": <a class=\"url\" target=\"_blank\" href=\"".$website[0]."\">".$caption."</a></div>\n";
				}
				if ($wikipedia[1])
					$output .= "<div class=\"wikipedia\">".$translations['captions']['wikipedia'].": <a target=\"_blank\" href=\"".$wikipedia[1]."\">".urldecode($wikipedia[2])."</a></div>\n";
				$output .= "</div>\n";
			}

			// operator
			if ($response['operator'])
				$output .= "<div class=\"operator\">".$translations['captions']['operator'].": ".$response['operator']."</div>\n";

			// opening hours
			if ($openinghours)
			{
				$output .= "<div class=\"openinghours\">".$translations['captions']['opening'].":<br />".$openinghours;
				if (isOpen247($response['openinghours']))
					$output .= "<br /><b class=\"open\">".$translations['opening']['alwaysopen']."</b>";
				else if (isPoiOpen($response['openinghours'], $offset))
					$output .= "<br /><b class=\"open\">".$translations['opening']['open']."</b>";
				else if (isInHoliday($response['openinghours'], $offset))
					$output .= "<br /><b class=\"maybeopen\">".$translations['opening']['maybeopen']."</b>";
				else
					$output .= "<br /><b class=\"closed\">".$translations['opening']['closed']."</b>";
				$output .= "</div>\n";
			}

			// service times
			if ($servicetimes)
			{
				$output .= "<div class=\"servicetimes\">".$translations['captions']['service'].":<br />".$servicetimes;
				if (isPoiOpen($response['openinghours'], $offset))
					$output .= "<br /><b class=\"open\">".$translations['opening']['open']."</b>";
				else if (isInHoliday($response['servicetimes'], $offset))
					$output .= "<br /><b class=\"maybeopen\">".$translations['opening']['maybeopen']."</b>";
				else
					$output .= "<br /><b class=\"closed\">".$translations['opening']['closed']."</b>";
				$output .= "</div>\n";
			}

			$output .= "</div>\n";

			return $output;
		}

		else
			return false;
	}


	// output of details data in xml format
	function xmlDetailsOut($response, $nameresponse, $wikipediaresponse, $langs = "en", $offset = 0, $id, $type)
	{
		if ($response)
		{
			$output = xmlStart("details id=\"".$id."\" type=\"".$type."\"");

			$name = getNameDetail($langs, $nameresponse);

			$phone = getPhoneFaxDetail(array($response['phone1'], $response['phone2'], $response['phone3']));
			$phone = $phone[1];

			$fax = getPhoneFaxDetail(array($response['fax1'], $response['fax2'], $response['fax3']));
			$fax = $fax[1];

			$mobilephone = getPhoneFaxDetail(array($element['mobilephone1'], $element['mobilephone2']));
			$mobilephone = $mobilephone[1];

			$website = getWebsiteDetail(array($response['website1'], $response['website2'], $response['website3'], $response['website4']));

			$email = getMailDetail(array($response['email1'], $response['email2'], $response['email3']));

			// get wikipedia link and make translation
			if ($wikipediaresponse)
				$wikipedia = getWikipediaDetail($langs, $wikipediaresponse);

			$openinghours = getOpeninghoursDetail($response['openinghours']);
			$servicetimes = getOpeninghoursDetail($response['servicetimes']);

			// printing popup details
			if ($name)
			{
				$output .= "<name";
				if ($name[0])
					$output .= " lang=\"".$name[1]."\"";
				$output .= ">".$name[0]."</name>\n";
			}

			// address information
			if ($response['street'] || $response['housenumber'] || $response['country'] || $response['postcode'] || $response['city'])
			{
				$output .= "<address>\n";
				if ($response['street'])
					$output .= "<street>".$response['street']."</street>\n";
				if ($response['housenumber'])
					$output .= "<housenumber>".$response['housenumber']."</housenumber>\n";
				if ($response['country'])
					$output .= "<country>".strtoupper($response['country'])."</country>\n";
				if ($response['postcode'])
					$output .= "<postcode>".$response['postcode']."</postcode>\n";
				if ($response['city'])
					$output .= "<city>".$response['city']."</city>\n";
				$output .= "</address>\n";
			}

			// contact information
			if ($phone || $fax || $mobilephone || $email)
			{
				$output .= "<contact>\n";
				if ($phone)
					$output .= "<phone>".$phone."</phone>\n";
				if ($fax)
					$output .= "<fax>".$fax."</fax>\n";
				if ($mobilephone)
					$output .= "<mobilephone>".$mobilephone."</mobilephone>\n";
				if ($email)
					$output .= "<email>".$email."</email>\n";
				$output .= "</contact>\n";
			}

			// website and wikipedia links
			if ($website[0] || $wikipedia[0])
			{
				$output .= "<web>\n";
				if ($website[0])
					$output .= "<website>".$website[0]."</website>\n";
				if ($wikipedia[1])
					$output .= "<wikipedia>".$wikipedia[1]."</wikipedia>\n";
				$output .= "</web>\n";
			}

			// operator
			if ($response['operator'])
				$output .= "<operator>".$response['operator']."</operator>\n";

			// opening hours
			if ($openinghours)
			{
				$output .= "<openinghours state=\"";

				if (isPoiOpen($response['openinghours'], $offset))
					$output .= "open";
				else if (isInHoliday($response['openinghours'], $offset))
					$output .= "maybeopen";
				else
					$output .= "closed";

				$output .= "\">".$response['openinghours']."</openinghours>\n";
			}

			// service times
			if ($servicetimes)
			{
				$output .= "<servicetimes state=\"";

				if (isPoiOpen($response['servicetimes'], $offset))
					$output .= "open";
				else if (isInHoliday($response['servicetimes'], $offset))
					$output .= "maybeopen";
				else
					$output .= "closed";

				$output .= "\">".$response['servicetimes']."</servicetimes>\n";
			}

			$output .= "</details>";

			return $output;
		}

		else
			return false;
	}
?>
