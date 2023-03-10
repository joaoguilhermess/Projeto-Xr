import fetch from "node-fetch";
import Server from "../../server.js";
import Util from "../../util.js";

export function Init() {
	Server.registryScript("/lan/*", async function(req, res) {
		var args = req.url.split("/");

		args = args.slice(2);
		args = args.join("/");

		args = args.split("?")[0];

		args = args.split("/");

		var file = Util.joinPath("resources", "lan", args[args.length -1]);

		args = args.join("/");

		if (!Util.verifyFile(file)) {
			var url = "https://www.lamborghini.com/sites/it-en/files/js_assets/experience/assets/" + args;
			
			console.log(url);

			var f = await fetch(url);

			var w = Util.writeStream(file);

			f.body.pipe(w);

			await new Promise(function(resolve, reject) {
				f.body.on("end", resolve);
			});

			console.log(file);
		}

		var r = Util.readStream(file);
				
		r.pipe(res);
	});
}