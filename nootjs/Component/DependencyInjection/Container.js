var LogicException = require("nootjs/Component/Exception/Exception/LogicException");

var ServiceNotFoundException = require("nootjs/Component/DependencyInjection/Exception/ServiceNotFoundException");
var ParameterNotFoundException = require("nootjs/Component/DependencyInjection/Exception/ParameterNotFoundException");

var Compiler = require("nootjs/Component/DependencyInjection/Compiler/Compiler");

var container = {

    services: {},
    parameters: {},
    isCompiled: false,
    compiler: new Compiler(),

    /**
     * Add a new service
     * @param key
     * @param service
     */
    add: function(key, service) {
        this.services[key] = service;
    },

    /**
     * Set value of a parameter
     * @param id
     * @param value
     */
    setParameter: function(id, value) {
        if(this.isCompiled) {
            throw new LogicException("Unable to set parameter. Container has already been compiled.");
        }
        this.parameters[id] = value;
    },

    /**
     * Check if container contains a parameter
     * @param id
     * @returns {boolean}
     */
    hasParameter: function(id) {
        return this.parameters[id] != undefined;
    },

    /**
     * Retrieve parameter from container
     * @param id
     * @returns {*}
     */
    getParameter: function(id) {
        if(!this.hasParameter(id)) {
            throw new ParameterNotFoundException("Parameter '" + id + "' does not exist.");
        }
        return this.parameters[id];
    },

    /**
     * Get service
     * Instantiate if it has not yet been instantiated
     * @param id
     * @returns {*}
     */
    get: function(id) {


        if(id == "container") {
            return this;
        }

        var service = this.findDefinition(id);

        this.instantiate(service);
        return service.instance;
    },

    findDefinition: function(id) {
        var definition = this.services[id];
        if(!definition) {
            throw new ServiceNotFoundException("Definition with id '" + id + "' does not exist.");
        }

        if(!definition.arguments) {
            definition.arguments = [];
        }

        if(!definition.calls) {
            definition.calls = [];
        }

        return definition;
    },

    compile: function() {
        this.compiler.compile(this);
    },

    addCompilerPass: function(pass) {
        this.compiler.addPass(pass);
    },

    /**
     * TODO: Opschonen die hap
     * @param service
     * @returns {boolean}
     */
    instantiate: function(service) {

        if(service.instance != undefined) {
            return false;
        }

        var ServiceClass = require(service.class);
        if(typeof ServiceClass == "function") {
            service.instance = new ServiceClass();
            if(service.arguments) {

                var arguments = this.parseArguments(service.arguments);
                ServiceClass.apply(service.instance, arguments);
            }
        } else {
            service.instance = ServiceClass;
        }

        // Calls

        if(service.calls) {
            for(var i = 0; i < service.calls.length; i++) {
                var call = service.calls[i];
                var method = call[0];

                var args = this.parseArguments(call[1]);
                if(typeof ServiceClass == "function") {
                    service.instance[method].apply(service.instance, args);
                } else {
                    ServiceClass[method].apply(service.instance, args);
                }
            }
        }


        return true;
    },

    findTaggedServices: function(tagName) {
        var taggedServices = {};
        for(var key in this.services) {

            var service = this.services[key];
            if(service.tags) {
                for(var i = 0; i < service.tags.length; i++) {
                    var tag = service.tags[i];
                    if(tag.name == tagName) {
                        taggedServices[key] = service;
                    }
                }
            }

        }

        return taggedServices;
    },

    /**
     * Parse arguments for service/parameters etc.
     * @param arguments
     * @returns {Array}
     */
    parseArguments: function(arguments) {
        var parsed = [];

        for(var i = 0; i < arguments.length; i++) {
            var argument = arguments[i];

            // Check if reference
            if(argument.charAt(0) == "@") {
                // Service
                var serviceName = argument.substr(1);
                if (serviceName == "container") {
                    parsed.push(this);
                } else {
                    parsed.push(this.get(serviceName));
                }
            }
            // Check if parameter
            else if(argument.charAt(0) == "%" && argument.charAt(argument.length - 1) == "%") {

                var parameter = argument.slice(1, -1);
                parsed.push(this.getParameter(parameter));
            } else {
                parsed.push(argument);
            }
        }
        return parsed;
    },

    /**
     * Build container from config files
     * @param services
     */
    build: function(services) {
        this.services = services;
    }
};

module.exports = container;