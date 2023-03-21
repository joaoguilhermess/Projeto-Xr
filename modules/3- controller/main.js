import SocketIo from "../../socketio.js";
import Server from "../../server.js";
import net from "net";

var name = "controller";

export function Init() {
	var server = net.createServer(async function(socket) {
		socket.on("readable", function() {
			if (socket.unlock) {
				socket.unlock();
			}
		});

		socket.on("close", function() {
			if (socket.unlock) {
				socket.unlock();
			}

			socket.destroy();

			SocketIo.unRegistry(name);
		});

		SocketIo.registry(name);

		while (true) {
			var l = await read(5, socket);

			if (l) {
				l = parseInt(l.toString());
			} else {
				break;
			}

			var k = await read(l, socket);

			if (k) {
				k = JSON.parse(k);

				SocketIo.io.emit(name, k);
			} else {
				break;
			}
		}

		SocketIo.io.emit("off", name);
	});

	server.listen(Server.server.address().port + 1);
}

async function read(length, socket) {
	try {
		if (socket._readableState.length < length) {
			await new Promise(function(resolve, reject) {
				socket.unlock = resolve;
			});
		}

		if (socket._readableState.length >= length) {
			return socket.read(length);
		}

		if (socket._readableState.length > 0) {
			return socket.read();
		}
	} catch {}
}