import * as THREE from "three";
import {Reflector} from "three/addons/objects/Reflector.js";

class Floor {
	static async Init() {
		var geometry = new THREE.PlaneBufferGeometry(5, 5);

		var mesh = new Reflector(geometry, {
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio,
			color: 0x404040
		})

		mesh.rotation.x = Math.PI/-2;

		this.mesh = mesh;

		Scene.scene.add(mesh);
	}
}

window.Floor = Floor;

// Floor.Init();