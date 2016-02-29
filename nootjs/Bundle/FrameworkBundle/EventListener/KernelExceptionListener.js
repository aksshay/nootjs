module.exports = function(container) {

    this.container = container;

    this.onKernelException = function(event) {

        if(!container.getParameter("debug")) {
            return;
        }

        // Use debug controller
        var controller = require("nootjs/Bundle/FrameworkBundle/Controller/DebugController");
        controller.setRequest(event.request);
        controller.setResponse(event.response);
        controller.setContainer(container);
        var action = controller.indexAction;

        event.setAction(action);
    }

}