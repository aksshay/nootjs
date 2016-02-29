var fs = require("fs");

module.exports = function(swag, kernel)
{
    this.swag = swag;
    this.kernel = kernel;

    this.render = function(view, args)
    {
        var parts = view.split(":");
        var bundleName = parts[0];
        var viewRelativePath = parts[1];

        var bundle = this.kernel.getBundle(bundleName);

        // First check if app directory contains view
        var path = this.kernel.getRootDirectory() + "/app/views/"+bundleName+"/"+viewRelativePath;
        if(!fs.existsSync(path) || !fs.lstatSync(path).isFile()) {
            // Otherwise use bundle's own view
            path = bundle.directory + "/Resources/views/" + viewRelativePath;
        }


        var html = this.swag.renderFile(path, args);

        return html;
    }
};