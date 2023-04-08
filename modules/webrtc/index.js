class WebRtc {
	static Init() {
		this.call();
	}

	static call() {
		var peer = new RTCPeerConnection();

		console.log(peer);
	}

	static answer() {

	}
}

window.WebRtc = WebRtc;

WebRtc.Init();