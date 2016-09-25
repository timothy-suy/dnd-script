function getMaps() {
	return [
		{id: 1},
	];
}

function getMap(id, force = false) {
	if ((typeof window.maps == 'undefined')) {
		window.maps = [];
	}
	if ((typeof window.maps[id] == 'undefined') || force) {
		window.maps[1] = {
			id: 1,
			name: 'map'+id,
			width: 80,
			height: 40,
			layers: [
				{id: 1},
				{id: 2},
				{id: 2},
			]
		};
	}
	return window.maps[id]
}

function renderMap(map) {
	const layers = getLayers(map.id)
	for (var i in layers) {
		renderLayer(getLayer(layers[i].id));
	}
}