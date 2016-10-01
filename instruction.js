var Instruction = function (type, data) {
	this.type = type;
	this.data = data;
}

Instruction.prototype.handle = function() {
	switch (this.type) {
		case 'moveViewport':
			window.state.setCurrentViewport(new Viewport(
				window.state.viewport.id, 
				window.state.viewport.name, 
				Math.min(Math.max(0, window.state.viewport.top  + (this.data.value.y)), parseInt(window.state.map.height - window.state.viewport.height)), 
				Math.min(Math.max(0, window.state.viewport.left + (this.data.value.x)), parseInt(window.state.map.width  - window.state.viewport.width )), 
				window.state.viewport.width, 
				window.state.viewport.height
			));
			break;
		case 'zoom':
			switch(this.data.value) {
				case 'fullscreen':
					window.state.setCurrentViewport(new Viewport(
						window.state.viewport.id, 
						window.state.viewport.name, 
						0, 
						0, 
						window.state.map.width, 
						window.state.map.height
					));
					break;
				case 'real':
					//TODO: remember old position
					window.state.setCurrentViewport(new Viewport(
						window.state.viewport.id, 
						window.state.viewport.name, 
						0, 
						0, 
						window.state.displaySetting.width, 
						window.state.displaySetting.height
					));
					break;
			}
			break;
	}
}