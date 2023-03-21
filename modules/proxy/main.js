import fetch from "node-fetch";
import Server from "../../server.js";

export function Init() {
	Server.registryScript("/proxy/*", async function(req, res) {
		try {
			var args = decodeURI(req.url).split("/");

			args = args.slice(2);

			args = args.join("/");

			var controller = new AbortController();

			var f = await fetch(args, {signal: controller.signal,
				headers: req.headers
			});

			req.on("end", function() {
				controller.abort();
			});

			res.status(f.status);

			res.set({
				"accept-ranges": f.headers.get("accept-ranges"),
				"cache-control": f.headers.get("cache-control"),
				"content-length": f.headers.get("content-length"),
				"content-range": f.headers.get("content-range"),
				"content-type": f.headers.get("content-type")
			});

			f.body.pipe(res);
		} catch {}
	});
}