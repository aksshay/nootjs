var KernelControllerEvent = require("nootjs/Bundle/FrameworkBundle/Event/KernelControllerEvent");

module.exports = function(container) {

    this.container = container;

    /**
     * Resolve route
     * Calls corresponding action
     * @param route
     * @param request
     * @param response
     */
    this.resolve = function(route, request, response) {

        var path = request.url;

        // Get bundle, controller and action from route's controller parameter
        var parts = route.controller.split(":");
        var bundleName      = parts[0];
        var controllerName  = parts[1] + "Controller";
        var actionName      = parts[2] + "Action";

        var controller = this.getController(bundleName, controllerName);

        // Inject dependencies
        controller.setContainer(this.container);
        controller.setRequest(request);
        controller.setResponse(response);

        // Retrieve arguments from path
        var arguments = this.container.get("router.matcher").getArgs(path, route.pattern);

        // Add request and response to arguments
        arguments.request = controller.request;
        arguments.response = controller.response;

        // Match arguments using reflection
        var action = controller[actionName];
        var matchedArguments = this.container.get("argument_matcher").match(action, arguments);

        var eventDispatcher = this.container.get("event_dispatcher");

        // Create controller event and dispatch it
        var event = new KernelControllerEvent();
        event.setController(controller);
        event.setAction(action)
        eventDispatcher.dispatch("kernel.controller", event);

        // Call controller + action
        action.apply(controller, matchedArguments);
    }

    /**
     * Return new controller instance
     * @param bundleName
     * @param controllerName
     * @returns {*}
     */
    this.getController = function(bundleName, controllerName) {
        var controllerLocation = this.getControllerLocation(bundleName, controllerName);
        var controller = require(controllerLocation);
        return controller;
    }

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