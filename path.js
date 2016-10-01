var Path = function (id, name, settings = null, pathParts = []) {
	this.id = id;
	this.name = name;
	this.pathParts = pathParts;
	this.settings = settings;
}

Path.prototype.setPathParts = function(pathParts) {
	this.pathParts = pathParts;
};

Path.prototype.addPathPart = function(pathPart) {
	this.pathParts.push(pathPart);
};

Path.prototype.setSettings = function(settings) {
	this.settings = settings;
};

Path.prototype.render = function(context) {
	if (this.settings.strokeStyle != null) {
		context.strokeStyle = this.settings.strokeStyle;
	}
	if (this.settings.fillStyle != null) {
		context.fillStyle = this.settings.fillStyle;
	}
	if (this.settings.lineWidth != null) {
		context.lineWidth = this.settings.lineWidth;
	}
	// ... TODO

	context.beginPath();
	this.pathParts.forEach(function (pathPart) {
		if (pathPart.type == 'move') {
			context.moveTo(pathPart.x, pathPart.y);
		}
		if (pathPart.type == 'line') {
			context.lineTo(pathPart.x, pathPart.y);
		}
		// ... TODO
	});

	if (this.settings.strokeStyle != null) {
		context.stroke();
	}
	if (this.settings.fillStyle != null) {
		context.fill();
	}
};