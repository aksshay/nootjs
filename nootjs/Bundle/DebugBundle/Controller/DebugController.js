var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");

var controller = new AbstractController();

controller.indexAction = function(request, response, exception) {

    var stackParser = controller.get("stack_parser");

    var stack = stackParser.parse(exception.stack);

    controller.renderView("NootjsDebugBundle:Debug/index.html.twig", {
        "statusCode": response.status,
        "exception": exception,
        "stack": stack,
    });

}

module.exports = controller;