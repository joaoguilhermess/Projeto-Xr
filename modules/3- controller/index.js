import * as THREE from "three";

class Controller {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		this.raycaster.ray.origin.set(0, 0, 0);

		this.callbacks = [];

		var offset = 0;

		var context = this;
		SocketIo.on("controller", function(data) {
			offset = data[3][2];

			context.addRay();
		}, function(data) {
			context.mesh.rotation.set(
				THREE.MathUtils.degToRad(data[3][0]),
				THREE.MathUtils.degToRad(-data[3][2] + offset),
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
			new THREE.Vector3(Math.sin(THREE.MathUtils.degToRad(45) * 0.05), Math.sin(THREE.MathUtils.degToRad(45) * 0.05), -2.5),
			new THREE.Vector3(0, 0, -2.5)
		]);

		var mesh = new THREE.Line(geometry, material);

		mesh.position.set(0, 0, 0);

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