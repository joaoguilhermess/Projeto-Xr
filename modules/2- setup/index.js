var camera = scene.createEntity("a-camera");
camera.setAttribute("active", "true");
camera.translate(0, 0, 1.6);

scene.setAttribute("background", "color", "#bbbbbb");

// const skyImage = scene.registryAsset("sky", "/resources/360/iss.jpg");
// var sky = scene.createEntity("a-sky");
// sky.linkAsset(skyImage);
// sky.rotate(0, 0, 270);

var ambient = scene.createEntity("a-light");
ambient.setAttribute("type", "ambient");
ambient.setAttribute("color", "#ffffff");
ambient.setAttribute("intensity", 0.9);

var directional = scene.createEntity("a-light");
directional.setAttribute("type", "directional");
directional.setAttribute("color", "#ffffff");
directional.setAttribute("intensity", 0.6);
directional.translate(-0.92, -10, 0.85);