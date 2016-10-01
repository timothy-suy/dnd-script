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

Map.prototype.render = function (game) {
	this.layers.forEach(function (layer) {
		layer.render(game.map, game.viewport, game.displaySetting);
	});
};