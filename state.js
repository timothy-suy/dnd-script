function getState(force = false) {
	if ((typeof window.state == 'undefined') || force) {
		window.state = {};

		//TODO: get from api
		window.state.currentMapId = 1;

		const displaySettings = getDisplaySettings();
		const map = getMap(window.state.currentMapId);

		window.state.viewports = [
			{
				id: 1,
				name: '1:1',
				top: 0,
				left: 0,
				width: displaySettings.width,
				height: displaySettings.height,
			},
			{
				id: 2,
				name: 'overview',
				top: 0,
				left: 0,
				width: map.width,
				height: map.height,
			},
		];

		window.state.currentViewportId = 1;
	}
	return window.state;
}
