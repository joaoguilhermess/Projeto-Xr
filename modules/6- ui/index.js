import * as THREE from "three";
import {Text} from "troika-three-text";

class Ui {
	static Init() {
		this.Video = Video;
	}
}

class Video {
	constructor() {
		var video = document.createElement("video");

		video.autoplay = true;
		video.style.display = "none";

		document.body.append(video);

		this.video = video;
	}

	loadUrl(url) {
		this.video.src = url;
	
		this.video.load();
	}

	loadStream(stream) {
		this.video.srcObject = stream;

		this.video.load();
	}

	async loadMesh(scale = 1) {
		var context = this;
		await new Promise(function(resolve, reject) {
			context.video.onplay = resolve;
		});

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * scale, scale);
		var material = new THREE.MeshBasicMaterial();
		var texture = new THREE.VideoTexture(this.video);

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}
}

window.Ui = Ui;

Ui.Init();