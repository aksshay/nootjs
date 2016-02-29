//var response = require("nootjs/Bundle/FrameworkBundle/Http/Response");

var Controller = function(){

	this.setRequest = function(request) {
		this.request = request;
	}
	this.setResponse = function(response) {
		this.response = response;
	}

	/**
	 * Set container
	 * @param container
	 */
	this.setContainer = function(container) {
		this.container = container;
	}

	/**
	 * Get service from DI container
	 * @param serviceKey
	 * @returns {*}
	 */
	this.get = function(serviceKey) {
		return this.container.get(serviceKey);
	}

	/**
	 * Render view
	 * @param view
	 * @param args
	 * @returns {*}
	 */
	this.render = function(view, args) {
		var templating = this.get("templating");
		var body = templating.render(view, args);

		var headers = {"Content-Type": "text/html"};

		//this.response.statusCode = 200;
		this.response.body = body;
		this.response.headers = headers;

		this.get("kernel").finishRequest(this.request, this.response);
	}
}

module.exports = Controller;