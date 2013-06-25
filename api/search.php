<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	require_once("functions.php");

	$query = urldecode($_GET['q']);
	// TODO: different output formats: html, xml, json
	// TODO: lang parameter
	// TODO: mehrere milestones mit landesangabe

	header("Content-Type: text/html; charset=UTF-8");
	echo "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">";

	// helper variable for colouring every even result
	$even = false;

	// search for short names
	if (isValidRef($query))
	{
		$result = getFacilityPositionByRef($query);
		if ($result)
		{
			foreach ($result as $entry)
			{
				$even = !$even;
				echo '<div class="resultEntry '.($even ? 'even' : 'odd').'"><div onclick="search.showResult('.$entry['lon'].', '.$entry['lat'].', '.$entry['id'].', \'node\');"><b>'.$entry['name'].'</b><br /><dfn>'."placeType".'</dfn></div></div>';
			}
		}
	}
	// search for full names
	if (isValidName($query))
	{
		$result = getFacilityPositionByName($query);
		if ($result)
		{
			foreach ($result as $entry)
			{
				$even = !$even;
				echo '<div class="resultEntry '.($even ? 'even' : 'odd').'"><div onclick="search.showResult('.$entry['lon'].', '.$entry['lat'].', '.$entry['id'].', \'node\');"><b>'.$entry['name'].'</b><br /><dfn>'."placeType".'</dfn></div></div>';
			}
		}
	}
	// search for milestones
	$milestonequery = explode(" ", $query);
	if (isValidLine($milestonequery[0]) && isValidPosition($milestonequery[1]))
	{
		$result = getMilestonePosition($milestonequery[0], $milestonequery[1]);
		if ($result)
			echo "Kilometer ".$milestonequery[1]." der Strecke ".$milestonequery[0]." ".$result['0']." ".$result['1'];
	}
	if (isValidLine($milestonequery[1]) && isValidPosition($milestonequery[0]))
	{
		$result = getMilestonePosition($milestonequery[1], $milestonequery[0]);
		if ($result)
			echo "Kilometer ".$milestonequery[0]." der Strecke ".$milestonequery[1]." ".$result['0']." ".$result['1'];
	}
?>
