module.exports = function()
{
    /**
     * Return matched route if it exists
     * @param method
     * @param path
     * @returns {boolean}
     */
    this.match = function(routes, method, path) {

        for(var key in routes) {
            var route = routes[key];
            if(this.patternMatches(path, route.pattern) && this.methodMatches(method, route)) {
                return route;
            }
        }

        return false;
    };

    /**
     * Check if http method is allowed for a route
     * @param method
     * @param route
     * @returns {boolean}
     */
    this.methodMatches = function(method, route) {
        if(route.methods == undefined) {
            return true;
        }
        return route.methods.indexOf(method) >= 0;
    }

    /**
     * Check if path matches with pattern
     * @param path
     * @param pattern
     * @returns {boolean}
     */
    this.patternMatches = function(path, pattern) {
        // TODO: Improve matching algorithm

        var matches = this.getMatches(path, pattern);

        if(!matches) {
            return false;
        }

        return true;
    };

    /**
     *
     * @param path
     * @param pattern
     * @returns {*}
     */
    this.getMatches = function(path, pattern) {

        // Remove query string
        path = path.split("?")[0];

        var params = this.getParams(pattern);

        // Replace parameters with catch-all regexp
        for(var k in params) {
            var param = params[k];
            pattern = pattern.replace("{"+param+"}", "(.+)");
        }

        // Make sure it is a exact match
        pattern += "$";

        // Create the regexp
        var expression = new RegExp(pattern);
        var matches = path.match(expression);

        return matches;
    };

    /**
     * Retrieve parameter names from pattern
     * @param pattern
     * @returns {*}
     */
    this.getParams = function(pattern) {
        var params = pattern.match(/\{(.*?)\}/g);
        if(!params) {
            return [];
        }
        for(var i = 0; i < params.length; i++) {
            params[i] = params[i].slice(1, -1);
        }
        return params;
    };

    this.getArgs = function(path, pattern) {
        var params = this.getParams(pattern);
        var matches = this.getMatches(path, pattern);
        var args = {};
        for(var i = 1; i < matches.length; i++) {
            args[params[i-1]] = matches[i];
        }

        return args;
    };
};