import express from "express";
import Util from "./util.js";
import https from "https";

const KeyFile = "server.key";
const CertFile = "server.pem";

export default class Server {
	static Init(port, callback) {
		this.app = express();

		this.server = https.createServer({
			key: Util.readFile(KeyFile),
			cert: Util.readFile(CertFile)
		}, this.app);

		this.server.listen(port, callback);
	}

	static registryScript(path, script) {
		this.app.get(path, script);
	}

	static registryFile(path, file) {
		this.app.get(path, function(req, res) {
			res.sendFile(file);
		});
	}

	static registryDir(path) {
		this.app.get(path + "/*", function(req, res) {
			var args = decodeURI(req.url).split("/");

			var file = Util.joinPath("." + path, args.slice(2).join("/"));

			if (Util.verifyFile(file)) {
				res.sendFile(Util.resolvePath(file));
			} else {
				res.sendStatus(404);
			}
		});
	}
}