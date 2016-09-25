function getMaps(force = false) {
	if ((typeof window.maps == 'undefined') || force) {
		window.maps = [
			{
				id: 1,
				name: 'map1',
				width: 60,
				height: 30,
				layers: [
					{
						id: 1,
						name: 'floor',
					},
					{
						id: 2,
						name: 'items',
					},
					{
						id: 3,
						name: 'grid',
					},
				],
			}
		];
	};
	return window.maps;
};

function getMap(id) {
	const maps = getMaps();
	for (var i in maps) {
		var map = maps[i];
		if (map.id == id)
			return map;
	}
}

function renderMap() {
	const state = getState();
	const map = getMap(state.currentMapId)
	const displaySettings = getDisplaySettings();
	const viewport = getViewport(state.currentViewportId);

	for (var i in map.layers) {
		const layer = map.layers[i];

		var wrapperNode = document.createElement("DIV");
		wrapperNode.className = 'canvas_wrapper';

		var canvasNode = document.createElement("CANVAS");
		canvasNode.id = layer.name;
		canvasNode.className = 'layer';
		
		var widthNode = document.createAttribute("width");
		widthNode.value = (viewport.width * displaySettings.square.width);
		canvasNode.setAttributeNode(widthNode);
		
		var heightNode = document.createAttribute("height");
		heightNode.value = (viewport.height * displaySettings.square.height);
		canvasNode.setAttributeNode(heightNode);
		
		canvasNode.style.position = 'absolute',
		canvasNode.style.top = (viewport.top)+'px',
		canvasNode.style.left = (viewport.left)+'px',
		canvasNode.style.width = (map.width * displaySettings.square.width)+'px',
		canvasNode.style.height = (map.height * displaySettings.square.height)+'px',
		canvasNode.style.zIndex = (i * 100),
		
		wrapperNode.appendChild(canvasNode);
		$('#content').append(wrapperNode);
	}
}