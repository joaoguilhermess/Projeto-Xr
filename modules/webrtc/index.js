class WebRtc {
	static Init() {
		var context = this;

		Menu.loadButton("Display", function() {
			context.start();
		}, function() {
			context.stop();
		});
	}

	static async start() {

	}

	static stop() {

	}

	static answer() {
		var peer = new RTCPeerConnection();

		var context = this;

		peer.onicecandidate = function(event) {
			console.log(event.candidate);
		};

		peer.ontrack = function(event) {
			context.video.srcObject = event.streams[0];
		};

		// peer.onconnectionstatechange = function(event) {
		// 	console.log("useless", event);
		// };

		// peer.onnegotiationneeded = function(event) {
		// 	console.log("useless", event);
		// };

		this.peer = peer;
	}

	static loadSource() {
		var video = document.createElement("video");

		video.autoplay = true;
		video.muted = true;
		video.style.display = "none";

		document.body.append(video);

		this.video = video;
	}

	static loadMesh() {
		var context = this;
		await new Promise(function(resolve, reject) {
			context.video.onplaying = resolve;
		});

		var scale = 2;

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * scale, scale);

		var material = new THREE.MeshBasicMaterial();

		var texture = new THREE.VideoTexture(this.video);

		texture.encoding = THREE.sRGBEncoding;

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		var d = 2;

		mesh.position.set(v.x * d, v.y * d, v.z * d);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}
}

window.WebRtc = WebRtc;

WebRtc.Init();