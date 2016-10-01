var Layer = function (id, name, zIndex, graphics = []) {
	this.id = id;
	this.name = name;
	this.zIndex = zIndex;
	this.graphics = graphics;
}

Layer.prototype.setGraphics = function(graphics) {
	this.graphics = graphics;
};

Layer.prototype.addGraphic = function(graphic) {
	this.graphics.push(graphic);
};

Layer.prototype.render = function (map, viewport, displaySetting) {
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
	
	canvasNode.width 		  = map.width  * displaySetting.square.width;
	canvasNode.height 		  = map.height * displaySetting.square.height;

	canvasNode.style.position = 'absolute';
	canvasNode.style.width    = 1280 * map.width / viewport.width;
	canvasNode.style.height	  = 720 * map.height / viewport.height;
	canvasNode.style.top 	  = viewport.top;
	canvasNode.style.left 	  = viewport.left;
	canvasNode.style.zIndex   = (this.zIndex);
	
	this.graphics.forEach(function (graphic) {
		graphic.render(canvasNode);
	});
};