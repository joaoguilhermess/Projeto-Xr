import * as THREE from "three";
import {Text as TroikaText} from "troika-three-text";

class Menu {
	static Init() {
		this.loadMesh();

		this.loadBackground();
		this.loadBackgroundLine();

		this.loadTitle();

		this.loadClock();
	}

	static loadMesh() {
		var mesh = new THREE.Group();

		var v = new THREE.Vector3();

		Scene.camera.getWorldDirection(v);

		mesh.position.set(v.x, v.y, v.z * 2);
		mesh.lookAt(0, 0, 0);

		Scene.scene.add(mesh);

		this.mesh = mesh;
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
			color: 0x200505
		});

		// var i = 0;

		// setInterval(function() {
			// i += 1/1/30;

			// material.color.setHSL(i, 0.84, 0.13);

			// i %= 1;
		// }, 1000/30);

		var geometry = new THREE.BufferGeometry();

		var v0 = 0.01;

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

		mesh.position.set(0, 0, 0.1);

		this.mesh.add(mesh);
	}

	static loadTitle() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var text = new TroikaText();

		text.font = "/resources/fonts/Montserrat-Light.ttf";
		text.fontSize = 0.075;

		text.material = material;

		text.textAlign = "left";
		text.anchorX = "left";
		text.anchorY = "top";

		text.text = "Projeto Xr";

		text.lineHeight = 1;

		text.position.set(-0.7, 0.475, 0.01);

		text.sync();

		this.mesh.add(text);
	}

	static loadClock() {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff
		});

		var text = new TroikaText();

		text.font = "/resources/fonts/Inter-SemiBold.ttf";
		text.fontSize = 0.15;

		text.material = material;

		setInterval(function() {
			var d = new Date();

			console.log(d.getHours() + ":" + d.getMinutes());

			// console.log(new Date());
		}, 1000 * 60);
	}
}

window.Menu = Menu;

Menu.Init();