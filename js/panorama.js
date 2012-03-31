/*
OpenLinkMap Copyright (C) 2010 Alexander Matheisen
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it under certain conditions.
See http://wiki.openstreetmap.org/wiki/OpenLinkMap for details.
*/


function Panorama(frame, image)
{
	// shows the panorama
	this.show = function()
	{
		var self = this;

		this.frame.className = "panorama";
		this.panorama = new OpenLayers.Map(this.frameName);
		this.layer = new OpenLayers.Layer.Image(
			'Panorama',
			this.getSmallerPanorama(this.url),
			new OpenLayers.Bounds(-2500, -250, 2500, 250),
			new OpenLayers.Size(5000, 500),
			{numZoomLevels: 4}
		);
		this.panorama.addLayer(this.layer);
		this.panorama.zoomToMaxExtent();
		/*
		var fullscreenimg = gEBI("fullscreenImg");
		fullscreenimg.onclick = function()
		{
			self.hide();
		};
		fullscreenimg.title = translations['close'];
		gEBI("fullscreenClose").onclick = function()
		{
			self.hide();
		};
		*/
	}

	// hides the panorama
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
				self.show(this.url);
			};
		}
	}

	// returns the url to a smaller panorama image
	this.getSmallerPanorama = function(url)
	{
		var tmp = url+"/2000px-"+url.substr(url.lastIndexOf("/")+1);
		return tmp.replace("wikipedia/commons", "wikipedia/commons/thumb");
	}


	this.image = image;
	this.frameName = frame;
	this.frame = gEBI(frame);
}