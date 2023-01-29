const model = scene.registryAsset("phone", "/resources/3d/phone.glb");

var container = scene.createEntity("a-entity");

var text = scene.createEntity("a-text");
var phone = container.createEntity("a-gltf-model");
var cursor = container.createEntity("a-cursor");

phone.linkAsset(model);

phone.translate(0, -0.25, -0.15);

text.translate(0.25, -0.5, 1.6);
container.translate(0, 0, 1.6);

text.setAttribute("color", "#000000");
text.setAttribute("align", "left");
text.setAttribute("width", 1/3);

cursor.setAttribute("fuse-timeout", 25);
cursor.setAttribute("fuse", true);

cursor.translate(0, -5, 0);

var offset = 0;


function factor(v, f=1000000) {
	v = Math.round(v * f)/f;

	return nonNaN(v);
}

function nonNaN(v) {
	if (v.toString() == "NaN") {
		v = 0;
	}

	return v;
}

function log(data, x, y, z) {
	text.setAttribute("value",
		"-> Final:\n" +

		"X: " + x + "\n" +
		"Y: " + y + "\n" +
		"Z: " + z + "\n"
		
		+ "\n-> Accelerometer:\n" +

		"X: " + data[0][0] + "\n" +
		"Y: " + data[0][1] + "\n" +
		"Z: " + data[0][2] + "\n"

		+ "\n-> Gyroscope:\n" +

		"X: " + data[1][0] + "\n" +
		"Y: " + data[1][1] + "\n" +
		"Z: " + data[1][2] + "\n"

		+ "\n-> Magnetometer:\n" +

		"X: " + data[2][0] + "\n" +
		"Y: " + data[2][1] + "\n" +
		"Z: " + data[2][2] + "\n"

		+ "\n-> Vector:\n" +

		"X: " + data[3][0] + "\n" +
		"Y: " + data[3][1] + "\n" +
		"Z: " + data[3][2] + "\n"  
	);
}

var resolution = 10000;

var offset = 0;

var rad = Math.PI/180;

var tohoes

SocketIo.on("lg", function(data) {
	offset = data[1][2];
}, function(data) {
	data[1][2] -= offset;
	data[3][2] -= offset;

	var acel = data[0];
	var gyro = data[1];
	var magn = data[2];
	var vect = data[3];

	var x1 = gyro[0];
	var y1 = gyro[1];
	var z1 = gyro[2];

	x1 = factor(x1, 1);
	y1 = factor(y1, 1);
	z1 = factor(z1, 1);

	var x2 = vect[0];
	var y2 = vect[1];
	var z2 = vect[2];

	var dx1 = x1 - x2;
	var dy1 = y1 - y2;
	var dz1 = z1 - z2;

	// x = factor(x, resolution);
	// y = factor(y, resolution);
	// z = factor(z, resolution);

	var x = x1 + dx1/4;
	var y = y1 + dy1/4;
	var z = z1 + dz1/10;

	log(data, x, y, z);

	phone.rotate(0, y, 0);
	container.rotate(x, 0, z);
}, function() {
	phone.rotate(0, 0, 0);
	container.rotate(0, 0, 0);
});


// var first = true;

// var last;
// var last2;

SocketIo.on("asd", function() {

}, function(data) {
	data[1][2] -= offset;
	data[3][2] -= offset;

	var gyro = data[1];
	var vector = data[3];

	var x = gyro[0];
	var y = gyro[1];
	var z = gyro[2];

	var xv = vector[0];
	var yv = vector[1];
	var zv = vector[2];
	
	if (first) {
		offset = data[1][2];

		first = false;

		last = [x, y, z];
		last2 = [xv, yv, zv];

		return;
	}

	var k = 0.1;
	var r = 1 - k;

	x = last[0] * r + x * k;
	y = last[1] * r + y * k;
	z = last[2] * r + z * k;

	var k = 0.5;
	var r = 1 - k;

	var mxv = (last2[0] + xv)/2;
	var myv = (last2[0] + yv)/2;
	var mzv = (last2[0] + zv)/2;

	xv = last[0] * r + xv * k;
	yv = last[1] * r + yv * k;
	zv = last[2] * r + zv * k;

	var k = 0.25;
	var r = 1 - k;

	x = x * r + xv * k;
	y = y * r + yv * k;
	z = z * r + zv * k;

	x = factor(x);
	y = factor(y);
	z = factor(z);

	

	phone.rotate(0, y, 0);
	container.rotate(x, 0, z);

	last = [x, y, z];
}, function() {
	offset = 0;
	first = true;

	phone.rotate(0, 0, 0);
	container.rotate(0, 0, 0);
});