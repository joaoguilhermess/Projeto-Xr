import * as THREE from "three";

class Light {
	static Init() {
		// var light = new THREE.AmbientLight(0xffffff, 1);
		// scene.add(light);

		var light = new THREE.HemisphereLight(0xeeeeee, 0x000000, 0.75);
		light.position.set(0.5, 1, 0.75);
		Scene.scene.add(light);
	}
}

window.Light = Light;

Light.Init();