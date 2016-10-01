function handleInstruction(type, data) {
	switch (type) {
		case 'moveViewport':
			window.game.setViewport(new Viewport(
				window.game.viewport.id, 
				window.game.viewport.name, 
				Math.min(Math.max(0, window.game.viewport.top  + (data.value.y)), parseInt(window.game.map.height - window.game.viewport.height)), 
				Math.min(Math.max(0, window.game.viewport.left + (data.value.x)), parseInt(window.game.map.width  - window.game.viewport.width )), 
				window.game.viewport.width, 
				window.game.viewport.height
			));
			break;
		case 'zoom':
			switch(data.value) {
				case 'fullscreen':
					window.game.setViewport(new Viewport(
						window.game.viewport.id, 
						window.game.viewport.name, 
						0, 
						0, 
						window.game.map.width, 
						window.game.map.height
					));
					break;
				case 'real':
					//TODO: remember old position
					window.game.setViewport(new Viewport(
						window.game.viewport.id, 
						window.game.viewport.name, 
						0, 
						0, 
						window.game.displaySetting.width, 
						window.game.displaySetting.height
					));
					break;
			}
			break;
	}
}