import Server from "../../server.js";
import Util from "../../util.js";

export function Init() {
	Server.registryScript("/movie", async function(req, res) {
		try {
			var path = "../Iron Man (2008) (2).mkv";

			var stats = Util.readStats(path);

			var start;

			if (req.headers["range"]) {
				start = parseInt(req.headers["range"].split("=")[1].split("-")[0]);
			} else {
				start = 0;
			}

			console.log(start, stats.size);

			res.set({
				"accept-ranges": "bytes",
				"cache-control": "no-cache",
				"content-length": stats.size,
				"content-range": "bytes " + start + "-" + (stats.size -1) + "/" + stats.size,
				"content-type": "video/x-matroska"
			});

			res.status(206);

			var stream = Util.readStream(path, {start: start});

			stream.pipe(res);

			req.on("close", function() {
				stream.close();

				stream.destroy();
			});
		} catch (e) {console.error(e);}
	});
}