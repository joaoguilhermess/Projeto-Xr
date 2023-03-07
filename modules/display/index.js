import * as THREE from "three";
import {Text} from "troika-three-text";

class Display {
	static async Init() {
		var mesh = new Text();

		mesh.fontSize = 1;
		mesh.color = 0xffffff;

		mesh.position.set(-2, -1.6 + 1.165, -4);
		mesh.lookAt(0, 0, 0);

		mesh.anchorX = "center";
		mesh.anchorY = "bottom";

		Scene.scene.add(mesh);

		var last = [];

		Scene.addFunction(function() {
			var t = performance.now();

			while (last.length > 0 && last[0] <= t - 1000) {
				last.shift();
			}

			last.push(t);

			mesh.text = last.length;

		});

		this.mesh = mesh;
	}
}

window.Display = Display;

Display.Init();