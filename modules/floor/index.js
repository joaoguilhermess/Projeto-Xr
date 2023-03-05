import * as THREE from "three";
import {Reflector} from "three/addons/objects/Reflector.js";

class Floor {
	static async Init() {
		var geometry = new THREE.PlaneGeometry(1000, 1000);

		var mesh = new Reflector(geometry, {
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio
		});

		mesh.position.set(0, -1.6, 0);

		mesh.rotation.x = Math.PI/-2;

		this.mesh = mesh;

		Scene.scene.add(mesh);
	}
}

window.Floor = Floor;

// Floor.Init();