var Graphic = function (id, name, transformations = [], objects = []) {
	this.id = id;
	this.name = name;
	this.transformations = transformations;
	this.objects = objects;
}

Graphic.prototype.setTransformations = function(transformations) {
	this.transformations = transformations;
};

Graphic.prototype.addTransformation = function(transformation) {
	this.transformations.push(transformation);
};

Graphic.prototype.setObjects = function(objects) {
	this.objects = objects;
};

Graphic.prototype.addObject = function(object) {
	this.objects.push(object);
};

Graphic.prototype.render = function(layer) {
	var context = layer.getContext("2d");
	context.save();
	this.transformations.forEach(function (transformation) {
		transformation.apply(context);
	});
	this.objects.forEach(function (object) {
		object.render(context);
	});
	context.restore();
};