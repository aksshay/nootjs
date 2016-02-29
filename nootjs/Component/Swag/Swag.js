var merge = require("merge");
var fsloader = require("nootjs/Component/Swag/Loaders/Filesystem");

module.exports = function(extensionChain, loader)
{
    this.extensionChain = extensionChain;

    if(loader) {
        this.swig = require("swig");
        this.swig.setDefaults({
            loader: loader,
        });
    }

    this.functions = {};

    /**
     * Load extensions
     */
    this.loadExtensions = function()
    {
        var extensions = this.extensionChain.getExtensions();
        for(var i = 0; i < extensions.length; i++) {
            var extension = extensions[i];
            this.addExtension(extension);
        }
    }

    /**
     * Add new extension
     * @param extension
     */
    this.addExtension = function(extension) {
        extension.addFilters();
        extension.addFunctions();
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