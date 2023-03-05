import * as THREE from "three";

class Sky {
	static async Init() {
		this.createMesh();

		await this.loadMap();

		// await this.loadDepth();

		this.insertMesh();
	}

	static createMesh() {
		var geometry = new THREE.SphereBufferGeometry(5, 256, 256);

		var material = new THREE.MeshStandardMaterial({
			side: THREE.BackSide,
			displacementScale: -4.0
		});

		var mesh = new THREE.Mesh(geometry, material);
		
		this.mesh = mesh;
	}

	static async loadMap() {
		var texture = await new Promise(function(resolve, reject) {
			var loader = new THREE.TextureLoader();
			
			// loader.load("/resources/360/iss.jpg", resolve);
			loader.load("/resources/depth/texture.jpg", resolve);
		});
		texture.magFilter = THREE.LinearFilter;
		texture.minFilter = THREE.LinearFilter;
		texture.generateMipmaps = false;
		texture.encoding = THREE.sRGBEncoding;
		this.mesh.material.map = texture;

		texture.mapping = THREE.EquirectangularReflectionMapping;

		Scene.scene.environment = texture;
	}

	static async loadDepth() {
		var texture = await new Promise(function(resolve, reject) {
			var loader = new THREE.TextureLoader();
			
			loader.load("/resources/depth/depthmap.jpg", resolve);
		});
		texture.magFilter = THREE.LinearFilter;
		texture.minFilter = THREE.LinearFilter;
		texture.generateMipmaps = false;
		this.mesh.material.displacementMap = texture;
	}

	static insertMesh() {
		Scene.scene.add(this.mesh);
	}
}

window.Sky = Sky;

// Sky.Init();