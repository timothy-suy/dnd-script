var DisplaySetting = function (id, name, width, height, qualityFactor, screenWidth, screenHeight) {
	this.id = id;
	this.name = name;
	this.width = width;
	this.height = height;
	this.qualityFactor = qualityFactor;
	this.square = new Square(1, 'default square', screenWidth / width * qualityFactor, screenHeight / height * qualityFactor);
}