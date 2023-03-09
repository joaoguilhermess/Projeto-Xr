import * as THREE from "three";

class Scene {
	static functions = [];

	static Init() {
		var scene = new THREE.Scene();

		var clock = new THREE.Clock();

		scene.background = new THREE.Color(0x000000);

		// scene.fog = new THREE.Fog(0x000000, 0, 15);

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
			renderer.render(scene, camera);

			var delta = clock.getDelta();

			for (var i = 0; i < context.functions.length; i++) {
				try {
					context.functions[i](delta);
				} catch (e) {
					// console.error(e);
				}
			}
		});

		this.scene = scene;
		this.renderer = renderer;

		this.camera = camera;
		this.light = light;

		this.clock = clock;
	}

	static addFunction(fun) {
		this.functions.push(fun);
	}
}

window.Scene = Scene;

Scene.Init();