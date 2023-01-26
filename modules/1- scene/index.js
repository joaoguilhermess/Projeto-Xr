class Scene {
	constructor() {
		this.scene = document.createElement("a-scene");

		this.assets = document.createElement("a-assets");

		this.scene.append(this.assets);

		document.body.append(this.scene);	
	}

	registryAsset(id, src) {
		var asset = document.createElement("a-assets-item");

		asset.id = id;

		asset.setAttribute("src", src);

		this.assets.append(asset);

		return asset;
	}

	createEntity(tag) {
		var entity = document.createElement(tag);

		this.scene.append(entity);

		return new Entity(entity);
	}

	setAttribute(...args) {
		this.scene.setAttribute(...args);
	}
}

class Entity {
	constructor(entity) {
		this.entity = entity;
	}

	setAttribute(...args) {
		this.entity.setAttribute(...args);
	}

	linkAsset(asset) {
		this.entity.setAttribute("src", "#" + asset.id);
	}

	rotate(x, y, z) {
		this.entity.setAttribute("rotation", x + " " + z + " " + y);
	}

	translate(x, y, z) {
		this.entity.setAttribute("position", x + " " + z + " " + y);
	}

	scale(x, y, z) {
		this.entity.setAttribute("scale", x + " " + z + " " + y);
	}

	createEntity(tag) {
		var entity = document.createElement(tag);

		this.entity.append(entity);

		return new Entity(entity);
	}

	addEventListener(...args) {
		this.entity.addEventListener(...args);
	}
}

window.scene = new Scene();