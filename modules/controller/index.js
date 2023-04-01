import * as THREE from "three";

const rad = Math.PI/180;

class Controller {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		this.start();

		var context = this;
		Scene.renderer.xr.getController(0).addEventListener("selectstart", function() {
			context.click("left", "top");
		});

		document.body.addEventListener("click", function() {
			context.click("left", "top");
		});
	}

	static start() {
		var last = [];

		var offset = [];

		var context = this;
		SocketIo.on("controller", function(data) {
			offset = data;

			context.addRay();
		}, function(data) {
			if (offset[4][0] != data[4][0] || offset[4][1] != data[4][1] || offset[4][2] != data[4][2]) {
				if (data[4][0] == 0) {
					if (data[4][2] > 0) {
						if (data[4][1] < 0) {
							context.click("left", "top");
						} else {
							context.click("right", "top");
						}
					} else {
						if (data[4][1] < 0) {
							context.click("left", "bottom");
						} else {
							context.click("right", "bottom");
						}
					}
				}

				offset[4] = data[4];
			}

			if (data[3][2] > 180) {
				data[3][2] -= 360;
			}

			for (var i = 0; i < last.length; i++) {
				data[3][0] = (data[3][0] + last[i][0])/2;
				data[3][1] = (data[3][1] + last[i][1])/2;
				data[3][2] = (data[3][2] + last[i][2])/2;
			}

			last.push(data[3]);

			if (last.length >= 6) {
				last.shift();
			}
			
			context.mesh.rotation.set(
				THREE.MathUtils.degToRad(data[3][0]),
				THREE.MathUtils.degToRad(-data[3][2]),
				THREE.MathUtils.degToRad(-data[3][1])
			);
		}, null);
	}

	static addRay() {
		var material = new THREE.LineBasicMaterial({
			color: 0xff2020
		});

		var geometry = new THREE.BufferGeometry();

		var v = Math.sin(THREE.MathUtils.degToRad(45) * 0.075);

		geometry.setFromPoints([
			new THREE.Vector3(0, 0, -2.5),
			new THREE.Vector3(0, 0, -5),
			new THREE.Vector3(v, 0, -5),
			new THREE.Vector3(0, v, -5),
			new THREE.Vector3(-v, 0, -5),
			new THREE.Vector3(0, -v, -5),
			new THREE.Vector3(v, 0, -5),
			new THREE.Vector3(0, 0, -5),
			new THREE.Vector3(0, v, -5),
			new THREE.Vector3(0, 0, -5),
			new THREE.Vector3(-v, 0, -5),
			new THREE.Vector3(0, 0, -5),
			new THREE.Vector3(0, -v, -5),
			new THREE.Vector3(0, 0, -5)
		]);

		var mesh = new THREE.Line(geometry, material);

		mesh.position.set(1, -0.5, 0);

		Scene.scene.add(mesh);

		// Scene.camera.attach(mesh);

		this.mesh = mesh;
	}

	static cast() {
		var v = new THREE.Vector3();

		this.mesh.getWorldDirection(v);

		this.raycaster.ray.origin = this.mesh.position;
		this.raycaster.ray.direction = new THREE.Vector3(-v.x, -v.y, -v.z);

		var objects = this.raycaster.intersectObjects(Scene.scene.children, true);

		for (var i = 0; i < objects.length; i++) {
			if (objects[i].object.type != "Line") {
				var object = objects[i].object;

				while (object.parent != Scene.scene && object.parent != this.mesh) {
					object = object.parent;
				}

				return object;
			}
		}
	}

	static click(x, y) {
		if (x == "left" && y == "top") {
			var object = this.cast();

			if (object) {
				console.log(object);
			} 
		}

		if (x == "right" && y == "top") {
			console.log("UI.menu.open()")
		}
	}
}

window.Controller = Controller;

Controller.Init();