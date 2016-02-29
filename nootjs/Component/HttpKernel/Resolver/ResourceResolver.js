var fs = require("fs");
var NotFoundHttpException = require("nootjs/Component/HttpKernel/Exception/NotFoundHttpException");

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


        var assetPath = kernel.getWebRoot() + path;

        // Check if it points to a bundle's resource file
        var parts = path.split("/");
        if(parts[1] == "bundles") {
            var bundleName = parts[2];
            var bundle = kernel.getBundle(bundleName);
            assetPath = kernel.getWebRoot() + "/../" + bundle.directory + "/Resources/public/" + parts.slice(3).join("/");
        }

        // Check if asset exists
        if(fs.existsSync(assetPath) && fs.lstatSync(assetPath).isFile()) {
            response.status = 200;
            response.body = fs.readFileSync(assetPath, 'utf8');
            kernel.sendResponse(request, response);
            return;
        }

        throw new NotFoundHttpException("No route found for '"+request.method+" "+request.url+"'");

    }
}