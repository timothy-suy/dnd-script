/*
function getTransformations(graphicId, force = false) {
	if ((typeof window.maps.layers[layerdId].Transformations == 'undefined') || force) {
		//floor
		window.maps.layers[1].Transformations = [
		];
		//items
		window.maps.layers[2].Transformations = [
		];
		//grid
		window.maps.layers[3].Transformations = [
			{
				id: 1,
				name: 'square_0_0',
				transformation: getTransformation(1),
				object: getObject(1),
			},
		];
	};
	return window.maps.layers[layerdId].Transformations;
};

function getTransformation(id) {
	const state = getState();
	const layers = getLayers(state.currentMapId);
	for (var i in layers) {
		var layer = layers[i];
		for (var j in layer.Transformations) {
			var Transformation = layer.Transformations[j];
			if (Transformation.id == id)
				return Transformation;
		}
	}
}


function renderTransformation(context, Transformation) {
	context.save();
	for (var i in Transformation.transformation) {
		var transformation = Transformation.transformation[i];
		renderTransformation(context, transformation);
	}
	for (var i in Transformation.object) {
		var object = Transformation.object[i];
		renderObject(context, object);
	}
	context.restore();
}
*/