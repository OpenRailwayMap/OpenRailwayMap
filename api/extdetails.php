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
				tags->'addr:housename' AS \"housename\",
				tags->'wikipedia' AS \"wikipedia\",
				tags->'phone' AS \"phone1\",
				tags->'contact:phone' AS \"phone2\",
				tags->'addr:phone' AS \"phone3\",
				tags->'phone:mobile' AS \"mobilephone1\",
				tags->'contact:mobile' AS \"mobilephone2\",
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
				tags->'service_times' AS \"servicetimes\",
				tags->'fee' AS \"fee\",
				tags->'toll' AS \"toll\",
				tags->'ref' AS \"ref\",
				tags->'capacity' AS \"capacity\",
				tags->'internet_access' AS \"internet_access\",
				tags->'image' AS \"image\",
				tags->'image:panorama' AS \"panorama\",
				tags->'description' AS \"description\",
				tags->'stars' AS \"stars\",
				tags->'cuisine' AS \"cuisine\",
				tags->'smoking' AS \"smoking\",
				tags->'biergarten' AS \"biergarten\",
				tags->'beer_garden' AS \"beer_garden\",
				tags->'brewery' AS \"beer\",
				tags->'microbrewery' AS \"microbrewery\",
				tags->'fuel:diesel' AS \"diesel\",
				tags->'fuel:GTL_diesel' AS \"gtldiesel\",
				tags->'fuel:HGV_diesel' AS \"hgvdiesel\",
				tags->'fuel:biodiesel' AS \"biodiesel\",
				tags->'fuel_octane_91' AS \"octane91\",
				tags->'fuel:octane_95' AS \"octane95\",
				tags->'fuel:octane_98' AS \"octane98\",
				tags->'fuel:octane_100' AS \"octane100\",
				tags->'fuel:octane_98_leaded' AS \"octane98l\",
				tags->'fuel:1_25' AS \"fuel25\",
				tags->'fuel:1_50' AS \"fuel50\",
				tags->'fuel:alcohol' AS \"alcohol\",
				tags->'fuel:ethanol' AS \"ethanol\",
				tags->'fuel:methanol' AS \"methanol\",
				tags->'fuel:svo' AS \"svo\",
				tags->'fuel:e85' AS \"e85\",
				tags->'fuel:biogas' AS \"biogas\",
				tags->'fuel:lpg' AS \"lpg\",
				tags->'fuel:cng' AS \"cng\",
				tags->'fuel:LH2' AS \"lh2\",
				tags->'fuel:electricity' AS \"electro\",
				tags->'fuel:adblue' AS \"adblue\",
				tags->'car_wash' AS \"carwash\",
				tags->'car_repair' AS \"carrepair\",
				tags->'shop' AS \"shop\",
				tags->'kiosk' AS \"kiosk\",
				tags->'ele' AS \"ele\",
				tags->'population' AS \"population\",
				tags->'iata' AS \"iata\",
				tags->'icao' AS \"icao\",
				tags->'disused' AS \"disused\",
				tags->'wheelchair' AS \"wheelchair\",
				tags->'wheelchair:toilets' AS \"wheelchair:toilets\",
				tags->'wheelchair:rooms' AS \"wheelchair:rooms\",
				tags->'wheelchair:access' AS \"wheelchair:access\",
				tags->'wheelchair:places' AS \"wheelchair:places\"
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
				echo textMoredetailsOut($response[0], $nameresponse, $wikipediaresponse, $langs, $offset);
			else
				echo xmlMoredetailsOut($response[0], $nameresponse, $wikipediaresponse, $langs, $offset, $id, $type);

			return true;
		}
		else
			return false;
	}


	// text/html output of extdetails
	function textMoredetailsOut($response, $nameresponse, $wikipediaresponse, $langs, $offset = 0)
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

			$mobilephone = getPhoneFaxDetail(array($response['mobilephone1'], $response['mobilephone2']));
			$mobilephonenumber = $mobilephone[0];
			$mobilephone = $mobilephone[1];

			$fax = getPhoneFaxDetail(array($response['fax1'], $response['fax2'], $response['fax3']));
			$fax = $fax[1];

			$website = getWebsiteDetail(array($response['website1'], $response['website2'], $response['website3'], $response['website4']));

			$email = getMailDetail(array($response['email1'], $response['email2'], $response['email3']));

			// get wikipedia link and make translation
			if ($wikipediaresponse)
				$wikipedia = getWikipediaDetail($langs, $wikipediaresponse);

			$openinghours = getOpeninghoursDetail($response['openinghours']);
			$servicetimes = getOpeninghoursDetail($response['servicetimes']);

			// title and description
			if ($name || $response['description'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
					$output .= "<center>";
						$output .= "<dfn><b>".$name[0]."</b></dfn><br />\n";
						if ($response['description'])
							$output .= "<dfn>".$response['description']."</dfn><br />\n";
					$output .= "</center>\n";
				$output .= "</div>\n";
			}

			// address box
			if ($response['street'] || $response['housenumber'] || $response['country'] || $response['city'] || $response['postcode'] || $response['housename'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['address']."</strong>\n";
				$output .= "<table><tr><td>\n";
					if (($response['housename']) && ($response['housename'] != $name))
						$output .= "<span>".$response['housename']."</span><br />\n";
					if ($response['street'] || $response['housenumber'])
						$output .= "<span>".$response['street']." ".$response['housenumber']."</span>\n";
					if (($response['country'] || $response['city'] || $response['postcode']) && ($response['street'] || $response['housenumber'] || $response['housename']))
						$output .= "<br />\n";
					if ($response['country'])
						$output .= "<span>".strtoupper($response['country'])."-</span>";
					if ($response['postcode'])
						$output .= "<span>".$response['postcode']." </span>\n";
					if ($response['city'])
						$output .= "<span>".$response['city']."</span>\n";
				$output .= "</td></tr></table>\n";
				$output .= "</div>\n";
			}

			// contact box
			if ($phone || $fax || $email || $mobilephone || $website[0])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['contact']."</strong>\n";
				$output .= "<table>\n";
					if ($phone)
						$output .= "<tr><td><u>".$translations['captions']['phone'].":</u> </td><td><a href=\"callto:".$phonenumber."\">".$phone."</a></td></tr>\n";
					if ($mobilephone)
						$output .= "<tr><td><u>".$translations['captions']['mobile'].":</u> </td><td><a href=\"callto:".$mobilephonenumber."\">".$mobilephone."</a></td></tr>\n";
					if ($fax)
						$output .= "<tr><td><u>".$translations['captions']['fax'].":</u> </td><td>".$fax."</td></tr>\n";
					if ($email)
						$output .= "<tr><td><u>".$translations['captions']['email'].":</u> </td><td><a href=\"mailto:".$email."\">".$email."</a></td></tr>\n";
					if ($website[0])
					{
						if (($caption = strlen($website[1]) > 31) && (strlen($website[1]) > 34))
							$caption = substr($website[1], 0, 31)."...";
						else
							$caption = $website[1];
						$output .= "<tr><td><u>".$translations['captions']['homepage'].":</u> </td><td><a target=\"_blank\" href=\"".$website[0]."\">".$caption."</a></td></tr>\n";
					}
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// gastro box
			if ($response['cuisine'] || $response['stars'] || $response['smoking'] || $response['microbrewery'] || $response['beer'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['gastro']."</strong>\n";
				$output .= "<table>\n";
					// cuisine
					if ($response['cuisine'])
						$output .= "<tr><td><span><u>".$translations['captions']['cuisine'].":</u> </td><td>".($translations['tags']['cuisine'][str_replace(";", ", ", $response['cuisine'])] != "" ? $translations['tags']['cuisine'][str_replace(";", ", ", $response['cuisine'])] : str_replace(";", ", ", $response['cuisine']))."</td></tr>\n";
					// stars
					if ($response['stars'])
					{
						$output .= "<tr><td><span><u>".$translations['captions']['stars'].":</u> </td><td>";
						for ($response['stars']; $response['stars'] > 0; $response['stars']--)
							$output .= "<img class=\"star\" src=\"../img/star.png\"/>";
						$output .= "</td></tr>\n";
					}
					// smoking
					if ($response['smoking'])
					{
						if ($response['smoking'] == "yes")
							$output .= "<tr><td><span><u>".$translations['captions']['smoking'].":</u> </td><td>".$translations['captions']['smokingyes']."</td></tr>\n";
						else if ($response['smoking'] == "no")
							$output .= "<tr><td><span><u>".$translations['captions']['smoking'].":</u> </td><td>".$translations['captions']['nosmoking']."</td></tr>\n";
						else if ($response['smoking'] == "dedicated")
							$output .= "<tr><td><span><u>".$translations['captions']['smoking'].":</u> </td><td>".$translations['captions']['dedicatedsmoking']."</td></tr>\n";
						else if ($response['smoking'] == "separated")
							$output .= "<tr><td><span><u>".$translations['captions']['smoking'].":</u> </td><td>".$translations['captions']['separatedsmoking']."</td></tr>\n";
						else if ($response['smoking'] == "isolated")
							$output .= "<tr><td><span><u>".$translations['captions']['smoking'].":</u> </td><td>".$translations['captions']['isolatedsmoking']."</td></tr>\n";
					}
					// beer sorts
					if ($response['beer'])
						$output .= "<tr><td><span><u>".$translations['captions']['beer'].":</u> </td><td>".str_replace(";", ", ", $response['beer'])."</td></tr>\n";
					// microbrewery
					if ($response['microbrewery'] == "yes")
						$output .= "<tr><td><span>".$translations['captions']['microbrew']."</td></tr>\n";
					// biergarten
					if (($response['biergarten'] == "yes") || ($response['beer_garden'] == "yes"))
						$output .= "<tr><td><span>".$translations['captions']['biergarten']."</td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// fuel box
			if ($response['carwash'] || $response['carrepair'] || $response['kiosk'] || ($response['diesel'] == "yes") || ($response['gtldiesel'] == "yes") || ($response['hgvdiesel'] == "yes") || ($response['biodiesel'] == "yes") || ($response['octane91'] == "yes") || ($response['octane95'] == "yes") || ($response['octane98'] == "yes") || ($response['octane100'] == "yes") || ($response['octane98l'] == "yes") || ($response['fuel25'] == "yes") || ($response['fuel50'] == "yes") || ($response['alcohol'] == "yes") || ($response['ethanol'] == "yes") || ($response['methanol'] == "yes") || ($response['svo'] == "yes") || ($response['e85'] == "yes") || ($response['biogas'] == "yes") || ($response['lpg'] == "yes") || ($response['cng'] == "yes") || ($response['lh2'] == "yes") || ($response['electro'] == "yes") || ($response['adblue'] == "yes"))
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['fuel']."</strong>\n";
				$output .= "<table>\n";
				// fuel sorts
				if ($response['diesel'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['diesel']."</span></td></tr>\n";
				if ($response['gtldiesel'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['gtldiesel']."</span></td></tr>\n";
				if ($response['hgvdiesel'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['hgvdiesel']."</span></td></tr>\n";
				if ($response['biodiesel'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['biodiesel']."</span></td></tr>\n";
				if ($response['octane91'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['octane91']."</span></td></tr>\n";
				if ($response['octane95'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['octane95']."</span></td></tr>\n";
				if ($response['octane98'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['octane98']."</span></td></tr>\n";
				if ($response['octane100'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['octane100']."</span></td></tr>\n";
				if ($response['octane98l'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['octane98l']."</span></td></tr>\n";
				if ($response['fuel25'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['fuel25']."</span></td></tr>\n";
				if ($response['fuel50'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['fuel50']."</span></td></tr>\n";
				if ($response['alcohol'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['alcohol']."</span></td></tr>\n";
				if ($response['ethanol'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['ethanol']."</span></td></tr>\n";
				if ($response['methanol'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['methanol']."</span></td></tr>\n";
				if ($response['svo'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['svo']."</span></td></tr>\n";
				if ($response['e10'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['e10']."</span></td></tr>\n";
				if ($response['e85'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['e85']."</span></td></tr>\n";
				if ($response['biogas'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['biogas']."</span></td></tr>\n";
				if ($response['lpg'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['lpg']."</span></td></tr>\n";
				if ($response['cng'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['cng']."</span></td></tr>\n";
				if ($response['lh2'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['lh2']."</span></td></tr>\n";
				if ($response['electro'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['electro']."</span></td></tr>\n";
				if ($response['adblue'] == "yes")
					$output .= "<tr><td><span>".$translations['captions']['adblue']."</span></td></tr>\n";
				$output .= "<br/>";
				// other properties of fuel station
				if ($response['carwash'] == "yes")
					$output .= "<tr><td><i>".$translations['captions']['carwash']."</i></td></tr>\n";
				if ($response['carrepair'] == "yes")
					$output .= "<tr><td><i>".$translations['captions']['carrepair']."</i></td></tr>\n";
				if ($response['shop'] == "kiosk" || $response['kiosk'] == "yes")
					$output .= "<tr><td><i>".$translations['captions']['kiosk']."</i></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// other box
			if ($response['operator'] || $response['capacity'] || $response['fee'] || $openinghours || $response['fee'] || $response['internet_access'] || $response['toll'] || $response['ref'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['other']."</strong>\n";
				$output .= "<table>\n";
					// opening hours
					if ($openinghours)
					{
						$output .= "<tr><td><span><u>".$translations['captions']['opening'].":</u><br />".$openinghours."</span></td></tr>\n";
						if (isOpen247($response['openinghours']))
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"open\">".$translations['opening']['alwaysopen']."</span></td></tr>\n";
						else if (isPoiOpen($response['openinghours'], $offset))
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"open\">".$translations['opening']['open']."</span></td></tr>\n";
						else if (isInHoliday($response['openinghours'], $offset))
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"maybeopen\">".$translations['opening']['maybeopen']."</span></td></tr>\n";
						else
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"closed\">".$translations['opening']['closed']."</span></td></tr>\n";
					}
					// service times
					if ($servicetimes)
					{
						$output .= "<tr><td><span><u>".$translations['captions']['service'].":</u><br />".$servicetimes."</span></td></tr>\n";
						if (isPoiOpen($response['servicetimes'], $offset))
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"open\">".$translations['opening']['open']."</span></td></tr>\n";
						else if (isInHoliday($response['servicetimes'], $offset))
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"maybeopen\">".$translations['opening']['maybeopen']."</span></td></tr>\n";
						else
							$output .= "<tr><td>&nbsp;&nbsp;<span class=\"closed\">".$translations['opening']['closed']."</span></td></tr>\n";
					}
					// operator
					if ($response['operator'])
						$output .= "<tr><td><span><u>".$translations['captions']['operator'].":</u> ".$response['operator']."</span></td></tr>\n";
					// capacity
					if ($response['capacity'])
						$output .= "<tr><td><span><u>".$translations['captions']['capacity'].":</u> ".$response['capacity']."</span></td></tr>\n";
					// ref
					if ($response['ref'])
						$output .= "<tr><td><span><u>".$translations['captions']['ref']."</u>: ".$response['ref']."</span></td></tr>\n";
					// internet access
					if ($response['internet_access'])
					{
						if ($response['internet_access'] == "terminal")
							$output .= "<tr><td><span>".$translations['captions']['terminal']."</span></td></tr>\n";
						else if ($response['internet_access'] == "wlan")
							$output .= "<tr><td><span>".$translations['captions']['wlan']."</span></td></tr>\n";
						else if ($response['internet_access'] == "wired")
							$output .= "<tr><td><span>".$translations['captions']['wired']."</span></td></tr>\n";
						else if ($response['internet_access'] == "service")
							$output .= "<tr><td><span>".$translations['captions']['internetservice']."</span></td></tr>\n";
					}
					// fee
					if ($response['fee'] == "yes")
						$output .= "<tr><td><span>".$translations['captions']['fee']."</span></td></tr>\n";
					else if ($response['fee'] == "no")
						$output .= "<tr><td><span>".$translations['captions']['nofee']."</span></td></tr>\n";
					else if ($response['fee'] == "interval")
						$output .= "<tr><td><span>".$translations['captions']['intervalfee']."</span></td></tr>\n";
					// toll
					if ($response['toll'] == "yes")
						$output .= "<tr><td><span>".$translations['captions']['toll']."</span></td></tr>\n";
					// disused
					if ($response['disused'] == "yes")
						$output .= "<tr><td><span>".$translations['captions']['disused']."</span></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// geographic box
			if ($response['ele'] || $response['population'] || $response['iata'] || $response['icao'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['geographic']."</strong>\n";
				$output .= "<table>\n";
					if ($response['ele'])
						$output .= "<tr><td><span><u>".$translations['captions']['ele'].":</u> ".$response['ele']."m</span></td></tr>\n";
					if ($response['population'])
						$output .= "<tr><td><span><u>".$translations['captions']['population'].":</u> ".number_format($response['population'], 0, ',', '.')."</span></td></tr>\n";
					if ($response['iata'])
						$output .= "<tr><td><span><u>".$translations['captions']['iata'].":</u> ".$response['iata']."</span></td></tr>\n";
					if ($response['icao'])
						$output .= "<tr><td><span><u>".$translations['captions']['icao'].":</u> ".$response['icao']."</span></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// wheelchair box
			if ($response['wheelchair'] || $response['wheelchair:toilets'] || $response['wheelchair:rooms'] || $response['wheelchair:access'] || $response['wheelchair:places'])
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<strong>".$translations['captions']['accessibility']."</strong>\n";
				$output .= "<table>\n";
					if ($response['wheelchair'])
					{
						if ($response['wheelchair'] == "yes")
							$output .= "<tr><td><span>".$translations['captions']['wheelchair']."</span></td></tr>\n";
						else if ($response['wheelchair'] == "no")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairno']."</span></td></tr>\n";
						else if ($response['wheelchair'] == "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairlimited']."</span></td></tr>\n";
					}
					if ($response['wheelchair:toilets'])
					{
						if ($response['wheelchair:toilets'] == "yes")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairtoilets']."</span></td></tr>\n";
						else if ($response['wheelchair:toilets'] == "no")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairtoiletsno']."</span></td></tr>\n";
						else if ($response['wheelchair:toilets'] == "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairtoiletslimited']."</span></td></tr>\n";
					}
					if ($response['wheelchair:rooms'])
					{
						if ($response['wheelchair:rooms'] == "yes" || $response['wheelchair:rooms'] != "no" || $response['wheelchair:rooms'] != "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairrooms']."</span></td></tr>\n";
						else if ($response['wheelchair:rooms'] == "no")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairroomsno']."</span></td></tr>\n";
						else if ($response['wheelchair:rooms'] == "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairroomslimited']."</span></td></tr>\n";
					}
					if ($response['wheelchair:access'])
					{
						if ($response['wheelchair:access'] == "yes" || $response['wheelchair:access'] != "no" || $response['wheelchair:access'] != "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairaccess']."</span></td></tr>\n";
						else if ($response['wheelchair:access'] == "no")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairaccessno']."</span></td></tr>\n";
						else if ($response['wheelchair:access'] == "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairaccesslimited']."</span></td></tr>\n";
					}
					if ($response['wheelchair:places'])
					{
						if ($response['wheelchair:places'] == "yes" || $response['wheelchair:places'] != "no" || $response['wheelchair:places'] != "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairplaces']."</span></td></tr>\n";
						else if ($response['wheelchair:places'] == "no")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairplacesno']."</span></td></tr>\n";
						else if ($response['wheelchair:places'] == "limited")
							$output .= "<tr><td><span>".$translations['captions']['wheelchairplaceslimited']."</span></td></tr>\n";
					}
				$output .= "</table>\n";
				$output .= "</div>\n";
			}
			// wikipedia box
			if ($wikipedia)
			{
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<table>\n";
					$output .= "<tr><td><strong>".$translations['captions']['wikipedia']."</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i><a target=\"_blank\" id=\"moreWikipediaFull\" href=\"".$wikipedia[1]."\">".$translations['captions']['fullarticle']."</a></i></td></tr>\n";
					// request first lines
					$output .= "<tr><td>".getWikipediaBeginning($wikipedia[1])."</td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			// image box, only images from wikimedia are supported
			if (substr($response['image'], 0, 28) == "http://upload.wikimedia.org/")
			{
				$attribution = explode("/", $response['image']);
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<table>\n";
					$output .= "<tr><td><strong>".$translations['captions']['image']."</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i id=\"moreWikipediaFull\"><a target=\"_blank\" href=\"http://commons.wikimedia.org/w/index.php?title=Special%3ASearch&search=".$name."\">".$translations['captions']['moreimages']."</a></i></td></tr>\n";
					$output .= "<tr><td><img id=\"moreImage\" title=\"".$translations['captions']['fullscreen']."\" src=\"".getWikipediaThumbnailUrl($response['image'])."\" /></a></td></tr>\n";
					$output .= "<tr><td><a target=\"_blank\" href=\"http://commons.wikimedia.org/wiki/File:".$attribution[7]."\">".$translations['captions']['copyrightandbig']."</a></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}
			elseif (getWikipediaImage($wikipedia[1]))
			{
				$image = getWikipediaImage($wikipedia[1]);

				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<table>\n";
					$output .= "<tr><td><strong>".$translations['captions']['image']."</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i id=\"moreWikipediaFull\"><a target=\"_blank\" href=\"http://commons.wikimedia.org/w/index.php?title=Special%3ASearch&search=".$name."\">".$translations['captions']['moreimages']."</a></i></td></tr>\n";
					$output .= "<tr><td><img id=\"moreImage\" title=\"".$translations['captions']['fullscreen']."\" src=\"".getWikipediaThumbnailUrl($image)."\" /></a></td></tr>\n";
					$output .= "<tr><td><a target=\"_blank\" href=\"".$image."\">".$translations['captions']['copyrightandbig']."</a></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}

			/*
			// panorama
			if (substr($response['panorama'], 0, 28) == "http://upload.wikimedia.org/")
			{
				$attribution = explode("/", $response['panorama']);
				$output .= "<div class=\"moreInfoBox\">\n";
				$output .= "<table>\n";
					$output .= "<tr><td><strong>".$translations['captions']['panorama']."</strong></td></tr>\n";
					$output .= "<tr><td><img id=\"morePanorama\" title=\"".$translations['captions']['fullscreen']."\" src=\"".getWikipediaThumbnailUrl($response['panorama'])."\" /></a></td></tr>\n";
					$output .= "<tr><td><a target=\"_blank\" href=\"http://commons.wikimedia.org/wiki/File:".$attribution[7]."\">".$translations['captions']['copyrightandbig']."</a></td></tr>\n";
				$output .= "</table>\n";
				$output .= "</div>\n";
			}
			*/

			$output .= "</div>\n";

			return $output;
		}
		else
			return false;
	}


	// output of details data in xml format
	function xmlMoreDetailsOut($response, $nameresponse, $wikipediaresponse, $langs = "en", $offset = 0, $id, $type)
	{
		if ($response)
		{
			$output = xmlStart("moredetails id=\"".$id."\" type=\"".$type."\"");

			$name = getNameDetail($langs, $nameresponse);

			$phone = getPhoneFaxDetail(array($response['phone1'], $response['phone2'], $response['phone3']));
			$phone = $phone[1];

			$fax = getPhoneFaxDetail(array($response['fax1'], $response['fax2'], $response['fax3']));
			$fax = $fax[1];

			$mobilephone = getPhoneFaxDetail(array($response['mobilephone1'], $response['mobilephone2']));
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

			 if ($response['description'])
			 	$output .= "<description>".$response['description']."</description>";

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
			if ($website[0])
			{
				$output .= "<web>\n";
				if ($website[0])
					$output .= "<website>".$website[0]."</website>\n";
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

			// fuel details
			if ($response['carwash'] || $response['carrepair'] || $response['kiosk'] || ($response['diesel'] == "yes") || ($response['gtldiesel'] == "yes") || ($response['hgvdiesel'] == "yes") || ($response['biodiesel'] == "yes") || ($response['octane91'] == "yes") || ($response['octane95'] == "yes") || ($response['octane98'] == "yes") || ($response['octane100'] == "yes") || ($response['octane98l'] == "yes") || ($response['fuel25'] == "yes") || ($response['fuel50'] == "yes") || ($response['alcohol'] == "yes") || ($response['ethanol'] == "yes") || ($response['methanol'] == "yes") || ($response['svo'] == "yes") || ($response['e85'] == "yes") || ($response['biogas'] == "yes") || ($response['lpg'] == "yes") || ($response['cng'] == "yes") || ($response['lh2'] == "yes") || ($response['electro'] == "yes") || ($response['adblue'] == "yes"))
			{
				$output .= "<fuel>\n";
					// fuel sorts
					if ($response['diesel'] == "yes")
						$output .= "<diesel />\n";
					if ($response['gtldiesel'] == "yes")
						$output .= "<gtldiesel />\n";
					if ($response['hgvdiesel'] == "yes")
						$output .= "<hgvdiesel />\n";
					if ($response['biodiesel'] == "yes")
						$output .= "<biodiesel />\n";
					if ($response['octane91'] == "yes")
						$output .= "<octane91 />\n";
					if ($response['octane95'] == "yes")
						$output .= "<octane95 />\n";
					if ($response['octane98'] == "yes")
						$output .= "<octane98 />\n";
					if ($response['octane100'] == "yes")
						$output .= "<octane100 />\n";
					if ($response['octane98l'] == "yes")
						$output .= "<octane98l />\n";
					if ($response['fuel25'] == "yes")
						$output .= "<1:25 />\n";
					if ($response['fuel50'] == "yes")
						$output .= "<1:50 />\n";
					if ($response['alcohol'] == "yes")
						$output .= "<alcohol />\n";
					if ($response['ethanol'] == "yes")
						$output .= "<ethanol />\n";
					if ($response['methanol'] == "yes")
						$output .= "<methanol />\n";
					if ($response['svo'] == "yes")
						$output .= "<svo />\n";
					if ($response['e10'] == "yes")
						$output .= "<e10 />\n";
					if ($response['e85'] == "yes")
						$output .= "<e85 />\n";
					if ($response['biogas'] == "yes")
						$output .= "<biogas />\n";
					if ($response['lpg'] == "yes")
						$output .= "<lpg />\n";
					if ($response['cng'] == "yes")
						$output .= "<cng />\n";
					if ($response['lh2'] == "yes")
						$output .= "<lh2 />\n";
					if ($response['electro'] == "yes")
						$output .= "<electricity />\n";
					if ($response['adblue'] == "yes")
						$output .= "<adblue />\n";
					// other properties of fuel station
					if ($response['carwash'] == "yes")
						$output .= "<carwash />\n";
					if ($response['carrepair'] == "yes")
						$output .= "<carrepair />\n";
					if ($response['shop'] == "kiosk" || $response['kiosk'] == "yes")
						$output .= "<kiosk />\n";
				$output .= "</fuel>\n";
			}

			// gastro
			if ($response['cuisine'] || $response['stars'] || $response['smoking'] || $response['microbrewery'] || $response['beer'])
			{
				$output .= "<gastronomy>\n";
					// cuisine
					if ($response['cuisine'])
						$output .= "<cuisine>".str_replace(";", ",", $response['cuisine'])."</cuisine>\n";
					// stars
					if ($response['stars'])
						$output .= "<stars>".$response['stars']."</stars>\n";
					// smoking
					if ($response['smoking'])
						$output .= "<smoking>".$response['smoking']."</smoking>";
					// beer sorts
					if ($response['beer'])
						$output .= "<beer>".str_replace(";", ",", $response['beer'])."</beer>\n";
					// microbrewery
					if ($response['microbrewery'] == "yes")
						$output .= "<microbrewery />\n";
					// biergarten
					if (($response['biergarten'] == "yes") || ($response['beer_garden'] == "yes"))
						$output .= "<biergarten />\n";
				$output .= "</gastronomy>\n";
			}

			// geographic
			if ($response['ele'] || $response['population'] || $response['iata'] || $response['icao'])
			{
				$output .= "<geographic>\n";
					if ($response['ele'])
						$output .= "<ele>".$response['ele']."m</ele>\n";
					if ($response['population'])
						$output .= "<population>".$response['population']."</population>\n";
					if ($response['iata'])
						$output .= "<iata>".$response['iata']."</iata>\n";
					if ($response['icao'])
						$output .= "<icao>".$response['icao']."</icao>\n";
				$output .= "</geographic>\n";
			}

			// wheelchair
			if ($response['wheelchair'] || $response['wheelchair:toilets'] || $response['wheelchair:rooms'] || $response['wheelchair:access'] || $response['wheelchair:places'])
			{
				$output .= "</table>\n";

				if ($response['wheelchair'])
					$output .= "<wheelchair>".$response['wheelchair']."</wheelchair>\n";
				if ($response['wheelchair:toilets'])
					$output .= "<wheelchair:toilets>".$response['wheelchair:toilets']."</wheelchair:toilets>\n";
				if ($response['wheelchair:rooms'])
					$output .= "<wheelchair:rooms>".$response['wheelchair:rooms']."</wheelchair:rooms>\n";
				if ($response['wheelchair:access'])
					$output .= "<wheelchair:access>".$response['wheelchair:access']."</wheelchair:access>\n";
				if ($response['wheelchair:places'])
					$output .= "<wheelchair:places>".$response['wheelchair:places']."</wheelchair:places>\n";

				$output .= "</accessibility>\n";
			}

			// fee
			if ($response['fee'])
				$output .= "<fee>".$response['fee']."</fee>\n";

			// capacity
			if ($response['capacity'])
				$output .= "<capacity>".$response['capacity']."</capacity>\n";

			// ref
			if ($response['ref'])
				$output .= "<ref>".$response['ref']."</ref>\n";

			// internet access
			if ($response['internet_access'])
				$output .= "<internet_access>".$response['internet_access']."</internet_access>\n";

			// toll
			if ($response['toll'] == "yes")
				$output .= "<toll />\n";

			// disused
			if ($response['disused'] == "yes")
				$output .= "<disused />\n";

			// wikipedia
			if ($wikipedia)
			{
				$output .= "<wikipedia>\n";
					$output .= "<url>".$wikipedia[1]."</url>\n";
					// request first lines
					$output .= "<text>".getWikipediaBeginning($wikipedia[1])."</text>\n";
				$output .= "</wikipedia>\n";
			}

			// image, only images from wikimedia are supported
			if (substr($response['image'], 0, 28) == "http://upload.wikimedia.org/")
			{
				$output .= "<image>";
					$output .= $response['image'];
				$output .= "</image>\n";
			}
			elseif (getWikipediaImage($wikipedia[1]))
			{
				$image = getWikipediaImage($wikipedia[1]);

				$output .= "<image>";
					$output .= $image;
				$output .= "</image>\n";
			}

			$output .= "</moredetails>";

			return $output;
		}

		else
			return false;
	}
?>
