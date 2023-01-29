var hex = "0123456789abcdef";

var t = 50;
var k = t*2;

var d = 5;

var rad = Math.PI/180;

var r = 10;

(async function() {
	for (var i = 0; i < 360/r; i++) {
		var x = Math.sin((i * r) * rad);
		var y = Math.cos((i * r) * rad);

		x *= 15;
		y *= 15;

		var box = scene.createEntity("a-box");

		box.setAttribute("color", "#000000");

		box.translate(x, y, 1.6);

		box.scale(0.3, 0.3, 0.3);

		console.log(box);

		box.addEventListener("click", function(event) {
			event.target.setAttribute("color", "#ff0000");
		});
	}
})
();

(async function() {
	for (var i = 0; i < 10000; i++) {
		var box = scene.createEntity("a-box");

		// console.log(Math.random() * k, Math.random() * k, Math.random() * k);

		// box.translate(Math.random() * k - t, Math.random() * k, Math.random() * k - t);
		box.translate(Math.random() * k - t, Math.random() * k - t, Math.random() * k - t);

		box.setAttribute("color", "#000000");

		box.addEventListener("click", function(event) {
			console.log(event);

			// var a = hex[Math.round(Math.random() * hex.length)];
			// var b = hex[Math.round(Math.random() * hex.length)];
			// var c = hex[Math.round(Math.random() * hex.length)];

			// box.setAttribute("color", "#" + a+a + b+b + c+c);
			event.target.setAttribute("color", "#ff0000");
		});

		await new Promise(function(resolve) {
			setTimeout(resolve, d);
		});
	}
})
// ();