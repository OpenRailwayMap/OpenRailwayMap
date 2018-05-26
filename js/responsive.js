/*
OpenRailwayMap Copyright (C) 2018 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See https://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


var toggleResponsiveMenu = function(event)
{
	document.getElementById("responsive-menu-button").addEventListener('click', function(event)
	{
		var nav = document.getElementById("navigation");
		nav.classList.toggle("responsive");
	});

	document.querySelectorAll(".dropdown > a").forEach(function(item)
	{
		item.addEventListener('click', function ()
		{
			var content = event.target.getElementsByClassName("dropdown-content");
			for (var i = 0; i < content.length; i++)
			{
				content[i].classList.toggle("open");
			}
		});
	});
};

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading")
	toggleResponsiveMenu();
else
	document.addEventListener('DOMContentLoaded', toggleResponsiveMenu);
