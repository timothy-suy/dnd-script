$(function () {
	window.connection = {
						};
	var socket = io('http://'+window.location.hostname+':3000');
	socket.on('display', function(message){
		if (typeof message.instruction !== 'undefined') {
			handleInstruction(message.instruction.type, message.instruction.data);
		}
	});
});