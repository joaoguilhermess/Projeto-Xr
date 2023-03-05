import {OrbitControls} from "three/addons/controls/OrbitControls.js";

class Orbit {
	static Init() {
		var controls = new OrbitControls(Scene.camera, Scene.renderer.domElement);
		controls.minDistance = 3;
		controls.maxDistance = 10;
		controls.enablePan = false;
		controls.target.set(0, 0, 0);
		controls.update();
	}
}

// Orbit.Init();