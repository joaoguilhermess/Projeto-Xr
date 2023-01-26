import path from "path";
import url from "url";
import fs from "fs";

export default class Util {
	static joinPath(...args) {
		return path.join(...args);
	}

	static resolvePath(...args) {
		return Util.joinPath(path.dirname(url.fileURLToPath(import.meta.url)), Util.joinPath(...args));
	}

	static readFile(path) {
		return fs.readFileSync(path);
	}

	static verifyFile(path) {
		return fs.existsSync(path);
	}

	static readDir(path) {
		return fs.readdirSync(path);
	}
}