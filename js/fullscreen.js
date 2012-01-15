/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


function Fullscreen(frame, image)
{
	// shows the fullscreen view of an image
	this.show = function(url)
	{
		var self = this;
		this.frame.className = "fullscreen";
		this.frame.innerHTML = "<img id='fullscreenImg' src='"+this.url+"' />";

		var fullscreenimg = gEBI("fullscreenImg");
		fullscreenimg.onclick = function()
		{
			self.hide();
		};
		fullscreenimg.title = translations['close'];
	}

	// hides the fullscreen view of an image
	this.hide = function()
	{
		var self = this;
		this.frame.className = "fullscreenOut";
		this.frame.innerHTML = "";
		gEBI(this.image).onclick = function()
		{
			self.show(this.url);
		};
	}

	// inits the events
	this.init = function()
	{
		if (this.image)
		{
			this.url = getWikipediaImageUrl(gEBI(this.image).src);

			var self = this;
			gEBI(this.image).onclick = function()
			{
				self.show(self.url);
			};
		}
	}


	this.image = image;
	this.frame = gEBI(frame);
}