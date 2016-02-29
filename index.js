process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

var http = require("http");
var kernel = require("app/AppKernel");
var port = 8080;

kernel.boot("dev");

var requestEnricher = kernel.container.get("http.request_enricher");

var server = http.createServer(function (request, response) {
	requestEnricher.enrich(request, response, function(err, request, response){
		kernel.handle(request, response);
	});
});

server.listen(port);

console.log("Server running at http://127.0.0.1:"+port);