var fs = require("fs");

module.exports = function(kernel) {
    this.kernel = kernel;

    this.resolve = function(view) {
        var parts = view.split(":");
        var bundleName = parts[0];
        var viewRelativePath = parts[1];

        // View is probably already resolved..
        if(!viewRelativePath) {
            return view;
        }

        var bundle = this.kernel.getBundle(bundleName);

        // First check if app directory contains view
        var path = this.kernel.getRootDirectory() + "/app/views/"+bundleName+"/"+viewRelativePath;
        if(!fs.existsSync(path) || !fs.lstatSync(path).isFile()) {
            // Otherwise use bundle's own view
            path = bundle.directory + "/Resources/views/" + viewRelativePath;
        }

        // Make path absolute
        path = this.kernel.getRootDirectory() + "/" + path;

        return path;
    }
}