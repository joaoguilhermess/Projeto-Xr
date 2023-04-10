import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Movie {
	static Init() {
		var context = this;
		Menu.loadButton("Movie", function() {
			context.start();
		}, function() {
			context.stop();
		});
	}

	static start() {
		this.loadMesh();

		this.loadUrl("/movie");

		this.loadTexture();

		var context = this;
		this.interval = setInterval(function() {
			localStorage.setItem("movie", context.video.currentTime);
		}, 1000/2);
	}

	static stop() {	
		clearInterval(this.interval);

		this.video.remove();

		this.frame.geometry.dispose();

		this.frame.material.map.dispose();

		this.frame.material.dispose();

		Scene.scene.remove(this.frame);
		
		Scene.scene.remove(this.mesh);
	}

	static loadMesh() {
		var mesh = new THREE.Group();

		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		var d = 3;

		mesh.position.set(v.x * d, v.y * d, v.z * d);
		mesh.lookAt(0, 0, 0);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static loadUrl(url) {
		var video = document.createElement("video");

		video.autoplay = false;
		video.muted = false;
		video.controls = true;
		video.preload = "auto";
		video.style.display = "none";

		video.src = url;

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

		var scale = 2;

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * scale, scale);

		var material = new THREE.MeshBasicMaterial();

		var texture = new THREE.VideoTexture(this.video);

		texture.encoding = THREE.sRGBEncoding;

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		this.mesh.add(mesh);

		this.frame = mesh;
	}
}

window.Movie = Movie;

Movie.Init();