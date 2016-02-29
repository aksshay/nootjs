module.exports = function(container) {

    this.container = container;

    this.onKernelException = function(event) {
        if(container.getParameter("debug")) {
            return;
        }
        // Default error controller
        var controller = require("nootjs/Bundle/SwagBundle/Controller/ErrorController");
        controller.setRequest(event.request);
        controller.setResponse(event.response);
        controller.setContainer(container);
        var action = controller.errorAction;

        event.setAction(action);
    }

}