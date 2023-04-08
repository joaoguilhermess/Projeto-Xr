import SocketIo from "../../socketio.js";

var name = "webrtc";

export function Init() {
	SocketIo.registry("webrtc");

	SocketIo.on("offer", function(offer) {
		console.log(offer);
	});

	SocketIo.on("answer", function(answer) {
		console.log(answer);
	});
	
	SocketIo.on("icecandidate", function(icecandidate) {
		console.log(icecandidate);
	});
}