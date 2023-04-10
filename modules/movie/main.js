import Server from "../../server.js";
import Util from "../../util.js";

export function Init() {
	Server.registryScript("/movie", async function(req, res) {
		try {
			var path = "../Iron Man (2008) (2).mkv";

			if (!req.headers["range"]) {
				return res.end();
			}

			var stats = Util.readStats(path);

			var chunk = 1024 * 1024;

			var start = parseInt(req.headers["range"].split("=")[1].split("-")[0]);
			var end = start + chunk;

			if (end > stats.size - 1) {
				end = stats.size - 1;

				chunk = stats.size - 1 - start;
			}

			console.log(start, end);

			res.set({
				"Accept-Ranges": "bytes",
				"Cache-Control": "no-cache",
				"Content-Length": chunk,
				"Content-Range": "bytes " + start + "-" + end + "/" + stats.size,
				"Content-Type": "video/x-matroska"
			});

			res.status(206);

			var stream = Util.readStream(path, {start: start, end: end});

			stream.pipe(res);

			req.on("close", function() {
				stream.close();

				stream.destroy();
			});
		} catch (e) {console.error(e);}
	});
}