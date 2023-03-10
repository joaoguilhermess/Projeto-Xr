import * as THREE from "three";
import {Text} from "troika-three-text";

class Keyboard {
	static async Init() {
		this.background = new THREE.MeshBasicMaterial({
			color: 0x050505,
			side: THREE.DoubleSide
		});

		this.foreground = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide
		});

		this.geometry = {
			"1": new THREE.PlaneBufferGeometry(1, 1),
			"1.5": new THREE.PlaneBufferGeometry(1.5, 1),
			"2": new THREE.PlaneBufferGeometry(2, 1),
			"7": new THREE.PlaneBufferGeometry(7, 1)
		};

		this.keys = new THREE.Group();

		this.keys.position.set(0, -Math.sin(Math.PI/180 * 45), -Math.cos(Math.PI/180 * 45));
		this.keys.lookAt(0, 0, 0);

		this.loadMap();

		this.keys.scale.setScalar(0.065);

		Controler.addCallback(this.keys.children, function() {
			
		});

		Scene.scene.add(this.keys);
	}

	static loadMap() {
		var map = [
		[
			{name: "ESC", size: 1},
			{offset: 1},
			{name: "F1", size: 1},
			{name: "F2", size: 1},
			{name: "F3", size: 1},
			{name: "F4", size: 1},
			{offset: 0.5},
			{name: "F5", size: 1},
			{name: "F6", size: 1},
			{name: "F7", size: 1},
			{name: "F8", size: 1},
			{offset: 0.5},
			{name: "F9", size: 1},
			{name: "F10", size: 1},
			{name: "F11", size: 1},
			{name: "F12", size: 1}
		], [
			{name: "\"\n'", size: 1},
			{name: "!\n1", size: 1},
			{name: "@\n2", size: 1},
			{name: "#\n3", size: 1},
			{name: "$\n4", size: 1},
			{name: "%\n5", size: 1},
			{name: "¨\n6", size: 1},
			{name: "&\n7", size: 1},
			{name: "*\n8", size: 1},
			{name: "(\n9", size: 1},
			{name: ")\n0", size: 1},
			{name: "-\n_", size: 1},
			{name: "+\n=", size: 1},
			{name: "BackSpace", size: 2}
		], [
			{name: "TAB", size: 1.5},
			{name: "Q", size: 1},
			{name: "W", size: 1},
			{name: "E", size: 1},
			{name: "R", size: 1},
			{name: "T", size: 1},
			{name: "Y", size: 1},
			{name: "U", size: 1},
			{name: "I", size: 1},
			{name: "O", size: 1},
			{name: "P", size: 1},
			{name: "`\n´", size: 1},
			{name: "{\n[", size: 1},
			{name: "Enter", size: 1.5}
		], [
			{name: "CAPS", size: 1.5},
			{offset: 0.5},
			{name: "A", size: 1},
			{name: "S", size: 1},
			{name: "D", size: 1},
			{name: "F", size: 1},
			{name: "G", size: 1},
			{name: "H", size: 1},
			{name: "J", size: 1},
			{name: "K", size: 1},
			{name: "L", size: 1},
			{name: "Ç", size: 1},
			{name: "^\n~", size: 1},
			{name: "}\n]", size: 1}
		], [
			{name: "SHIFT", size: 1.5},
			{name: "|\n\\", size: 1},
			{name: "Z", size: 1},
			{name: "X", size: 1},
			{name: "C", size: 1},
			{name: "V", size: 1},
			{name: "B", size: 1},
			{name: "N", size: 1},
			{name: "M", size: 1},
			{name: "<\n,", size: 1},
			{name: ">\n.", size: 1},
			{name: ":\n;", size: 1},
			{name: "?\n/", size: 1},
			{name: "SHIFT", size: 1.5}
		], [
			{name: "CTRL", size: 1.5},
			{name: "WIN", size: 1},
			{name: "ALT", size: 1},
			{name: "SPACE", size: 7},
			{name: "ALT", size: 1},
			{name: "LIST", size: 1},
			{name: "WIN", size: 1},
			{name: "CTRL", size: 1.5}
		]];

		for (var r = 0; r < map.length; r++) {
			var offset = -15/2;

			for (var c = 0; c < map[r].length; c++) {
				var key = map[r][c];

				if (key.offset) {
					offset += key.offset;
				} else {
					this.add(key.size, key.name, offset, r);

					offset += key.size;
				}
			}
		}
	}

	static add(size, name, x, y) {
		var background = new THREE.Mesh(this.geometry[size], this.background);

		var text = new Text();

		text.fontSize = 0.25;
		text.material = this.foreground;

		text.anchorX = "center";
		text.anchorY = "middle";

		text.text = name;

		text.sync();

		var key = new THREE.Group();

		if (size > 1) {
			x += (size -1)/2;
		}

		x += 0.5;

		background.position.set(0, 0, 0);
		text.position.set(0, 0, 0.1);

		key.add(background);
		key.add(text);

		key.position.set(x, -y, 0);

		this.keys.add(key);
	}
}

window.Keyboard = Keyboard;

Keyboard.Init();