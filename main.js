import SocketIo from "./socketio.js";
import Modules from "./modules.js";
import Server from "./server.js";
import Util from "./util.js";

Server.Init(3000, function() {
	console.log("Ready");
});

SocketIo.Init();

Server.registryFile("/", Util.resolvePath("public", "index.html"));

Server.registryDir("/public");
Server.registryDir("/resources");

Modules.Init();