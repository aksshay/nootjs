var url = require("url");
var querystring = require("querystring");

module.exports = function() {
    this.enrich = function(request, response, callback) {
        request.protocol = request.protocol || "http://";
        request.body = "";
        request.request = {};
        request.attributes = {};
        request.query = url.parse(request.url, true).query;

        request.receivedAt = Date.now();

        request.get = function(key) {

            if(this.query[key]) {
                return this.query[key];
            }

            if(this.request[key]) {
                return this.request[key];
            }

            return null;
        }

        request.getBody = function() {
            return request.body;
        }

        request.on("data", function(data){
            request.body += data;
        });
        request.on("end", function(){
            request.request = querystring.parse(request.body);
            callback(null, request, response);
        });
    }
}