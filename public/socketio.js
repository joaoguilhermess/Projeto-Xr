class SocketIo {
	static socket;

	static Init() {
		this.socket = io();

		this.registered = [];

		var context = this;
		this.socket.on("registry", function(registry) {
			context.registered = registry;
		});
	}

	static on(type, callback1, callback2, callback3) {
		var one = false;

		this.socket.on(type, function(...args) {
			if (!one) {
				if (callback1) {
					callback1(...args);
				}
				one = true;
			} else {
				if (callback2) {
					callback2(...args);
				}
			}
		});

		this.socket.on("off", function(name) {
			if (name == type) {
				if (callback3) {
					callback3();
				}
				one = false;
			}
		});
	}

	static emit(type, value) {
		this.socket.emit(type, value);
	}
}

SocketIo.Init();