var fs = require("fs");
var util = require("util")
var merge = require("merge");
var KernelExceptionEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelExceptionEvent");
var KernelRequestEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelResponseEvent");
var KernelResponseEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelResponseEvent");
var KernelFinishRequestEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelFinishRequestEvent");
var InvalidArgumentsException = require("nootjs/Bundle/FrameworkBundle/Exception/InvalidArgumentsException");
var KernelControllerEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelControllerEvent");

var kernel = {

	environment: "prod",
	config: {},
	rootDirectory: null,
	container: require("nootjs/Component/DependencyInjection/Container"),
	bundles: {},
	baseUrl: null,

	/**
	 * Return all registered bundles
	 * @returns {kernel.bundles|{}}
     */
	getRegisteredBundles: function() {
		return this.bundles;
	},

	/**
	 * Register multiple bundles
	 * @param bundles
     */
	registerBundles: function(bundles) {
		for(var k in bundles) {
			var bundle = bundles[k];
			this.registerBundle(k, bundle);
		}
	},

	/**
	 * Register a new bundle
	 * @param bundleName
	 * @param bundleLocation
	 */
	registerBundle: function(bundleName, bundleLocation) {
		this.bundles[bundleName] = require(bundleLocation);

		var bundleDirectory = bundleLocation.substr(0, bundleLocation.lastIndexOf("/"));
		this.bundles[bundleName].directory = bundleDirectory;
	},



	getCacheDirectory: function() {
		return this.getRootDirectory() + "/var/cache";
	},

	getBundles: function() {
		return this.bundles;
	},

	getBundle: function(name) {
		if(!this.bundles[name]) {
			throw new InvalidArgumentsException("Bundle '"+name+"' does not exist.");
		}
		return this.bundles[name];
	},

	getBaseUrl: function()
	{
		return this.baseUrl;
	},

	configureBundles: function() {
		for(var k in this.bundles) {
			var bundle = this.bundles[k];
			bundle.processConfigs(bundle.configs, this.container);
		}
	},

	/**
	 * Boot the kernel
	 * @param environment
	 * @param rootDirectory
     */
	boot: function(environment) {
		this.rootDirectory = process.env.NODE_PATH;

		this.bootBundles();

		this.configureBundles();

		this.buildContainer();

		this.environment = environment || "prod";
		this.loadAppConfig(environment);


		this.container.compile();

		this.container.get("swag").loadExtensions();

		this.container.get("router").boot();


	},

	/**
	 * Boot all bundles
	 */
	bootBundles: function() {
		for(var k in this.bundles) {
			var bundle = this.bundles[k];
			bundle.boot();
		}
	},

	/**
	 * Add all services to container
	 */
	buildContainer: function() {
		var container = this.container;
		var services = [];

		for(var k in this.bundles) {

			var bundle = this.bundles[k];
			for(var c in bundle.configs)
			{
				var config = bundle.configs[c];
				if(config.services) {
					services = merge(services, config.services);
				}
			}
			bundle.build(container);
		}
		container.build(services);
	},

	/**
	 * Load app config files
	 * @param environment
     */
	loadAppConfig: function(environment) {
		// TODO: Shit verbeteren
		var mainConfig = require("app/config/config");
		var envConfig = require("app/config/config_" + environment);
		this.config = merge(mainConfig, envConfig);

		var parameters = require("app/config/parameters");
		this.config = merge(this.config, parameters);

		this.configureAppParameters();
	},

	configureAppParameters: function() {
		for(var id in this.config.parameters) {
			var value = this.config.parameters[id];
			this.container.setParameter(id, value);
		}
	},

	getRootDirectory: function() {
		return this.rootDirectory;
	},

	getWebRoot: function() {
		return this.getRootDirectory() + "/public";
	},

	/**
	 * Convert request object into response object
	 * @param request
	 * @param response
	 * @returns {*}
     */
	handle: function(request, response) {

		// TODO: Verplaatsen naar event listener
		this.container.get("http.request_stack").add(request, response);

		// Dispatch response event
		var requestEvent = new KernelRequestEvent(request, response);
		this.container.get("event_dispatcher").dispatch("kernel.request", requestEvent);

		this.baseUrl = request.protocol + request.headers.host;

		var router = this.container.get("router");

		var path = request.url;

		try {

			var matchedRoute = router.match(request);

			// No route found, try to serve static resource
			if(!matchedRoute) {
				var resourceResolver = this.container.get("http.resource_resolver");
				resourceResolver.resolve(request, response);
			} else {

				//throw new InvalidArgumentsException("Test.");

				// Route matched, so resolve using controller
				request.route = matchedRoute;
				response.status = 200;
				var controllerResolver = this.container.get("http.controller_resolver");
				controllerResolver.resolve(request, response);
			}

		} catch(exception) {
			response.status = exception.statusCode || 500;

			// Default error page
			request.controller = this.defaultErrorController;

			// Create KernelExceptionEvent
			var event = new KernelExceptionEvent(request, response);
			event.setException(exception);
			// And dispatch it
			this.container.get("event_dispatcher").dispatch("kernel.exception", event);

			this.executeController(request, response, {
				"request": request,
				"response": response,
				"exception": exception,
			});
		}

	},

	defaultErrorController: function(request, response, exception){
		response.status = 500;
		response.headers = {
			"Content-Type": "text/html"
		};
		response.body = "An error has occurred ("+response.status+")";
		kernel.sendResponse(request, response);
	},

	/**
	 * Execute request.controller
	 * @param request
	 * @param response
	 * @param arguments
     */
	executeController: function(request, response, arguments) {

		// Add request and response to arguments
		arguments.request = request;
		arguments.response = response;

		// Create controller event and dispatch it
		var eventDispatcher = this.container.get("event_dispatcher");
		var event = new KernelControllerEvent(request, response);
		eventDispatcher.dispatch("kernel.controller", event);


		var controllerClass = request.controllerClass;
		var controllerMethod = request.controller;
		var matchedArguments = this.container.get("argument_matcher").match(request.controller, arguments);

		if(controllerClass) {
			controllerMethod.apply(controllerClass, matchedArguments);
		} else {
			controllerMethod.apply(controllerMethod, matchedArguments);
		}

	},

	sendResponse: function(request, response) {

		// Dispatch response event
		var responseEvent = new KernelResponseEvent(request, response);
		this.container.get("event_dispatcher").dispatch("kernel.response", responseEvent);


		// Write response
		response.writeHead(response.status, response.headers);
		response.end(response.body);


		// Dispatch finish request event
		var finishRequestEvent = new KernelFinishRequestEvent(request, response);
		this.container.get("event_dispatcher").dispatch("kernel.finish_request", finishRequestEvent);

	}

};

module.exports = kernel;
