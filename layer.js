var Layer = function (id, name, zIndex, graphics = []) {
	this.id = id;
	this.name = name;
	this.zIndex = zIndex;
	this.graphics = graphics;

	if (document.contains(document.getElementById('layer_'+this.name))) {
		document.getElementById('layer_'+this.name).remove();
	} 

	var wrapperNode = document.createElement("DIV");
	wrapperNode.className = 'canvas_wrapper';
	wrapperNode.style.zIndex   = (this.zIndex);

	var canvasNode = document.createElement("CANVAS");
	canvasNode.id = 'layer_'+this.name;
	canvasNode.classList.add('layer');
	
	wrapperNode.appendChild(canvasNode);
	$('#content').append(wrapperNode);

	canvasNode.setAttributeNode(document.createAttribute("width"));
	canvasNode.setAttributeNode(document.createAttribute("height"));
	
	canvasNode.width 		  = window.state.map.width  * window.state.displaySetting.square.width;
	canvasNode.height 		  = window.state.map.height * window.state.displaySetting.square.height;

	canvasNode.style.position = 'absolute';
	canvasNode.style.width    = 1280 * window.state.map.width / window.state.viewport.width;
	canvasNode.style.height	  = 720 * window.state.map.height / window.state.viewport.height;
	canvasNode.style.top 	  = window.state.viewport.top;
	canvasNode.style.left 	  = window.state.viewport.left;
	canvasNode.style.zIndex   = (this.zIndex);
	
}

Layer.prototype.setGraphics = function(graphics) {
	this.graphics = graphics;
};

Layer.prototype.addGraphic = function(graphic) {
	this.graphics.push(graphic);
};

Layer.prototype.render = function () {
	this.graphics.forEach(function (graphic) {
		graphic.render(document.getElementById('layer_'+this.name));
	}.bind(this));
};