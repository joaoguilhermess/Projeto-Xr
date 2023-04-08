class Camera {
	static Init() {
		var context = this;
		Menu.loadButton("Camera", function() {
			context.start();
		});
	}

	static async start() {
		await this.loadSource();

		await this.loadMesh();
	}

	static async loadSource() {
		var stream = await new Promise(function(resolve, reject) {
			navigator.getUserMedia({video: {facingMode: "environment"}, audio: false}, resolve, reject);
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

		var scale = 5;

		var geometry = new THREE.PlaneBufferGeometry(this.video.videoWidth/this.video.videoHeight * scale, scale);

		var material = new THREE.MeshBasicMaterial();

		var texture = new THREE.VideoTexture(this.video);

		texture.encoding = THREE.sRGBEncoding;

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		var v = new THREE.Vector3();

		Scene.addCallback(function() {
			Scene.camera.getWorldDirection(v);

			mesh.position.set(v.x, v.y, v.z * 5);
			mesh.lookAt(0, 0, 0);
		});

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static stop() {
		this.video.remove();

		this.mesh.geometry.dispose();

		this.mesh.material.map.dispose();

		this.mesh.material.dispose();

		Scene.scene.remove(this.mesh);
	}
}

window.Camera = Camera;

Camera.Init();