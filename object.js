var Object = function (id, name, settings = null, drawables = []) {
	this.id = id;
	this.name = name;
	this.drawables = drawables;
	this.settings = settings;
}

Object.prototype.setDrawables = function(drawables) {
	this.drawables = drawables;
};

Object.prototype.addDrawable = function(drawable) {
	this.drawables.push(drawable);
};

Object.prototype.setSettings = function(settings) {
	this.settings = settings;
};

Object.prototype.render = function(context) {
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
	this.drawables.forEach(function (drawable) {
		if (drawable.type == 'move') {
			context.moveTo(drawable.x, drawable.y);
		}
		if (drawable.type == 'line') {
			context.lineTo(drawable.x, drawable.y);
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