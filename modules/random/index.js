import * as THREE from "three";

class Random {
	static async Init() {
		var loader = new THREE.TextureLoader();

		var geometry = new THREE.PlaneBufferGeometry(1, 1);

		var l = 8;

		for (var k = -1; k < 2; k++) {
			for (var i = 0; i < l; i++) {
				var material = new THREE.MeshStandardMaterial();

				var texture = await new Promise(function(resolve, reject) {
					loader.load("https://picsum.photos/256?v=" + Math.random(), resolve);
				});

				material.map = texture;

				texture.generateMipmaps = true;
				texture.encoding = THREE.sRGBEncoding;

				var mesh = new THREE.Mesh(geometry, material);

				var j = 360/l;

				var rad = Math.PI/180;

				var t = Math.sin(rad * k * j);
				var t2 = Math.cos(rad * k * j);

				var r = l * 0.25;

				mesh.position.set(Math.sin(rad * i * j) * r * t2, r * t, Math.cos(rad * i * j) * r);

				console.log(mesh.position.x, mesh.position.y, mesh.position.z);

				mesh.lookAt(0, 0, 0);

				Scene.scene.add(mesh);
			}
		}
	}
}

window.Random = Random;

Random.Init();