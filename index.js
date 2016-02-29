process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var http = require("http");
var kernel = require("app/kernel");
var port = 8080;

kernel.boot("dev");

var server = http.createServer(function (request, response) {
	kernel.handle(server, request, response);
});

server.listen(port);

console.log("Server running at http://127.0.0.1:"+port);