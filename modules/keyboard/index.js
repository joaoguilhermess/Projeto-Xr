import * as THREE from "three";
import {Text} from "troika-three-text";

class Keyboard {
	static Init() {
		var material = new THREE.MeshStandardMaterial({
			color: 0x000000,
			side: THREE.DoubleSide
		});

		var material2 = new THREE.MeshBasicMaterial({
			color: 0x404040,
			side: THREE.DoubleSide
		});

		var geometry = new THREE.PlaneBufferGeometry(2, 2);

		var group = new THREE.Group();

		var mesh = new THREE.Mesh(geometry, material);

		var mesh2 = new Text();

		// mesh2.font = "/resources/fonts/NotoSansMono.ttf";
		// mesh2.font = "/resources/fonts/NotoSansDisplay.ttf";
		mesh2.fontSize = 0.1;
		mesh2.material = material2;

		mesh2.textAlign = "left";
		mesh2.anchorX = "left";
		mesh2.anchorY = "0%";

		var anchor = 0;

		setInterval(function() {
			anchor += 0.1;

			anchor %= 100;

			mesh2.anchorY = anchor + "%";
		}, 1000/60);

		for (var i = 1; i <= 100; i++) {
			mesh2.text += "\n" + i + " isso é muito estranho credo mas pelo que parece funciona ";
		}

		mesh2.clipRect = [-1, -2, 2, 0];
		
		mesh2.lineHeight = 1;
		mesh2.maxWidth = 2;

		mesh2.position.set(-1, 1, 0.1);

		group.add(mesh);
		group.add(mesh2);

		// group.position.set(-6, 0, -4);
		// group.lookAt(0, 0, 0);

		// group.rotation.set(0, Math.PI/180 * 25, 0);
		group.position.set(1, 0, -6);

		this.mesh = mesh;
		this.mesh2 = mesh2;
		this.group = group;

		Scene.scene.add(group);
	}
}

window.Keyboard = Keyboard;

Keyboard.Init();