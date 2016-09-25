function getViewports() {
	return [
		{id: 1},
		{id: 2},
	];
}

function getViewport(map, displaySetting, id) {
	if ((typeof window.viewports == 'undefined')) {
		window.viewports = [];
	}
	if ((typeof window.viewports[id] == 'undefined') || force) {
		window.viewports[1] = {
			id: 1,
			name: '1:1',
			top: 0,
			left: 0,
			width: displaySetting.width,
			height: displaySetting.height,
		};
		window.viewports[2] = {
			id: 2,
			name: 'overview',
			top: 0,
			left: 0,
			width: map.width,
			height: map.height,
		};
	}
	return window.viewports[id];
}

function renderViewport(viewport, displaySetting) {
	var layers = document.getElementsByClassName("layer");
	for (i = 0; i < layers.length; i++) {
		var layer = layers[i];
		layer.width 		= (viewport.width * displaySetting.square.width);
		layer.height 		= (viewport.height * displaySetting.square.height);
		layer.style.top 	= (viewport.top)+'px';
		layer.style.left 	= (viewport.left)+'px';
	}
}