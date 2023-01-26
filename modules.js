import Server from "./server.js";
import Util from "./util.js";

export default class Modules {
	static Init() {
		Server.registryScript("/modules", function(req, res) {
			var files = Util.readDir("./modules");

			var modules = [];

			for (var i = 0; i < files.length; i++) {
				if (Util.verifyFile(Util.joinPath("./modules", files[i], "index.js"))) {
					modules.push(files[i]);
				}
			}

			res.send(modules);
		});

		Server.registryScript("/modules/*", function(req, res) {
			var args = decodeURI(req.url).split("/");

			var file = Util.joinPath("./modules/" + args[2], args[3]);

			if (Util.verifyFile(file)) {
				res.sendFile(Util.resolvePath(file));
			} else {
				res.sendStatus(404);
			}
		});
	}

	static async InitModules() {
		var modules = Util.readDir("./modules");

		for (var i = 0; i < modules.length; i++) {
			if (Util.verifyFile(Util.joinPath("./modules", modules[i], "main.js"))) {
				var main = await import("./modules/" + modules[i] + "/main.js");

				try {
					main.Init();
				} catch {}
			}
		}
	}
}