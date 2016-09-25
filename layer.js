function getLayers(mapId) {
	return [
		{id: 1},
		{id: 2},
		{id: 3},
	];
}

function getLayer(id, force = false) {
	if ((typeof window.layers == 'undefined')) {
		window.layers = [];
	}
	if ((typeof window.layers[id] == 'undefined') || force) {
		window.layers[1] = {
			id: 1,
			name: 'floor',
			data: {}, //TODO
			zIndex: 100,
		};
		window.layers[2] = {
			id: 2,
			name: 'items',
			data: {}, //TODO
			zIndex: 200,
		};
		window.layers[3] = {
			id: 3,
			name: 'grid',
			data: {}, //TODO
			zIndex: 100,
		};
	}
	return window.layers[id]
}

function renderLayer(layer) {
	game = getGame();

	var wrapperNode = document.createElement("DIV");
	wrapperNode.className = 'canvas_wrapper';

	var canvasNode = document.createElement("CANVAS");
	canvasNode.id = layer.name;
	canvasNode.className = 'layer';
	
	wrapperNode.appendChild(canvasNode);
	$('#content').append(wrapperNode);

	canvasNode.setAttributeNode(document.createAttribute("width"));
	canvasNode.setAttributeNode(document.createAttribute("height"));
	
	canvasNode.style.position = 'absolute';
	canvasNode.style.width = (game.map.width * game.displaySetting.square.width)+'px';
	canvasNode.style.height = (game.map.height * game.displaySetting.square.height)+'px';
	canvasNode.style.zIndex = (layer.zIndex);
}