var Map = function (id, name, width, height, layers = []) {
	this.id = id;
	this.name = name;
	this.width = width;
	this.height = height;
	this.layers = layers;
}

Map.prototype.setLayers = function(layers) {
	this.layers = layers;
};

Map.prototype.addLayer = function(layer) {
	this.layers.push(layer);
};

Map.prototype.render = function () {
	var imgCount = 0;
	var loadCount = 0;
	for(var src in window.state.images) {
		if (typeof window.state.images[src] === 'string') {
			imgCount++;
		}
	}

	Object.keys(window.state.images).forEach(function (source) {
		if (typeof source === 'string') {
			var img = new Image();
			img.onload = function() {
				window.state.images[source] = img;
				loadCount++;
				if (loadCount >= imgCount) {
					this.layers.forEach(function (layer) {
						layer.render();
					});
				}
			}.bind(this);
			img.onerror = function() 
			{
				console.log("Image failed!");
			};
			img.src = source;
		}
	}.bind(this));
};
