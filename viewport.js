function getViewport(id) {
	const state = getState();
	for (var i in state.viewports) {
		var viewport = state.viewports[i];
		if (viewport.id == id)
			return viewport;
	}
}
