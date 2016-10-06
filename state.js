var State = function () {
	this.game = null;
	this.map = null;
	this.displaySetting = null;

	this.images = [];
	
	this.viewports = [];
	this.viewport = null;
	this.currentViewport = 0;
	
    this.init = function() {
		var socket = io('http://'+window.location.hostname+':3000');
		socket.on('display', function(message){
			if (typeof message.instruction !== 'undefined') {
				const instruction = new Instruction(message.instruction.type, message.instruction.data);
				instruction.handle();
			}
		});
    };
	this.init();
}

State.prototype.setGame = function(game) {
	this.game = game;
};

State.prototype.setMap = function(map) {
	this.map = map;
};

State.prototype.setDisplaySettings = function(displaySetting) {
	this.displaySetting = displaySetting;
};

State.prototype.addViewport = function(viewport) {
	this.viewports.push(viewport);
};

State.prototype.setCurrentViewport = function(viewport) {
	this.addViewport(viewport);
	this.viewport = viewport;
	canvasNodes = document.getElementsByClassName('layer')
	for (var i = 0; i < canvasNodes.length; ++i) {
		var canvasNode = canvasNodes[i];
		canvasNode.style.left 	  = -1 * viewport.left * this.displaySetting.square.width / this.displaySetting.qualityFactor;
		canvasNode.style.top 	  = -1 * viewport.top * this.displaySetting.square.height / this.displaySetting.qualityFactor;
		canvasNode.style.width    = 1280 * this.map.width  / viewport.width;
		canvasNode.style.height	  = 720  * this.map.height / viewport.height;
	}
	
};

State.prototype.addData = function(data) {
	if (typeof data.game !== 'undefined') {
		this.setGame(new Game(data.game.id, data.game.name));
	}
	if (typeof data.map !== 'undefined') {
		this.setMap(new Map(data.map.id, data.map.name, data.map.width, data.map.height));
	}
	if (typeof data.displaySettings !== 'undefined') {
		this.setDisplaySettings(new DisplaySetting(data.displaySettings.id, data.displaySettings.name, data.displaySettings.width, data.displaySettings.height, data.displaySettings.qualityFactor, data.displaySettings.screenWidth, data.displaySettings.screenHeight));
	}
	if (typeof data.viewports !== 'undefined') {
		data.viewports.forEach(function (viewport) {
			this.setCurrentViewport(new Viewport(viewport.id, viewport.name, viewport.top, viewport.left, viewport.width, viewport.height));
		}.bind(this));
	}
	if (typeof data.map.layers !== 'undefined') {
		data.map.layers.forEach(function (layer) {
			var tmpLayer = new Layer(layer.id, layer.name, layer.zIndex);
			if (typeof layer.graphics !== 'undefined') {
				layer.graphics.forEach(function (graphic) {
					var tmpGraphic = new Graphic();
					if (typeof graphic.transformations !== 'undefined') {
						var transformation = new Transformation();
							transformation.setTransformations(graphic.transformations);
						tmpGraphic.addTransformation(transformation);
					}
					if (typeof graphic.objects !== 'undefined') {
						graphic.objects.forEach(function (object) {
							if (object.type == 'picture') {
								var transformation = new Transformation();
									transformation.setTransformations(object.transformations);
								tmpGraphic.addObject(new Picture(object.url, transformation));
							}
							if (object.type == 'path') {
								//TODO: defaults
								var setting = new PathSetting(object.settings.strokeStyle, object.settings.fillStyle, object.settings.lineWidth);
								tmpGraphic.addObject(new Path(object.id, object.name, setting, object.path));
							}
						}.bind(this));
					}
					tmpLayer.addGraphic(tmpGraphic);
				}.bind(this));
			}
			window.state.map.addLayer(tmpLayer);
		}.bind(this));
	}
};

State.prototype.render = function() {
	this.map.render();
};

