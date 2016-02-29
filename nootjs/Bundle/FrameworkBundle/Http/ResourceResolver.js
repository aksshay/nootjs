var fs = require("fs");
var HttpNotFoundException = require("nootjs/Bundle/FrameworkBundle/Exception/HttpNotFoundException");

module.exports = function(container) {

    this.container = container;

    /**
     * Try to resolve to static resource
     * @param route
     * @param request
     * @param response
     */
    this.resolve = function(request, response) {

        var kernel = this.container.get("kernel");

        var path = request.url;


        var rootDirectory = kernel.getWebRoot();

        // Check if it points to a bundle's resource file
        var parts = path.split("/");
        if(parts[1] == "bundles") {
            var bundleName = parts[2];
            var bundle = kernel.getBundle(bundleName);
            var rootDirectory = kernel.getWebRoot() + "/../" + bundle.directory + "/Resources/public";
        }

        // Check if asset exists
        var assetPath = rootDirectory + "/" + parts.slice(3).join("/");
        if(fs.existsSync(assetPath) && fs.lstatSync(assetPath).isFile()) {
            response.status = 200;
            response.body = fs.readFileSync(assetPath, 'utf8');
            kernel.finishRequest(request, response);
            return;
        }

        throw new HttpNotFoundException("No route found for '"+request.method+" "+request.url+"'");

    }
}