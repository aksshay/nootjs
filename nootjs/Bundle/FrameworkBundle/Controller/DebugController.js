var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");

var controller = new AbstractController();

controller.indexAction = function(statusCode, exception) {

    var stackParser = controller.get("stack_parser");

    var stack = stackParser.parse(exception.stack);

    controller.render("NootjsFrameworkBundle:Debug/index.html.twig", {
        "statusCode": statusCode,
        "exception": exception,
        "stack": stack,
    });

}

module.exports = controller;