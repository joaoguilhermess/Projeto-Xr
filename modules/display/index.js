import * as THREE from "three";
import {Text} from "troika-three-text";

class Display {
	static async Init() {
		var mesh = new Text();

		mesh.text = "presepada";
		mesh.fontSize = 0.1;
		mesh.color = 0xffffff;

		mesh.lookAt(0, 0, 0);

		this.mesh = mesh;
	}
}

window.Display = Display;

Display.Init();