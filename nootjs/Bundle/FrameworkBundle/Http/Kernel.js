var fs = require("fs");
var util = require("util")
var merge = require("merge");
var KernelExceptionEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelExceptionEvent");
var KernelResponseEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelResponseEvent");
var KernelFinishRequestEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelFinishRequestEvent");

var kernel = {

	environment: "prod",
	config: {},
	rootDirectory: null,
	container: require("nootjs/Bundle/FrameworkBundle/DependencyInjection/Container"),
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

		this.configureContainer();

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
	configureContainer: function() {
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
		}

		this.container.loadConfig(services);
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
	handle: function(server, request, response) {

		this.server = server;

		var protocol = request.protocol || "http://";
		this.baseUrl = protocol + request.headers.host;

		var router = this.container.get("router");

		var path = request.url;

		try {

			var matchedRoute = router.match(request.method, path);

			// No route found, try to serve static resource
			if(!matchedRoute) {
				var resourceResolver = this.container.get("http.resource_resolver");
				resourceResolver.resolve(request, response);
			} else {
				// Route matched, so resolve using controller
				response.status = 200;
				var controllerResolver = this.container.get("http.controller_resolver");
				controllerResolver.resolve(matchedRoute, request, response);
			}

		} catch(exception) {

			ReferenceError

			// 500 Error
			response.status = exception.statusCode || 500;

			// Default error page
			var action = function(statusCode, exception){
				response.status = statusCode;
				response.headers = {
					"Content-Type": "text/plain"
				};
				response.body = "An error has occurred: " + statusCode;
				this.finishRequest(request, response);
			}.bind(this);

			// Create KernelExceptionEvent
			var event = new KernelExceptionEvent(request, response);
			event.setException(exception);
			event.setAction(action);

			// Dispatch it
			this.container.get("event_dispatcher").dispatch("kernel.exception", event);

			// Call action
			var action = event.getAction();
			action(response.status, exception);
		}

	},

	finishRequest: function(request, response) {

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
