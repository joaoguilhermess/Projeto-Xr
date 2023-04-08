const s = 5;

const scale = 1;

class Night {
	static async Init() {
		await this.loadSource();

		this.loadCanvas();

		this.loadVideo();

		this.loadMesh();

		var v = new THREE.Vector3();

		var context = this;
		Scene.addCallback(function() {
			Scene.camera.getWorldDirection(v);

			context.mesh.position.set(v.x * s, v.y * s, v.z * s);
			context.mesh.lookAt(0, 0, 0);
		});

		setInterval(function() {
			context.update();
		}, 1000/30);
	}

	static async loadSource() {
		var video = document.createElement("video");

		video.autoplay = true;
		video.style.display = "none";

		var stream = await new Promise(function(resolve, reject) {
			navigator.getUserMedia({video: {facingMode: "environment", height: {ideal: 1080}}, audio: false}, resolve, reject);
		});

		video.srcObject = stream;

		var track = stream.getVideoTracks()[0];

		await track.applyConstraints({
			advanced: [{exposureMode: "manual", exposureTime: 500}]
		});

		setTimeout(function() {
			console.log(JSON.stringify(track.getCapabilities(), null, "\t"));
			console.log(JSON.stringify(track.getSettings(), null, "\t"));
		}, 1000);

		await new Promise(function(resolve, reject) {
			video.onplay = resolve;
		});

		document.body.append(video);

		this.source = video;
	}

	static loadCanvas() {
		var parser = document.createElement("canvas");

		parser.width = this.source.videoWidth * scale;
		parser.height = this.source.videoHeight * scale;

		parser.style.display = "none";

		document.body.append(parser);

		this.parserContext = parser.getContext("2d", {antialias: false});
		this.parser = parser;
	}

	static loadVideo() {
		var video = document.createElement("video");

		video.autoplay = true;
		video.style.display = "none";

		var stream = this.parser.captureStream(30);
		// var stream = this.result.captureStream(30);

		video.srcObject = stream;

		document.body.append(video);

		this.video = video;
	}

	static loadMesh() {
		var geometry = new THREE.PlaneBufferGeometry(this.source.videoWidth/this.source.videoHeight * s, s);
		var material = new THREE.MeshBasicMaterial();
		var texture = new THREE.VideoTexture(this.video);

		material.map = texture;

		var mesh = new THREE.Mesh(geometry, material);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static buffer = [];

	static m = 60;

	static w = 4 * 64;

	static l = 5 + 2;

	static update() {
		this.parserContext.drawImage(this.source, 0, 0, this.source.videoWidth * scale, this.source.videoHeight * scale);

		var frame = this.parserContext.getImageData(0, 0, this.source.videoWidth * scale, this.source.videoHeight * scale);
		var clone = this.parserContext.getImageData(0, 0, this.source.videoWidth * scale, this.source.videoHeight * scale);

		var s = this.source.srcObject.getVideoTracks()[0].getSettings();

		for (var b = this.buffer.length -1; b > 0; b--) {

			var light = 0;

			for (var i = 0; i < frame.data.length; i += this.w) {
				light += frame.data[i] + frame.data[i + 1] + frame.data[i + 2];
			}

			light = Math.floor(light/(frame.data.length/this.w)/3);

			FPS.mesh.text = light + "|" + ((this.buffer.length -1) - b) + "|" + s.exposureTime + "ms";

			if (light > this.m) {
				break;
			} else {
				for (var i = 0; i < frame.data.length; i += 4) {
					frame.data[i + 1] += frame.data[i] + frame.data[i + 2] + this.buffer[b][i] + this.buffer[b][i + 1] + this.buffer[b][i + 2];
				}
			}
		}

		this.buffer.push(clone.data);

		if (this.buffer.length > this.l) {
			this.buffer.shift();
		}

		this.parserContext.putImageData(frame, 0, 0);
	}
}

window.Night = Night;

Night.Init();