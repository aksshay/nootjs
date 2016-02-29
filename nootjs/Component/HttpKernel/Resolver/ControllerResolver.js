module.exports = function(container) {

    this.container = container;

    /**
     * Resolve route
     * Calls corresponding action
     * @param route
     * @param request
     * @param response
     */
    this.resolve = function(request, response) {

        var route = request.route;
        var path = request.url;

        // Select controller based on route config
        this.selectController(request, response, route.controller);

        // Retrieve arguments from path
        var arguments = this.container.get("router.url_matcher").getArgs(path, route.pattern);

        this.container.get("kernel").executeController(request, response, arguments);
    }

    /**
     * Return new controller instance
     * @param longName - Reference to controller class for example: AppBundle:Default:index
     * @returns {*}
     */
    this.selectController = function(request, response, controllerReference) {

        var controllerSpecs = this.parseControllerReference(controllerReference);

        var controller = this.instantiateController(controllerSpecs.bundleName, controllerSpecs.controllerName);

        // Inject dependencies
        controller.setRequest(request);
        controller.setResponse(response);
        controller.setContainer(this.container);

        // Update request
        request.controllerClass = controller;
        request.controller = controller[controllerSpecs.actionName];

        return controller;
    }

    /**
     *
     * @param reference
     * @returns {{bundle: *, controller: *, action: *}}
     */
    this.parseControllerReference = function(controllerReference) {
        var parts = controllerReference.split(":");

        return {
            bundleName: parts[0],
            controllerName: parts[1] + "Controller",
            actionName: parts[2] +"Action",
        };
    }

    /**
     * Provide new instance of a controller class
     */
    this.instantiateController = function(bundleName, controllerName) {
        var controllerLocation = this.getControllerLocation(bundleName, controllerName);
        var controller = require(controllerLocation);
        return controller;
    },

    /**
     * Return path to controller
     * @param bundleName
     * @param controllerName
     * @returns {string}
     */
    this.getControllerLocation = function(bundleName, controllerName) {
        var kernel = this.container.get("kernel");

        var bundle = kernel.getBundle(bundleName);

        return bundle.directory + "/Controller/"+controllerName;
    }
}