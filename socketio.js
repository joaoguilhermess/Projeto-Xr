import {Server as IO} from "socket.io";
import Server from "./server.js";

export default class SocketIo {
	static Init() {
		this.io = new IO(Server.server);

		this.registered = [];

		var context = this;
		this.io.on("connection", function(socket) {
			socket.registered = [];

			socket.on("registry", function(type) {
				context.registry(type);

				socket.registered.push(type);

				socket.on(type, function(data) {
					context.io.emit(type, data);
				});
			});

			socket.emit("registry", context.registered);

			socket.on("disconnecting", function() {
				for (var i = 0; i < socket.registered.length; i++) {
					context.io.emit("off", socket.registered[i]);
					context.unRegistry(socket.registered[i]);
				}
			});
		});
	}

	static registry(type) {
		this.registered.push(type);

		this.io.emit("registry", this.registered);
	}

	static unRegistry(type) {
		this.registered.splice(this.registered.indexOf(type), 1);

		this.io.emit("registry", this.registered);
	}
}