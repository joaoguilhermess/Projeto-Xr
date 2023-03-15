import * as THREE from "three";

class Controller {
	static Init() {
		this.raycaster = new THREE.Raycaster();

		this.raycaster.ray.origin.set(0, 0, 0);

		this.callbacks = [];

		var context = this;

		// Scene.renderer.xr.getController(0).addEventListener("selectstart", function(event) {
			// alert(event);
		// });

		// Scene.renderer.domElement.addEventListener("click", async function(event) {
		// 	try {
		// 		var device = await navigator.bluetooth.requestDevice({
		// 			filters: [{name: "VR-PARK", services: [0x1812]}]
		// 		});
		// 			// acceptAllDevices: true,
		// 			// optionalServices: [0x1812]

		// 		var client = await device.gatt.connect();

		// 		var service = await client.getPrimaryService(0x1812);

		// 		alert(service);
		// 	} catch (e) {
		// 		alert(e);
		// 	}
		// });

		// Scene.renderer.xr.getController(0).addEventListener("selectstart", function(event) {
		// 	alert(context.Cast);
		// 	context.Cast();
		// });
	}

	static addCallback(list, callback) {
		this.callbacks.push({
			children: list,
			callback: callback 
		});
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