process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var http = require("http");
var kernel = require("app/kernel");
var port = 8080;
var fs = require("fs");

kernel.boot("dev");

http.createServer(function (request, response) {
	nootResponse = kernel.handle(request, response);
	response.writeHead(nootResponse.statusCode, nootResponse.headers);
	response.end(nootResponse.body);
}).listen(port);

console.log("Server running at http://127.0.0.1:"+port);