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

