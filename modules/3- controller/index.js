import * as THREE from "three";

const rad = Math.PI/180;

class Controller {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		this.raycaster.ray.origin.set(0, 0, 0);

		this.callbacks = [];

		var last = [];

		var context = this;
		SocketIo.on("controller", function(data) {
			context.addRay();
		}, function(data) {
			data[3][1] = 0;

			if (data[3][2] > 180) {
				data[3][2] -= 360;
			}

			for (var i = 0; i < last.length; i++) {
				data[3][0] = (data[3][0] + last[i][0])/2;
				// data[3][1] = (data[3][1] + last[i][1])/2;
				data[3][2] = (data[3][2] + last[i][2])/2;
			}

			last.push(data[3]);

			if (last.length >= 10) {
				last.shift();
			}

			FPS.mesh.text = data[3][0].toFixed(1) + "\n" + data[3][1].toFixed(1) + "\n" + data[3][2].toFixed(1);

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