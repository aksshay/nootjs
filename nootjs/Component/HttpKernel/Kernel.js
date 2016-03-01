var fs = require("fs");
var util = require("util")
var merge = require("merge");

// Exceptions
var InvalidArgumentException = require("nootjs/Component/Exception/Exception/InvalidArgumentException");

// Events
var KernelExceptionEvent = require("nootjs/Component/HttpKernel/Event/KernelExceptionEvent");
var KernelRequestEvent = require("nootjs/Component/HttpKernel/Event/KernelResponseEvent");
var KernelResponseEvent = require("nootjs/Component/HttpKernel/Event/KernelResponseEvent");
var KernelFinishRequestEvent = require("nootjs/Component/HttpKernel/Event/KernelFinishRequestEvent");
var KernelControllerEvent = require("nootjs/Component/HttpKernel/Event/KernelControllerEvent");

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
			throw new InvalidArgumentException("Bundle '"+name+"' does not exist.");
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

		this.container.get("router").boot();

		this.eventDispatcher = this.container.get("event_dispatcher");
		this.controllerResolver = this.container.get("http.controller_resolver");


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

		try {
			// TODO: Move somewhere else
			this.baseUrl = request.protocol + request.headers.host;

			// Dispatch KernelRequestEvent
			this.eventDispatcher.dispatch("kernel.request", new KernelRequestEvent(this, request, response));

			// Resolve controller and arguments
			var controller = this.controllerResolver.getController(request, response);
			var arguments = this.controllerResolver.getArguments(request, response, controller);

			// kernel.controller event
			this.eventDispatcher.dispatch("kernel.controller", new KernelControllerEvent(this, request, response));

			// Execute controller
			controller.apply(controller, arguments);

		} catch(err) {

			// Dispatch KernelExceptionEvent
			this.container.get("event_dispatcher").dispatch("kernel.exception", new KernelExceptionEvent(this, request, response, err));

		}

	},

	sendResponse: function(request, response) {

		// Dispatch KernelResponseEvent
		var responseEvent = new KernelResponseEvent(this, request, response);
		this.container.get("event_dispatcher").dispatch("kernel.response", responseEvent);

		// Write response
		response.writeHead(response.status, response.headers);
		response.end(response.body);

		// Dispatch KernelFinishRequestEvent
		var finishRequestEvent = new KernelFinishRequestEvent(this, request, response);
		this.container.get("event_dispatcher").dispatch("kernel.finish_request", finishRequestEvent);

	}

};

module.exports = kernel;
