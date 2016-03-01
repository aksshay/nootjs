module.exports = function(container) {

    this.container = container;

    /**
     * Resolve route
     * Calls corresponding action
     * @param route
     * @param request
     * @param response
     */
    this.getController = function(request, response) {

        // Instantiate controller according to controller attribute
        var controllerSpecs = this.parseControllerReference(request.attributes.controller);
        var controller = this.instantiateController(controllerSpecs.bundleName, controllerSpecs.controllerName);

        // Inject dependencies
        controller.setRequest(request);
        controller.setResponse(response);
        controller.setContainer(this.container);

        return controller[controllerSpecs.actionName];
    }

    this.getArguments = function(request, response, controller) {

        // Retrieve arguments from path
        var arguments = this.container.get("router.url_matcher").getArgs(request);

        // Add request and response to arguments
        arguments.request = request;
        arguments.response = response;

        // Match them to the controller's parameters
        var matchedArguments = this.container.get("argument_matcher").match(controller, arguments);

        return matchedArguments;
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