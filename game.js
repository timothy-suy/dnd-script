function Game 	(id, name, map = null, viewport = null, displaySetting = null) {
	this.id = id;
	this.name = name;
	this.map = map;
	this.viewport = viewport;
	this.displaySetting = displaySetting;
}

Game.prototype.render = function () {
	this.map.render(this);
}

Game.prototype.setMap = function (map) {
	this.map = map;
}

Game.prototype.setViewport = function (viewport) {
	this.viewport = viewport;

	canvasNodes = document.getElementsByClassName('layer')
	for (var i = 0; i < canvasNodes.length; ++i) {
		var canvasNode = canvasNodes[i];
		canvasNode.style.left 	  = -1 * this.viewport.left * this.displaySetting.square.width / this.displaySetting.qualityFactor;
		canvasNode.style.top 	  = -1 * this.viewport.top * this.displaySetting.square.height / this.displaySetting.qualityFactor;
		canvasNode.style.width    = 1280 * this.map.width  / this.viewport.width;
		canvasNode.style.height	  = 720  * this.map.height / this.viewport.height;
	}
}

Game.prototype.setDisplaySetting = function (displaySetting) {
	this.displaySetting = displaySetting;
}
