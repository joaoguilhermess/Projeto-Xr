import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Ui {
	static Init() {
		this.Video = Video;

		this.Text = Text;

		this.Main = Main;
		this.Main.Init();
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
		var mesh = new TroikaText();

		mesh.fontSize = 1;
		mesh.material = new THREE.MeshBasicMaterial({color: 0xffffff});

		mesh.textAlign = "left";
		mesh.anchorX = "center";
		mesh.anchorY = "middle";

		mesh.sync();

		Scene.scene.add(mesh);

		return mesh;
	}
}

class Main {
	static Init() {
		var mesh = new THREE.Group();

		Scene.scene.add(mesh);

		mesh.position.set(0, 0, -5);
		mesh.lookAt(0, 0, 0);

		this.mesh = mesh;

		this.addBackground();

		this.addMenu("Lambo 1");
	}

	static addBackground() {
		var geometry = new THREE.PlaneBufferGeometry(4, 2.5);

		var material = new THREE.MeshBasicMaterial({
			color: 0x030303,
			side: THREE.DoubleSide
		});

		var mesh = new THREE.Mesh(geometry, material);

		this.mesh.add(mesh);
	}

	static addMenu(name, x, y) {
		var geometry = new THREE.PlaneBufferGeometry(2, 1.25);

		var material = new THREE.MeshBasicMaterial({
			color: 0x060606
		});

		var material2 = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var menu = new THREE.Mesh(geometry, material);

		var title = new TroikaText();

		title.fontSize = 0.25;
		title.material = material2;

		title.textAlign = "left";

		title.anchorX = "left";
		title.anchorY = "middle";

		title.text = name;
		title.position.set(-0.9, 0, 0.2);

		menu.position.set(-1, 1.25/2, 0.1);

		menu.add(title);

		this.mesh.add(menu);
	}
}

window.Ui = Ui;

// Ui.Init();