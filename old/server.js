const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

var app = express();

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/whitney.fnt", function(req, res) {
	res.sendFile(path.join(__dirname, "whitney.fnt"));
});

app.get("/whitney.png", function(req, res) {
	res.sendFile(path.join(__dirname, "whitney.png"));
});

app.get("/untitled.glb", function(req, res) {
	res.sendFile(path.join(__dirname, "untitled.glb"));
});

app.get("/paper.png", function(req, res) {
	res.sendFile(path.join(__dirname, "paper.png"));
});

var f = "abcdef";

for (var i = 0; i < f.length; i++) {
	app.get("/" + f[i] + ".png", function(req, res) {
		res.sendFile(path.join(__dirname, "fotos", req.url));
	});
}

var server = https.createServer({
	key: fs.readFileSync("https.key"),
	cert: fs.readFileSync("https.cert")
}, app);

server.listen(3000, function() {
	console.log("Ready");
});