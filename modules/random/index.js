import * as THREE from "three";

class Random {
	static async Init() {
		var loader = new THREE.TextureLoader();

		var rad = Math.PI/180;

		var rows = 3;
		var columns = 6;
		var space = 360/columns;

		var s = 2;

		var video = document.createElement("video");

		video.autoplay = true;

		document.body.append(video);

		video.style.display = "none";

		var stream = await new Promise(function(resolve, reject) {
			navigator.getUserMedia({video: {facingMode: "environment"}, audio: false}, resolve, function() {});
		});

		video.srcObject = stream;

		await new Promise(function(resolve, reject) {
			video.onplay = resolve;
		});

		this.video = video;

		var geometry = new THREE.PlaneBufferGeometry(video.videoWidth/500, video.videoHeight/500);

		var texture = new THREE.VideoTexture(video);

		for (var c = 0; c < columns; c++) {
			for (var r = -Math.floor(rows/2); r < rows -Math.floor(rows/2); r++) {
				var material = new THREE.MeshStandardMaterial();

				// var texture = await new Promise(function(resolve, reject) {
				// 	loader.load("https://picsum.photos/" + 1920/4 + "/" + 1080/4 + "?v=" + Math.random(), resolve);
				// });

				material.map = texture;

				// texture.generateMipmaps = true;
				// texture.encoding = THREE.sRGBEncoding;

				var mesh = new THREE.Mesh(geometry, material);

				var cs = Math.sin(rad * c * space) * s;
				var cc = Math.cos(rad * c * space) * s;
				var rs = Math.sin(rad * r * space) * s;
				var rc = Math.cos(rad * r * space) * s;

				mesh.position.set(cc, rs, cs);

				mesh.lookAt(0, 0, 0);

				Scene.scene.add(mesh);
			}
		}
	}
}

window.Random = Random;

// Random.Init();