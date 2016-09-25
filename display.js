//pre-loads all images, only executes callbacks when all are loaded (in correct order)

function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}

//render a shape on a specified canvas
function render(canvas, shape, settings) {
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
	shape.forEach(function (path) {
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

function renderGrid(canvas)
{
	var grid = [];

	for (X = 0; X <= (window.globals.squares.x + 1) * window.globals.qualityModifier.x; X = X + (1 * window.globals.qualityModifier.x))
	{
		grid.push({
				type: 'move', 
				x: Math.floor(X * window.globals.pixelsPerInch.x),
				y: 0,
			});
		grid.push({
				type: 'line',
				x: Math.floor(X * window.globals.pixelsPerInch.x),
				y: Math.floor((window.globals.squares.y * window.globals.qualityModifier.y+2) * window.globals.pixelsPerInch.y),
			});
	}
	
	for (Y = 0; Y <= (window.globals.squares.y + 1) * window.globals.qualityModifier.y; Y = Y + (1 * window.globals.qualityModifier.y))
	{
		grid.push({
				type: 'move', 
				x: 0,
				y: Math.floor(Y * window.globals.pixelsPerInch.y),
			});
		grid.push({
				type: 'line',
				x: Math.floor((window.globals.squares.x * window.globals.qualityModifier.x+2) * window.globals.pixelsPerInch.x),
				y: Math.floor(Y * window.globals.pixelsPerInch.y),
			});
	}
	render(canvas, grid, $.extend({}, {strokeStyle: "rgba(0, 0, 0, 0.75)", lineWidth: 1}));
}

function renderNumbers(canvas)
{
	var context = canvas.getContext("2d");
	context.font = 'italic 24pt Calibri';
	context.textAlign = 'center';
	context.fillStyle = 'rgba(0, 0, 0, 1)';
	for (var squareNumber = 0; squareNumber < (window.globals.squares.x * window.globals.squares.y); squareNumber++)
	{
		var x = (((squareNumber % (window.globals.squares.x))+ 0.5) * window.globals.pixelsPerInch.x * window.globals.qualityModifier.x);
		var y = ((Math.floor(squareNumber / (window.globals.squares.x)) + 0.5) * window.globals.pixelsPerInch.y * window.globals.qualityModifier.y) + 12;
		context.fillText(squareNumber, x, y);
	}
}

//viewport-related functions
function moveViewPort(x, y) {
	setViewPort(parseInt(window.state.position.x) + x, parseInt(window.state.position.y) + y);
}

function setViewPort(x, y) {
	grid = getGridDimensions();
	viewport = getViewportGridDimensions();

	window.state.position.x = Math.min(Math.max(0, x), grid.x - viewport.x - 1);
	window.state.position.y = Math.min(Math.max(0, y), grid.y - viewport.y - 1);

	$('.resizable').css('left', Math.floor(-1 * window.state.position.x * (window.globals.pixelsPerInch.x) / (window.globals.qualityModifier.x)));
	$('.resizable').css('top' , Math.floor(-1 * window.state.position.y * (window.globals.pixelsPerInch.y) / (window.globals.qualityModifier.y)));

	console.log('asked to set to viewport to (' + x + ', ' + y + '); setting to (' + window.state.position.x + ', ' + window.state.position.y + ')');
}

function zoomFullscreen() {
	$('.resizable').css('left', 0);
	$('.resizable').css('top', 0);
	$('.resizable').css('width', window.globals.viewport.x);
	$('.resizable').css('height', window.globals.viewport.y);
	window.state.stored_position.x = window.state.position.x;
	window.state.stored_position.y = window.state.position.y;
	window.state.position.x = 0;
	window.state.position.y = 0;
}

function zoomReal() {
	window.state.position.x = window.state.stored_position.x;
	window.state.position.y = window.state.stored_position.y;
	$('.resizable').css('left', window.state.position.x * window.globals.pixelsPerInch.x / window.globals.qualityModifier.x);
	$('.resizable').css('top', window.state.position.y * window.globals.pixelsPerInch.y / window.globals.qualityModifier.y);
	$('.resizable').css('width', window.globals.viewport.x * window.globals.qualityModifier.x);
	$('.resizable').css('height', window.globals.viewport.y * window.globals.qualityModifier.y);
					
	console.log(getGridDimensions());
	console.log(getViewportGridDimensions());
}

function getGridDimensions() {
	return {
		x: window.globals.squares.x + 1,
		y: window.globals.squares.y + 1
	};
}

function getViewportGridDimensions() {
	return {
		x: Math.floor(parseInt($('#grid').css('width')) / window.globals.pixelsPerInch.x * window.globals.qualityModifier.x),
		y: Math.floor(parseInt($('#grid').css('height')) / window.globals.pixelsPerInch.y * window.globals.qualityModifier.y)
	};
}
