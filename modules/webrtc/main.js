import SocketIo from "../../socketio.js";
import Util from "../../util.js";
import Server from "../../server.js";

var name = "webrtc";

export function Init() {
	Server.registryFile("/webrtc", Util.resolvePath("modules", "webrtc", "index.html"));
	
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