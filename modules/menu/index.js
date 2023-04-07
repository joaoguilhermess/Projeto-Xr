import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Menu {
	static Init() {
		this.loadMesh();

		this.toggle();

		this.updatePosition();

		this.loadBackground();
		this.loadBackgroundLine();

		this.loadTop();

		this.loadTitle();

		this.loadClock();

		this.loadMiddle();
	}

	static toggle() {
		Menu.mesh.visible = !Menu.mesh.visible;

		this.updatePosition();
	}

	static loadMesh() {
		var mesh = new THREE.Group();

		Scene.scene.add(mesh);

		this.mesh = mesh;
	}

	static updatePosition() {
		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		this.mesh.position.set(v.x, v.y, v.z * 2);
		this.mesh.lookAt(0, 0, 0);
	}

	static loadBackground() {
		var geometry = new THREE.PlaneBufferGeometry(1.5, 1);

		// var x = 4/2;
		// var y = 2.5/2;
		// var r = 0.25;

		// var shape = new THREE.Shape();

		// shape.lineTo(-x, y - r);
		// shape.quadraticCurveTo(-x, y, -x + r, y);
		// shape.lineTo(x - r, y);
		// shape.quadraticCurveTo(x, y, x, y - r);
		// shape.lineTo(x, -y + r);
		// shape.quadraticCurveTo(x, -y, x - r, -y);
		// shape.lineTo(-x + r, -y);
		// shape.quadraticCurveTo(-x, -y, -x, -y + r);
		// shape.lineTo(-x, y - r);

		// var geometry = new THREE.ShapeBufferGeometry(shape);

		var material = new THREE.MeshBasicMaterial({
			color: 0x030303,
			side: THREE.DoubleSide
		});

		var mesh = new THREE.Mesh(geometry, material);

		this.mesh.add(mesh);
	}

	static loadBackgroundLine() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xff2424
		});

		// var i = 0;

		// setInterval(function() {
			// i += 1/1/30;

			// material.color.setHSL(i, 0.84, 0.13);

			// i %= 1;
		// }, 1000/30);

		var geometry = new THREE.BufferGeometry();

		var v0 = 0.025;

		var v1 = 0.75 + v0;
		var v2 = 0.5 + v0;

		geometry.setFromPoints([
			new THREE.Vector3(-v1, v2, 0),
			new THREE.Vector3(v1, v2, 0),
			new THREE.Vector3(v1, -v2, 0),
			new THREE.Vector3(-v1, -v2, 0),
			new THREE.Vector3(-v1, v2, 0)
		]);

		var mesh = new THREE.Line(geometry, material);

		mesh.position.set(0, 0, 0.05);

		this.mesh.add(mesh);
	}

	static loadTop() {
		var mesh = new THREE.Group();

		mesh.position.set(0, 0.415, 0.1);

		this.mesh.add(mesh);

		this.top = mesh;
	}

	static loadTitle() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var text = new TroikaText();

		text.font = "/resources/fonts/Inter-Regular.ttf";
		text.fontSize = 0.075;

		text.material = material;

		text.textAlign = "left";
		text.anchorX = "left";
		text.anchorY = "middle";

		text.lineHeight = 1;

		text.text = "Projeto Xr";

		text.position.set(-0.675, 0, 0);

		text.sync();

		this.top.add(text);
	}

	static loadClock() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var text = new TroikaText();

		text.font = "/resources/fonts/Inter-SemiBold.ttf";
		text.fontSize = 0.04;

		text.material = material;

		text.textAlign = "center";
		text.anchorX = "right";
		text.anchorY = "middle";

		text.position.set(0.675, 0, 0);

		text.sync();

		this.top.add(text);

		var a = Date.now();

		var b = a.toString();

		b = b.slice(0, -3);

		b = parseInt(b);

		b += 1;

		b = b.toString();

		b += "000";

		b = parseInt(b);

		var c = b - a;

		setTimeout(function() {
			setInterval(function() {
				var d = new Date();

				var a = d.getHours().toString();

				while (a.length < 2) {
					a = "0" + a;


				}

				var b = d.getMinutes().toString();

				while (b.length < 2) {
					b = "0" + b;
				}

				var c = d.getSeconds().toString();

				while (c.length < 2) {
					c = "0" + c;
				}

				text.text = a + ":" + b + ":" + c;
			});
		}, c);
	}

	static loadMiddle() {
		var mesh = new THREE.Group();

		mesh.position.set(0, 0.15, 0.1);

		this.mesh.add(mesh);

		this.middle = mesh;
	}

	static loadButton(name, callback) {
		var shape = new THREE.Shape();

		var x = 0.3/2;
		var y = 0.2/2;
		var r = 0.025;

		shape.lineTo(-x, y -r);
		shape.quadraticCurveTo(-x, y, -x + r, y);
		shape.lineTo(x - r, y);
		shape.quadraticCurveTo(x, y, x, y - r);
		shape.lineTo(x, -y + r);
		shape.quadraticCurveTo(x, -y, x - r, -y);
		shape.lineTo(-x + r, -y);
		shape.quadraticCurveTo(-x, -y, -x, -y + r);
		shape.lineTo(-x, y - r);

		var geometry = new THREE.ShapeBufferGeometry(shape);

		// var geometry = new THREE.PlaneBufferGeometry(0.2, 0.2);

		var material = new THREE.MeshBasicMaterial({
			color: 0x070707
		});

		var material2 = new	THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var mesh = new THREE.Mesh(geometry, material);

		var text = new TroikaText();

		text.font = "/resources/fonts/Inter-Regular.ttf";
		text.fontSize = 0.05;

		text.textAlign = "center";
		text.anchorX = "center";
		text.anchorY = "middle";

		text.material = material2;

		text.lineHeight = 1;

		text.text = name;

		text.sync();

		text.position.set(0, 0, 0.01);

		if (!this.buttons) {
			this.buttons = [];
		}

		this.buttons.push(mesh);

		console.log();

		mesh.position.set(-1 + (this.buttons.length - Math.floor((this.buttons.length - 1)/3) * 3) * 0.5, -0.235 * Math.floor((this.buttons.length - 1)/3), 0);
		// mesh.position.set(px, py, 0);

		mesh.add(text);

		mesh.userData.onclick = function() {
			callback(mesh);
		};

		this.middle.add(mesh);
	}
}

window.Menu = Menu;

Menu.Init();