var Graphic = function (id, name, transformation = null, objects = []) {
	this.id = id;
	this.name = name;
	this.transformation = transformation;
	this.objects = objects;
}

Graphic.prototype.setTransformation = function(transformation) {
	this.transformation = transformation;
};

Graphic.prototype.setObjects = function(objects) {
	this.objects = objects;
};

Graphic.prototype.addObject = function(object) {
	this.objects.push(object);
};

Graphic.prototype.render = function(canvas) {
	var context = canvas.getContext("2d");
	context.save();
	//TODO: transformation
	this.objects.forEach(function (object) {
		object.render(context);
	});
	context.restore(); 
};