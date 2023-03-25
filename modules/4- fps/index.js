import * as THREE from "three";
import {Text} from "troika-three-text";

class FPS {
	static async Init() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide
		});

		var mesh = new Text();

		mesh.fontSize = 1;
		mesh.material = material;

		mesh.position.set(-1, 0, -2);
		mesh.lookAt(0, 0, 0);

		mesh.textAlign = "left";
		mesh.anchorX = "center";
		mesh.anchorY = "middle";

		mesh.sync();

		Scene.scene.add(mesh);

		var last = [];

		var v = new THREE.Vector3();

		Scene.addCallback(function() {
			var t = performance.now();

			while (last.length > 0 && last[0] <= t - 1000) {
				last.shift();
			}

			last.push(t);

			Scene.camera.getWorldDirection(v);

			mesh.position.set(v.x * 5, 0, v.z * 5);
			mesh.lookAt(0, 0, 0);
		});

		// setInterval(function() {
			// mesh.text = last.length;
		// }, 250);

		this.mesh = mesh;
	}
}

window.FPS = FPS;

FPS.Init();