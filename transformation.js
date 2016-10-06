var Transformation = function (id, name, transformations = []) {
	this.id = id;
	this.name = name;
	this.transformations = transformations;
}

Transformation.prototype.setTransformations = function(transformations) {
	this.transformations = transformations;
};

Transformation.prototype.addTransformation = function(transformation) {
	this.transformations.push(transformation);
};

Transformation.prototype.apply = function(context) {
	this.transformations.forEach(function (transformation) {
		if (transformation.type == 'scale') {
			context.scale(transformation.x, transformation.y);
		}
		if (transformation.type == 'translate') {
			context.translate(transformation.x, transformation.y);
		}
		if (transformation.type == 'rotate') {
			context.rotate(2 * Math.PI / 360 * transformation.degrees);
		}
	});
}

