import {OrbitControls} from "three/addons/controls/OrbitControls.js";

class Orbit {
	static Init() {
		var controls = new OrbitControls(Scene.camera, Scene.renderer.domElement);
		controls.minDistance = 0.001;
		controls.maxDistance = 1;
		controls.enablePan = false;
		controls.target.set(0, 0, -1);
		
		controls.update();
	}
}

Orbit.Init();