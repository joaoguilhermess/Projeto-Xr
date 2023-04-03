async function initModules() {
	var f = await fetch("/modules");
	var modules = await f.json();

	for (var i = 0; i < modules.length; i++) {
		try {
			await import("/modules/" + modules[i] + "/index.js");
		} catch (e) {console.error(e);}
	}
}

initModules();