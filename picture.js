var Picture = function (name, transformation = new Transformation()) {
	this.name = name;
	this.transformation = transformation;
	if (typeof window.state.images[this.id] === 'undefined') {
		window.state.images[this.name] = this.name;
	}
}

Picture.prototype.setTransformations = function(transformations) {
	this.transformations = transformations;
};

Picture.prototype.addTransformation = function(transformation) {
	this.transformations.push(transformation);
};

Picture.prototype.render = function(context) {
	context.save();
	this.transformation.apply(context);
	context.drawImage(window.state.images[this.name], 0, 0);
	context.restore();
};