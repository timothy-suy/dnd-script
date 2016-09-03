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
		context.strokeStyle = settings.strokeStyle;
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

function renderGrid(canvas, globals)
{
	var grid = [];

	var settings = {};
	settings.squares = 	{
							x: Math.floor(globals.viewport.x / globals.pixelsPerInch.x * globals.qualityModifier.x),
							y: Math.floor(globals.viewport.y / globals.pixelsPerInch.y * globals.qualityModifier.y),
						};
	settings.offset = 	{
							x1: 	Math.floor((globals.viewport.x * globals.qualityModifier.x - (settings.squares.x * globals.pixelsPerInch.x)) / 2),
							y1: 	Math.floor((globals.viewport.y * globals.qualityModifier.y - (settings.squares.y * globals.pixelsPerInch.y)) / 2),
						};
	for (X = 0; X <= settings.squares.x; X++)
	{
		grid.push({
				type: 'move', 
				x: Math.floor((settings.offset.x1 + (X * globals.pixelsPerInch.x))),
				y: Math.floor((settings.offset.y1)),
			});
		grid.push({
				type: 'line',
				x: Math.floor((settings.offset.x1 + (X * globals.pixelsPerInch.x))),
				y: Math.floor((settings.offset.y1 + (settings.squares.y * globals.pixelsPerInch.y))),
			});
	}
	
	for (Y = 0; Y <= settings.squares.y; Y++)
	{
		grid.push({
				type: 'move', 
				x: Math.floor((settings.offset.x1)),
				y: Math.floor((settings.offset.y1 + (Y * globals.pixelsPerInch.y))),
			});
		grid.push({
				type: 'line',
				x: Math.floor((settings.offset.x1 + (settings.squares.x * globals.pixelsPerInch.x))),
				y: Math.floor((settings.offset.y1 + (Y * globals.pixelsPerInch.y))),
			});
	}

	settings.offset.x2 = Math.floor((settings.offset.x1 + ((X-1) * globals.pixelsPerInch.x)));
	settings.offset.y2 = Math.floor((settings.offset.y1 + ((Y-1) * globals.pixelsPerInch.y)));
	
	render(canvas, grid, $.extend({}, {strokeStyle: "rgba(0, 0, 0, 0.75)", lineWidth: 1} , settings));
	
	return settings;
	//heel vuil, moet aprt bewerken of ophalen via API
}

function renderBorder(canvas, setttings)
{
	//border
	var context = canvas.getContext("2d");

	context.save(); 
	context.beginPath();
	context.moveTo(0, settings.offset.y1);
	context.lineTo(settings.offset.x1, settings.offset.y1);
	context.lineTo(settings.offset.x1, settings.offset.y2);
	context.lineTo(0, settings.offset.y2);
	context.closePath();
	var gradient = context.createLinearGradient(0, 0, settings.offset.x1, 0);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.beginPath();
	context.moveTo(settings.offset.x1, 0);
	context.lineTo(settings.offset.x1, settings.offset.y1);
	context.lineTo(settings.offset.x2, settings.offset.y1);
	context.lineTo(settings.offset.x2, 0);
	context.closePath();
	var gradient = context.createLinearGradient(0, 0, 0, settings.offset.y1);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.beginPath();
	context.moveTo(settings.offset.x1, settings.offset.y2);
	context.lineTo(settings.offset.x1, settings.globals.viewport.y * settings.globals.qualityModifier.y);
	context.lineTo(settings.offset.x2, settings.globals.viewport.y * settings.globals.qualityModifier.y);
	context.lineTo(settings.offset.x2, settings.offset.y2);
	context.closePath();
	var gradient = context.createLinearGradient(0, settings.globals.viewport.y * settings.globals.qualityModifier.y, 0, settings.offset.y2);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.beginPath();
	context.moveTo(settings.offset.x2, settings.offset.y1);
	context.lineTo(settings.globals.viewport.x * settings.globals.qualityModifier.x, settings.offset.y1);
	context.lineTo(settings.globals.viewport.x * settings.globals.qualityModifier.x, settings.offset.y2);
	context.lineTo(settings.offset.x2, settings.offset.y2);
	context.closePath();
	var gradient = context.createLinearGradient(settings.globals.viewport.x * settings.globals.qualityModifier.x, settings.globals.viewport.y * settings.globals.qualityModifier.y, settings.offset.x2, settings.globals.viewport.y * settings.globals.qualityModifier.y);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.scale(settings.offset.x1/100, settings.offset.y1/100); 
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(100, 0);
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.closePath();
    var gradient = context.createRadialGradient(100, 100, 100, 100, 100, 0);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.translate(settings.offset.x1 + settings.offset.x2, 0);
	context.scale(settings.offset.x1/100, settings.offset.y1/100); 
	context.rotate(2 * Math.PI / 360 * 90); 
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(100, 0);
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.closePath();
    var gradient = context.createRadialGradient(100, 100, 100, 100, 100, 0);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.translate(settings.offset.x1 + settings.offset.x2, settings.offset.y1 + settings.offset.y2);
	context.scale(settings.offset.x1/100, settings.offset.y1/100); 
	context.rotate(2 * Math.PI / 360 * 180); 
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(100, 0);
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.closePath();
    var gradient = context.createRadialGradient(100, 100, 100, 100, 100, 0);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 

	context.save(); 
	context.translate(0, settings.offset.y1 + settings.offset.y2);
	context.scale(settings.offset.x1/100, settings.offset.y1/100); 
	context.rotate(2 * Math.PI / 360 * 270); 
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(100, 0);
	context.lineTo(100, 100);
	context.lineTo(0, 100);
	context.closePath();
    var gradient = context.createRadialGradient(100, 100, 100, 100, 100, 0);
	gradient.addColorStop(0, "rgba(0, 0, 0, 1)");   
	gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
	context.fillStyle = gradient;
	context.fill();
	context.restore(); 
}

function renderNumbers(canvas)
{
	var context = canvas.getContext("2d");
	context.font = 'italic 24pt Calibri';
	context.textAlign = 'center';
	context.fillStyle = 'rgba(0, 0, 0, 1)';
	for (var squareNumber = 0; squareNumber < (settings.squares.x * globals.sizeModifier.x * settings.squares.y * globals.sizeModifier.y); squareNumber++)
	{
		var x = settings.offset.x1 + (((squareNumber % (settings.squares.x * globals.sizeModifier.x))+ 0.5) * globals.pixelsPerInch.x);
		var y = settings.offset.y1 + ((Math.floor(squareNumber / (settings.squares.x * globals.sizeModifier.x)) + 0.5) * globals.pixelsPerInch.y) + 12;	//12 = +- helft hoogte font
		context.fillText(squareNumber, x, y);
	}
}

//gamestate-related functions
function setPositionX(val) {
	state.position.x = Math.max(Math.min(0, val), (-1 * settings.squares.x * (globals.sizeModifier.x-1)));
	$('#background').css('left', state.position.x * globals.pixelsPerInch.x / globals.qualityModifier.x);
}

function setPositionY(val) {
	state.position.y = Math.max(Math.min(0, val), (-1 * settings.squares.y * (globals.sizeModifier.y-1)));
	$('#background').css('top', state.position.y * globals.pixelsPerInch.y / globals.qualityModifier.y);
}

