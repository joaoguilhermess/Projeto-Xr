import Server from "../../server.js";
import Util from "../../util.js";
import fetch from "node-fetch";

Server.registryScript("/sky/*", function(req, res) {
	var file = decodeURI(req.url).split("/")[2];

	if (file) {
		file = Util.resolvePath("./resources/360", file);

		if (Util.verifyFile(file)) {
			return res.sendFile(file);
		}
	}

	var list = Util.readDir("./resources/360");

	res.sendFile(Util.resolvePath("./resources/360", list[Math.round(Math.random() * (list.length - 1))]));
});