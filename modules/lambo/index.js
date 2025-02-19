import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {RGBELoader} from "three/addons/loaders/RGBELoader.js";

// var s = 0.125;
var s = 1;
// var s = 1/18;

class Lambo {
	static async Init() {
		await this.loadHdr();

		await this.loadCar();

		// this.spin();

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

		car.scene.position.set(-3, -1.6, -1);
		car.scene.scale.set(s, s, s);

		Scene.scene.add(car.scene);

		this.car = car;
	}

	static async spin() {
		var context = this;
		Scene.addCallback(function(delta) {
			var r = delta/(60/2) * Math.PI;
			
			if (r != Infinity) {
				context.car.scene.rotation.y -= r;
			}
		});
	}

	static async loadGarage() {
		var loader = new GLTFLoader();

		var garage = await new Promise(function(resolve, reject) {
			loader.load("/lan/1607958265982.environment.e3f63.gltf", resolve);
		});
	
		garage.scene.position.set(-2, -1.6, -4);
		garage.scene.scale.set(s, s, s);

		Scene.scene.add(garage.scene);

		this.garage = garage;
	}
}

window.Lambo = Lambo;

Lambo.Init();