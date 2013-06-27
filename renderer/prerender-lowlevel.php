<?php
	/*
	OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
	This program comes with ABSOLUTELY NO WARRANTY.
	This is free software, and you are welcome to redistribute it under certain conditions.
	See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
	*/


	for ($z=2; $z<9; $z++)
	{
		$xtiles = pow(2, $z)+1;
		for ($x=0; $x<$xtiles; $x++)
		{
			$ytiles = pow(2, $z)+1;
			for ($y=0; $y<$ytiles; $y++)
			{
				echo "Rendering z".$z." ".$x." ".$y."\n";
				system("php vtiler.php ".$z." ".$x." ".$y);
			}
		}
	}
?>
