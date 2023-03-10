import * as THREE from "three";

class Controler {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		raycaster.ray.origin.set(0, 0, 0);

		this.callbacks = [];

		var context = this;

		Scene.addCallback(function() {
			var v = new THREE.Vector3();

			Scene.camera.getWorldDirection(v);

			context.raycaster.ray.direction = v;

			var objects = context.raycaster.intersectObjects(Scene.scene.children);

			if (objects.length > 0) {
				for (var i = 0; i < context.callbacks.length; i++) {
					try {
						context.callbacks[i](objects[0]);
					} catch (e) {
						// console.error(e);
					}
				}
			}
		});
	}

	static addCallback(list, callback) {
		this.callbacks.push({
			children: list,
			callback: callback 
		});
	}
}

window.Controler = Controler;

Controler.Init();