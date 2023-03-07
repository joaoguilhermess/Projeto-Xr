import * as THREE from "three";

SocketIo.on("reload", null, function() {
	console.log("reload");

	setTimeout(function() {
		window.location.reload();
	}, 1000);
}, null);