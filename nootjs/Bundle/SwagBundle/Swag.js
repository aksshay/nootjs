var merge = require("merge");
var swig = require("swig");

var swag = function(extensionChain)
{
    this.swig = swig;

    this.extensionChain = extensionChain;

    this.functions = {};

    /**
     * Load extensions
     */
    this.loadExtensions = function()
    {
        var extensions = this.extensionChain.getExtensions();
        for(var i = 0; i < extensions.length; i++) {
            var extension = extensions[i];
            extension.addFilters();
            extension.addFunctions();
        }
    }

    this.setFunction = function(name, callable)
    {
        if (typeof callable !== "function") {
            throw new Error('Function "' + name + '" is not a valid function.');
        }
        this.functions[name] = callable;
    }
    this.getFunctions = function() {
        return this.functions;
    }

    this.renderFile = function(pathName, locals, cb) {

        // Append functions to locals
        var functions = this.getFunctions();
        locals = merge(locals, functions);

        // Render the file
        return this.swig.renderFile(pathName, locals, cb);
    }

    this.setFilter = function(name, method) {
        this.swig.setFilter(name, method);
    }
}
module.exports = swag;