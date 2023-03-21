class Movie {
	static async Init() {
		var url = "http://127.0.0.1:11470/d9944d7eaf388108f424874b31af8d0aac89cf03/1";

		url = "/proxy/" + url;

		var v = new Ui.Video();

		v.loadUrl(url);

		this.video = v;

		await v.loadMesh(2.5);

		v.mesh.position.set(0, 0, -4);
	}
}

window.Movie = Movie;

Movie.Init();