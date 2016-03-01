module.exports = function(container) {

    this.container = container;

    this.onKernelException = function(event) {

        if(!container.getParameter("debug")) {
            return;
        }

        var request = event.getRequest();
        var response = event.getResponse();
        var exception = event.getException();

        var stack = container.get("stack_parser").parse(exception.stack);

        response.status = exception.statusCode || 500;
        response.headers = {
            "Content-Type": "text/html",
        };
        response.body = container.get("templating").render("NootjsDebugBundle:Debug/index.html.twig", {
            stack: stack,
            exception: exception,
            status: response.status,
        });

        container.get("kernel").sendResponse(request, response);
    }

}