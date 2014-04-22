/*
OpenRailwayMap Copyright (C) 2012 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenRailwayMap for details.
*/


// provides a menu overlay for the mobile version of the website
function Mobilemenu(menuId, buttonId)
{
	this.menuId = menuId;
	this.buttonId = buttonId;
	var self = this;

	gEBI(buttonId).onclick = function() {self.show()};

	this.show = function()
	{
		gEBI(menuId).className = "menu";
		gEBI(buttonId).onclick = function() {self.hide()};
	}

	this.hide = function()
	{
		gEBI(menuId).className = "menuOut";
		gEBI(buttonId).onclick = function() {self.show()};
	}
}
