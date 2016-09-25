function getDisplaySetting(id, force = false) {
	if ((typeof window.displaySetting == 'undefined') || force) {
		window.displaySetting = {
			width: 40,
			height: 20,
			square: {
				width: 76,
				height: 76,
			},
		};
	}
	return window.displaySetting;
}

//pre-loads all images, only executes callbacks when all are loaded (in correct order)
function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}
