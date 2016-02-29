module.exports = function() {

    /**
     * Match arguments with method's parameters
     * @param method
     * @param arguments
     */
    this.match = function(method, arguments) {

        var parameters = method.toString().match (/function\s*\w*\s*\((.*?)\)/)[1].split (/\s*,\s*/);

        var matchedArgs = [];
        for(var i = 0; i < parameters.length; i++) {
            var param = parameters[i];
            matchedArgs.push(arguments[param]);
        }

        return matchedArgs;
    }

}