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
	 * Return orm service
	 * @returns {*}
     */
	this.getOrm = function() {
		return this.container.get("orm");
	}

	/**
	 * Render view
	 * @param view
	 * @param args
	 * @returns {*}
	 */
	this.renderView = function(view, args) {
		var templating = this.get("templating");

		// Set headers
		var headers = {
			"Content-Type": "text/html",
		};
		this.response.headers = headers;

		// Set body
		var body = templating.render(view, args);
		this.response.body = body;

		// And send
		this.sendResponse();
	}

	/**
	 * Render designated view (Bundle:Controller/action.html.twig)
	 * @param args
	 * @returns {*}
     */
	this.render = function(args) {
		var view = this.guessView();
		return this.renderView(view, args);
	}

	this.getSpecs = function() {
		return this.get("http.controller_resolver").parseControllerReference(this.request.route.controller);
	}

	this.guessView = function() {
		var specs = this.getSpecs();
		var guessedView = specs.bundleName + ":" + specs.controllerName.substr(0, specs.controllerName.length - 10) + "/" + specs.actionName.substr(0, specs.actionName.length - 6) + ".html.twig";
		return guessedView;
	}

	this.generateUrl = function(route, args, absolute) {
		return this.container.get("router").generate(route, args, absolute);
	}

	this.sendResponse = function() {
		this.get("kernel").sendResponse(this.request, this.response);
	}

	this.redirectToRoute = function(route, args, status) {
		status = status || 302;

		var url = this.generateUrl(route, args);

		this.response.status = status;
		this.response.headers = {
			"Location": url,
		};

		this.sendResponse();
	}
}

module.exports = Controller;