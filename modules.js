import Server from "./server.js";
import Util from "./util.js";

export default class Modules {
	static Init() {
		var context = this;
		Server.registryScript("/modules", function(req, res) {
			var files = context.getModules();

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

		this.InitModules();
	}

	static async InitModules() {
		var modules = this.getModules();

		for (var i = 0; i < modules.length; i++) {
			if (Util.verifyFile(Util.joinPath("./modules", modules[i], "main.js"))) {
				var main = await import("./modules/" + modules[i] + "/main.js");

				try {
					main.Init();
				} catch {}
			}
		}
	}

	static getModules() {
		var modules = Util.readDir("./modules");

		var order = {
			enabled: [],
			disabled: []
		};

		if (Util.verifyFile("./order.json")) {
			try {
				order = JSON.parse(Util.readFile("./order.json").toString());
			} catch {}
		} else {
			Util.writeFile("./order.json", JSON.stringify(order, null, "\t"));
		}

		for (var i = 0; i < modules.length; i++) {
			if (!order.enabled.includes(modules[i]) && !order.disabled.includes(modules[i])) {
				order.disabled.push(modules[i]);
			}
		}

		for (var i = 0; i < order.enabled.length; i++) {
			if (!modules.includes(order.enabled[i])) {
				order.enabled.splice(i, 1);
			}
		}

		for (var i = 0; i < order.disabled.length; i++) {
			if (!modules.includes(order.disabled[i])) {
				order.disabled.splice(i, 1);
			}
		}


		return order.enabled;
	}
}