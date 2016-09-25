function getGraphics(mapId, layerId, force = false) {
	getLayers(mapId);
	if ((typeof window.maps[mapId].layers[layerId].graphics == 'undefined') || force) {
		//floor
		window.maps[mapId].layers[layerId].graphics = [
		];
		//items
		window.maps[mapId].layers[layerId].graphics = [
		];
		//grid
		window.maps[mapId].layers[layerId].graphics = [
			{
				id: 1,
				name: 'square_0_0',
				transformation: getTransformation(1),
				object: getObject(1),
			},
		];
	};
	return window.maps[mapId].layers[layerId].graphics;
};

function getGraphic(id) {
	const game = getgame();
	const layers = getLayers(game.currentmapId);
	for (var i in layers) {
		var layer = layers[i];
		for (var j in layer.graphics) {
			var graphic = layer.graphics[j];
			if (graphic.id == id)
				return graphic;
		}
	}
}


function renderGraphic(context, graphic) {
	context.save();
	for (var i in graphic.transformation) {
		var transformation = graphic.transformation[i];
		renderTransformation(context, transformation);
	}
	for (var i in graphic.object) {
		var object = graphic.object[i];
		renderObject(context, object);
	}
	context.restore();
}


//render a object on a specified canvas
function render(canvas, object, settings) {
	//get context
	var context = canvas.getContext("2d");

	//save old context
	context.save(); 

	var stroke = false;
	var fill = false;
	//apply settings
	if (settings.hasOwnProperty('strokeStyle')) {
		context.strokeStyle = window.globals.strokeStyle;
		stroke = true;
	}
	if (settings.hasOwnProperty('fillStyle')) {
		fill = true;
	}
	if (settings.hasOwnProperty('lineWidth')) {
		context.lineWidth = settings.lineWidth;
	}
	//... TODO

	context.beginPath();
	object.forEach(function (path) {
		if (path.type == 'move') {
			context.moveTo(path.x, path.y);
		}
		if (path.type == 'line') {
			context.lineTo(path.x, path.y);
		}
		//... TODO
	});

	//stroke
	if (stroke) {
		context.stroke();
	}
	//fill
	if (fill) {
		context.fillStyle = settings.fillStyle;
		context.fill();
	}

	//restore context to before
	context.save(); 
	return;
}

