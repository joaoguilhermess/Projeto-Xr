class Camera {
	static Init() {
		var context = this;
		Menu.loadButton("Camera", function() {
			context.start();
		}, function() {
			context.stop();
		});
	}

	static async start() {
		await this.loadSource();

		await this.loadMesh();
	}

	static stop() {
		var tracks = this.video.srcObject.getTracks();

		for (var i = 0; i < tracks.length; i++) {
			tracks[i].stop();
		}

		this.video.remove();

		this.mesh.geometry.dispose();

		this.mesh.material.map.dispose();

		this.mesh.material.dispose();

		Scene.scene.remove(this.mesh);
	}

	static async loadSource() {
		var stream = await new Promise(function(resolve, reject) {
			navigator.getUserMedia({
				video: {
					facingMode: "environment",
					height: 2160/2,
					width: 4096/2
				},
				audio: false
			}, resolve, reject);
		});

		var video = document.createElement("video");

		video.autoplay = true;
		video.style.display = "none";

		video.srcObject = stream;

		document.body.append(video);

		this.video = video;
	}

	static async loadMesh() {
		var context = this;
		await new Promise(function(resolve, reject) {
			context.video.onplaying = resolve;
		});

		var scale = 6;

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * scale, scale);

		var material = new THREE.MeshBasicMaterial();

		var texture = new THREE.VideoTexture(this.video);

		texture.encoding = THREE.sRGBEncoding;

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		var v = new THREE.Vector3();

		Scene.addCallback(function() {
			Scene.camera.getWorldDirection(v);

			var d = 4;

			mesh.position.set(v.x * d, v.y * d, v.z * d);
			mesh.lookAt(0, 0, 0);
		});

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}
}

window.Camera = Camera;

Camera.Init();