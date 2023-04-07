import * as THREE from "three";

class Scene {
	static callbacks = [];

	static Init() {
		var scene = new THREE.Scene();

		var clock = new THREE.Clock();

		scene.background = new THREE.Color(0x000000);

		// scene.fog = new THREE.Fog(0x000000, 0, 15);

		var light = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(light);

		var light2 = new THREE.HemisphereLight(0xeeeeee, 0x000000, 1);
		light2.position.set(0.5, 1, 0.75);
		scene.add(light2);

		var camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.5, 100);
		scene.add(camera);

		camera.position.set(0, 0, 0);
		// camera.lookAt(0, 0, 0);

		camera.lookAt(0, 0, 0);
		// camera.lookAt(-2, 0, -4);

		var renderer = new THREE.WebGLRenderer({antialias: false, powerPreference: "high-performance"});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		renderer.gammaFactor = 2;
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.physicallyCorrectLights = false;
		// renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMapping = THREE.noToneMapping;
		renderer.toneMappingExposure = 1;
		renderer.maxMorphTargets = 8;
		renderer.maxMorphNormals = 4;

		renderer.xr.enabled = true;
		renderer.xr.setReferenceSpaceType("local");

		document.body.appendChild(renderer.domElement);

		window.addEventListener("resize", function() {
			camera.aspect = window.innerWidth/window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		});

		var rad = Math.PI/180;

		var context = this;

		renderer.setAnimationLoop(function() {
			var delta = clock.getDelta();

			for (var i = 0; i < context.callbacks.length; i++) {
				try {
					context.callbacks[i](delta);
				} catch (e) {
					// console.error(e);
				}
			}

			renderer.render(scene, camera);
		});

		this.scene = scene;
		this.renderer = renderer;

		this.camera = camera;

		this.clock = clock;
	}

	static addCallback(fun) {
		this.callbacks.push(fun);
	}
}

window.THREE = THREE;
window.Scene = Scene;

Scene.Init();