var fs = require("fs");
var merge = require("merge");
var routeNotFoundException = require("nootjs/Bundle/FrameworkBundle/Exception/RouteNotFoundException");
var invalidArgumentsException = require("nootjs/Bundle/FrameworkBundle/Exception/InvalidArgumentsException");

var router = function(kernel, matcher)
{
    this.kernel = kernel;
    this.matcher = matcher;
    this.routes = [];

    /**
     * Load all routes
     * @param routes
     */
    this.loadConfig = function(routes) {
        this.routes = routes;
    };

    /**
     * Return matched route if it exists
     * @param method
     * @param path
     * @returns {boolean}
     */
    this.match = function(method, path)
    {
        return this.matcher.match(this.routes, method, path);
    };

    /**
     * Generate path to route
     * @param name
     * @param args
     * @param absolute (default=true)
     * @returns {string}
     */
    this.generate = function(name, args, absolute) {
        var absolute = absolute || true;

        var route = this.findRoute(name);
        var params = this.matcher.getParams(route.pattern);

        // Check if mandatory parameters are set
        for(var i = 0; i < params.length; i++) {
            var param = params[i];
            if(!args[param]) {
                throw new invalidArgumentsException("Route (" + name + ") contains invalid arguments");
            }
        }

        // Replace parameters with arguments
        var url = route.pattern;
        for(var i = 0; i < params.length; i++) {
            var param = params[i];
            url = url.replace("{"+param+"}", args[param]);
        }


        if(absolute) {
            url = this.kernel.getBaseUrl() + url;
        }

        return url;
    }

    this.findRoute = function(name) {
        if(this.routes[name]) {
            return this.routes[name];
        }
        throw new routeNotFoundException("Unknown route: " + name);
    }

    /**
     * Compile routes
     * @returns {*}
     */
    this.compileRoutes = function() {
        var routes = {};

        // Add routes from each registered bundle
        for(var k in this.kernel.bundles) {
            var bundle = this.kernel.bundles[k];
            for(var c in bundle.configs) {
                var config = bundle.configs[c];
                if(config.routes) {
                    routes = merge(routes, config.routes);
                }
            }
        }

        return routes;
    }

    /**
     * Load all routes
     */
    this.boot = function() {
        var routes = this.compileRoutes();
        this.loadConfig(routes);
    }
};

module.exports = router;