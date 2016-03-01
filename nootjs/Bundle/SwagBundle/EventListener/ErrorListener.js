module.exports = function(container) {

    this.container = container;

    this.onKernelException = function(event) {

        // TODO: Shit fixen
        if(container.getParameter("debug")) {
            return;
        }

        var request = event.getRequest();
        var response = event.getResponse();
        var exception = event.getException();

        request.attributes.controller = "NootjsSwagBundle:Error:error";

        var controllerResolver = container.get("http.controller_resolver");
        var controller = controllerResolver.getController(request, response);
        var arguments = [request, response, exception];


        controller.apply(controller, arguments);
    }

}