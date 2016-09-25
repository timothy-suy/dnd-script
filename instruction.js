function handleInstruction(type, data) {
	switch (type) {
		case 'moveViewport':
			moveViewPort(parseInt(data.value.x), parseInt(data.value.y));
			break;
		case 'changeViewport':
			moveViewPort(data.value);
			break;
	}
}