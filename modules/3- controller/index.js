import * as THREE from "three";

const rad = Math.PI/180;

class Controller {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		this.raycaster.ray.origin.set(0, 0, 0);

		this.callbacks = [];

		var offset = [];

		var last = [];

		var context = this;
		SocketIo.on("controller", function(data) {
			offset[0] = data[3][0];
			offset[1] = data[3][1];
			offset[2] = data[3][2];

			context.addRay();
		}, function(data) {
			// data[3][0] -= offset[0];
			// data[3][1] -= offset[1];
			// data[3][2] -= offset[2];

			// for (var i = last.length -1; i >= 0; i--) {
			for (var i = 0; i < last.length; i++) {
				data[3][0] = (data[3][0] + last[i][0])/2;
				data[3][1] = (data[3][1] + last[i][1])/2;
				// data[3][2] = (data[3][2] + last[i][2])/2;
			}

			last.push([data[3][0], data[3][1], data[3][2]]);

			if (last.length > 4) {
				last.shift();
			}

			data[3][2] = Math.sin(data[3][1] * rad) * data[3][0] * window.innerWidth/window.innerHeight;
			data[3][0] = Math.cos(data[3][1] * rad) * data[3][0];

			FPS.mesh.text = data[3][0].toFixed(0) + " " + data[3][1].toFixed(0) + " " + data[3][2].toFixed(0);


			// data[3][0] = 0;

			// data[3][2] = 

			// data[3][2] = Math.round(data[3][1])/2;

			// 	var a = Math.min(data[3][2], last[i][2]);
			// 	var b = Math.max(data[3][2], last[i][2]);

			// 	var t = b - a;

			// 	if (t > 180) {
			// 		t = 360 - t;
			// 		t *= -1;
			// 	}

			// 	if (a == data[3][2]) {
			// 		t *= -1;
			// 	}

			// 	data[3][2] -= t/3;

			// 	if (data[3][2] > 360) {
			// 		data[3][2] -= 360;
			// 	}
			
			context.mesh.rotation.set(
				THREE.MathUtils.degToRad(data[3][0]),
				THREE.MathUtils.degToRad(-data[3][2]),
				THREE.MathUtils.degToRad(-data[3][1])
			);
		}, null);
	}

		// Scene.renderer.xr.getController(0).addEventListener("selectstart", function(event) {
			// alert(event);
		// });

	static addCallback(list, callback) {
		this.callbacks.push({
			children: list,
			callback: callback 
		});
	}

	static addRay() {
		var material = new THREE.LineBasicMaterial({
			color: 0xff2020
		});

		var geometry = new THREE.BufferGeometry();

		geometry.setFromPoints([
			new THREE.Vector3(0, 0, -2.5),
			new THREE.Vector3(-Math.sin(THREE.MathUtils.degToRad(45) * 0.05), Math.sin(THREE.MathUtils.degToRad(45) * 0.05), -2.5),
			new THREE.Vector3(Math.sin(THREE.MathUtils.degToRad(45) * 0.05),  Math.sin(THREE.MathUtils.degToRad(45) * 0.05), -2.5),
			new THREE.Vector3(0, 0, -2.5),
			new THREE.Vector3(0, 0, 0)
		]);

		var mesh = new THREE.Line(geometry, material);

		mesh.position.set(1, -0.5, 0);

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static Cast() {
		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		this.raycaster.ray.direction = v;

		var objects = this.raycaster.intersectObjects(Scene.scene.children);

		if (objects.length > 0) {
			for (var i = 0; i < this.callbacks.length; i++) {
				try {
					if (this.callbacks[i].children.includes(objects[0].object.parent)) {
						this.callbacks[i].callback(objects[0].object);
					}
				} catch (e) {
					// console.error(e);
				}
			}
		}
	}
}

window.Controller = Controller;

Controller.Init();