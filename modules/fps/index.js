import * as THREE from "three";

class FPS {
	static async Init() {
		var text = new Ui.Text();

		text.position.set(0, 0, -6);
		text.lookAt(0, 0, 0);

		var last = [];

		Scene.addCallback(function() {
			var t = performance.now();

			while (last.length > 0 && last[0] <= t - 1000) {
				last.shift();
			}

			last.push(t);
		});

		setInterval(function() {
			text.text = last.length;
		}, 125);
	}
}

window.FPS = FPS;

// FPS.Init();