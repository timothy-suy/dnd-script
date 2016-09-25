function handleInstruction(type, data) {
	console.log('received instruction of type ' + type);
	switch (type) {
		case 'moveViewport':
			moveViewPort(parseInt(data.value.x), parseInt(data.value.y));
			break;
		case 'changeViewport':
			moveViewPort(data.value);
			break;
	}
}