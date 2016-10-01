var DisplaySetting = function (id, name, width, height, qualityFactor, screenWidth, screenHeight) {
	this.id = id;
	this.name = name;
	this.width = width;
	this.height = height;
	this.qualityFactor = qualityFactor;
	this.square = new Square(1, 'default square', screenWidth / width * qualityFactor, screenHeight / height * qualityFactor);
}

//pre-loads all images, only executes callbacks when all are loaded (in correct order)
// function loadImages(sources, callback) {
	// var images = {};
	// var loadedImages = 0;
	// var numImages = 0;
	// for(var src in sources) {
		// numImages++;
	// }
	// for(var src in sources) {
		// images[src] = new Image();
		// images[src].onload = function() {
			// if(++loadedImages >= numImages) {
				// callback(images);
			// }
		// };
		// images[src].src = sources[src];
	// }
// }
