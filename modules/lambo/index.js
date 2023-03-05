import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {RGBELoader} from "three/addons/loaders/RGBELoader.js";

// var s = 0.125;
var s = 1;

class Lambo {
	static async Init() {
		await this.loadHdr();

		await this.loadCar();

		// await this.loadGarage();
	}

	static async loadHdr() {
		var loader = new RGBELoader();

		var context = this;

		var texture = await new Promise(function(resolve, reject) {
			loader.load("/lan/1607958265982.equirectangular.e0f5d.hdr", resolve);
		});

		// texture.magFilter = THREE.LinearFilter;
		// texture.minFilter = THREE.LinearFilter;
		texture.generateMipmaps = true;
		texture.encoding = THREE.sRGBEncoding;
		texture.mapping = THREE.EquirectangularRefractionMapping;

		Scene.scene.environment = texture;

		this.hdr = texture;
	}

	static async loadCar() {
		var loader = new GLTFLoader();

		var car = await new Promise(function(resolve, reject) {
			loader.load("/lan/1607958265982.car.3df8c.gltf", resolve);
		});

		Scene.scene.add(car.scene);

		car.scene.position.set(-2, -1.6, -4);
		car.scene.scale.set(s, s, s);
		
		this.car = car;
	}

	static async loadGarage() {
		var loader = new GLTFLoader();

		var garage = await new Promise(function(resolve, reject) {
			loader.load("/lan/1607958265982.environment.e3f63.gltf", resolve);
		});
	
		Scene.scene.add(garage.scene);

		garage.scene.position.set(0, 0, 0);
		garage.scene.scale.set(s, s, s);

		this.garage = garage;
	}
}

window.Lambo = Lambo;

Lambo.Init();