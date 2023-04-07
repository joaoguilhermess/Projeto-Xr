import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Movie {
	static async Init() {
		this.url = "/movie";

		this.loadMesh();

		await new Promise(function(resolve, reject) {
			Menu.loadButton("Movie", resolve);
		});

		this.loadUrl();

		await this.loadTexture();

		var context = this;
		setInterval(function() {
			localStorage.setItem("movie", context.video.currentTime);
		}, 1000/2);
	}

	static loadMesh() {
		var mesh = new THREE.Group();

		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		mesh.position.set(v.x, v.y, v.z * 3);
		mesh.lookAt(0, 0, 0);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static loadUrl() {
		var video = document.createElement("video");

		video.autoplay = false;
		video.muted = false;
		video.controls = true;
		video.preload = "auto";
		video.style.display = "none";

		video.src = this.url;

		document.body.append(video);

		this.video = video;
	}

	static async loadTexture() {
		var time = localStorage.getItem("movie");

		if (time == null) {
			time = 0;
		}

		this.video.play();

		var context = this;
		await new Promise(function(resolve, reject) {
			context.video.onplaying = resolve;

			context.video.currentTime = time;
		});

		// this.scale = 2.31;
		this.scale = 2;

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * this.scale, this.scale);

		var material = new THREE.MeshBasicMaterial();

		var texture = new THREE.VideoTexture(this.video);

		texture.encoding = THREE.sRGBEncoding;

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		this.mesh.add(mesh);
	}
}

window.Movie = Movie;

Movie.Init();