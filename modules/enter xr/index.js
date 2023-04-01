const features = {optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking", "layers"]};

class EnterXr {
	static async Init() {
		var context = this;

		if (await navigator.xr.isSessionSupported("immersive-vr")) {
			document.body.addEventListener("click", async function() {
				if (!context.session) {
					await context.requestSession();
				}
			});
		}
	}

	static async requestSession() {
		var session = await navigator.xr.requestSession("immersive-vr", features);

		Scene.renderer.xr.setSession(session);

		this.session = session;
	}
}

window.EnterXr = EnterXr;

EnterXr.Init();