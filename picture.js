var Picture = function (name) {
	this.name = name;
	if (typeof window.state.images[this.id] === 'undefined') {
		window.state.images[this.name] = this.name;
	}
}

Picture.prototype.render = function(context) {
	context.drawImage(window.state.images[this.name], 0, 0); 
};