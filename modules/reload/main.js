import SocketIo from "../../socketio.js";
import Util from "../../util.js";

const name = "reload";

export function Init() {
	SocketIo.registry(name);

	setInterval(function() {
		if (verify("./")) {
			SocketIo.io.emit(name);
		}
	}, 1000);
}

var cache = {};

function verify(path) {
	var files = Util.readDir(path);

	var changed = false;

	for (var i = 0; i < files.length; i++) {
		var f = Util.joinPath(path, files[i]);

		var stats = Util.readStats(f);

		var last = stats.mtime.toLocaleString();

		if (stats.isDirectory()) {
			if (verify(f)) {
				changed = true;
			}
		} else {
			if (cache[f] != last) {
				cache[f] = last;
				changed = true;
			}
		}
	}

	return changed;
}
