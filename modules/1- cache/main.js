import fetch from "node-fetch";
import Server from "../../server.js";
import Util from "../../util.js";

export function Init() {
	Server.registryScript("/cache/*", async function(req, res) {
		var args = decodeURI(req.url).split("/");

		args = args.slice(2);

		args = args.join("/");

		var file = encode(args);

		file = Util.joinPath("resources", "cache", file);

		if (Util.verifyFile(file)) {
			var r = Util.readStream(file);

			args = args.split(".");

			res.type(args[args.length -1]);

			r.pipe(res);
		} else {
			var f = await fetch(args);

			var w = Util.writeStream(file);

			f.body.pipe(w);

			args = args.split(".");

			res.type(args[args.length -1]);

			f.body.pipe(res);
		}
	});
}

function encode(str) {
	return Buffer.from(str).toString("hex");
}