function getGame(force = false) {
	if ((typeof window.game == 'undefined') || force) {
		//TODO: get from API
		state = {mapId: 1, viewportId: 1, displaySettingId: 1};
		
		window.game = {};
		window.game.displaySetting = getDisplaySetting(state.displaySettingId);
		window.game.map = getMap(state.mapId);
		window.game.viewport = getViewport(window.game.map, window.game.displaySetting, state.viewportId);
	}
	return window.game;
}

function renderGame(game) {
	renderMap(game.map);
	renderViewport(game.viewport, game.displaySetting);
}
