import * as THREE from "three";

class Light {
	static Init() {
		// var light = new THREE.AmbientLight(0xffffff, 0.5);
		// Scene.scene.add(light);

		var light2 = new THREE.HemisphereLight(0xeeeeee, 0x000000, 1);
		light2.position.set(0.5, 1, 0.75);
		Scene.scene.add(light2);
	}
}

window.Light = Light;

Light.Init();