import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Ui {
	static Init() {
		this.Video = Video;

		this.Text = Text;

		this.PinnedText = PinnedText;

		this.Menu = Menu;

		this.Button = Button;
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

class Text {
	constructor() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var mesh = new TroikaText();

		mesh.fontSize = 1;
		mesh.material = material;

		mesh.textAlign = "left";
		mesh.anchorX = "center";
		mesh.anchorY = "middle";

		mesh.sync();

		Scene.scene.add(mesh);

		return mesh;
	}
}

class PinnedText {
	constructor(distance) {
		var mesh = new Ui.Text();

		var v = new THREE.Vector3();

		Scene.addCallback(function() {
			Scene.camera.getWorldDirection(v);

			mesh.position.set(v.x * distance, 0, v.z * distance);
			mesh.lookAt(0, 0, 0);
		});
		
		return mesh;
	}
}

class Menu {
	constructor() {
		
	}

	loadMesh() {

	}
}

class Button {
	constructor() {

	}

	loadMesh(height, width) {
		var geometry = new THREE.PlaneBufferGeometry(width, height);
	}
}

window.Ui = Ui;

Ui.Init();