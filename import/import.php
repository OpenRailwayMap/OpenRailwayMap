<?php
	/*
	OpenLinkMap Copyright (C) 2010 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
	*/


	// email address to send error reports to
	$mail = "AlexanderMatheisen@ish.de";
	// name of application
	$appname = "OpenLinkMap";
	// id offset between nodes and centroids
	$offset = 1000000000000000;
	$offsetfactorrels = 2000000000000000;
	$tags = "";
	$id = 0;
	$lat = "";
	$lon = "";
	$type = "";
	$connection = null;


	// connects do database
	function connectToDatabase($dbname)
	{
		if (!isset($dbname))
		{
			reportError("Database name was not given.");
			return false;
		}

		$connection = pg_pconnect("user=postgres dbname=".$dbname);
		// if connection could not be set up
		if (!$connection)
		{
			reportError("Could not connect to database.");
			return false;
		}

		return $connection;
	}

	// send error report to own mail account
	function reportError($error = "")
	{
		global $mail, $appname;

		// get ip and user agent string
		$header = $_SERVER['HTTP_USER_AGENT'];
		$ip = $_SERVER['REMOTE_ADDR'];

		// generating message
		$message = "An error happened in ".$appname.".at ".date("d.m.Y-H:i", time());
		$message .= "\n\n".$error;

		// sending error report by mail to given mail address
		$sended = mail($mail, "Error Report ".$appname, $message);

		// check if mail was being send
		if(!$sended)
			return false;

		return true;
	}

	// copies a file to a database
	function importOsmFile($filename, $db)
	{
		global $offset, $offsetfactorrels, $connection;

		$connection = connectToDatabase($db);
		// if there is no connection
		if (!$connection)
		{
			reportError("Cannot connect to database.");
			return false;
		}

		$result = pg_query($connection, "TRUNCATE nodes");
		$result = pg_query($connection, "TRUNCATE ways");
		$result = pg_query($connection, "TRUNCATE relations");

		$xml_parser = xml_parser_create();
		xml_set_element_handler($xml_parser, "startElement", "endElement");
		if (!($fp = fopen($filename, "r")))
		{
			reportError("Cannot open file.");
			return false;
		}
		while ($data = fread($fp, 4096))
		{
			if (!xml_parse($xml_parser, $data, feof($fp)))
			{
				reportError("XML-Error.");
				return false;
			}
		}
		xml_parser_free($xml_parser);

		fclose($fp);
		pg_close($connection);
		echo "Finished ".$db."...\n";
		return true;
	}

	function startElement($parser, $name, $attr)
	{
		global $tags, $id, $lat, $lon, $type, $offset, $offsetfactorrels;

		if ($name == "TAG")
		{
			if ($tags == "")
				$tags = '"'.addslashes($attr['K']).'"=>"'.addslashes($attr['V']).'"';
			else
				$tags .= ',"'.addslashes($attr['K']).'"=>"'.addslashes($attr['V']).'"';
		}

		if ($name == "NODE")
		{
			$id = (int)$attr['ID'];
			$lat = $attr['LAT'];
			$lon = $attr['LON'];

			if ($id > $offsetfactorrels)
				$type = "relations";
			else if ($id > $offset)
				$type = "ways";
			else
				$type = "nodes";

			if ($type == "relations")
				$id = $id-$offsetfactorrels;
			else if ($type == "ways")
				$id = $id-$offset;
		}
	}

	function endElement($parser, $name)
	{
		global $tags, $id, $type, $lat, $lon, $connection;

		if ($name == "NODE")
		{
			$result = pg_query($connection, "INSERT INTO ".$type." (id, tags, geom) VALUES ('".$id."', '".str_replace("\"", "\\\"", $tags)."', GeometryFromText('POINT ( ".$lon." ".$lat." )', 4326 ))");
			if (!$result)
				reportError("Failed to insert element: http://www.openstreetmap.org/edit?editor=remote&".substr($type, 0, -1).$id);
			$tags = '';
		}
	}

	importOsmFile("old-olm.osm", "olm");
	importOsmFile("old-nextobjects.osm", "nextobjects");
	echo "Finished.\n";
?>