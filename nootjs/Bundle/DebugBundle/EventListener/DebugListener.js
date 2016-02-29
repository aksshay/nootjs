module.exports = function(container) {

    this.container = container;

    this.onKernelException = function(event) {

        if(!container.getParameter("debug")) {
            return;
        }

        var controllerResolver = container.get("http.controller_resolver");
        controllerResolver.selectController(event.request, event.response, "NootjsDebugBundle:Debug:index");
    }

}