import * as THREE from "three";

class FPS {
	static async Init() {
		var pinned = new Ui.Text();

		pinned.position.set(0, 0, -5);
		pinned.lookAt(0, 0, 0);

		var last = [];

		Scene.addCallback(function() {
			var t = performance.now();

			while (last.length > 0 && last[0] <= t - 1000) {
				last.shift();
			}

			last.push(t);
		});

		setInterval(function() {
			pinned.text = last.length;
		}, 125);
	}
}

window.FPS = FPS;

FPS.Init();