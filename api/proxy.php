<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	require_once("functions.php");


	$url = $_GET['url'];

	$domains = array(
		'http://nominatim.openstreetmap.org/',
		'http://www.yournavigation.org/',
		'http://openlinkmap.org/',
		'http://beta.openlinkmap.org/',
		'http://www.openlinkmap.org/',
		'http://www.openstreetmap.org/'
	);

	$allowed = false;
	foreach ($domains as $domain)
	{
		if (strpos($url, $domain) === 0)
		{
		    $allowed = true;
			break;
		}
	}

	if ($url && $allowed)
	{
		// query string
		$fields = '';

		if (count($_REQUEST) > 2)
		{
			foreach ($_REQUEST as $key => $value)
			{
				if ($key != 'url' && $key != 'method')
				    $fields .= $key . '=' . rawurlencode($value) . '&';
			}
		}

		$fields = substr($fields, 0, strlen($fields) - 1);

		$response = apiRequest($url."?".$fields);
		$content = $response[0];
		$info = $response[1];

		// return the response
		if ($response)
		{
			header("Content-type: ".$info['content_type']);
			echo $content;
		}
	}

	else
	{
		reportError("Not allowed proxy request: ".$url);
		exit;
	}
?>
