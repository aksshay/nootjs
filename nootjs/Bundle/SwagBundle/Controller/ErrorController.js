var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");

var controller = new AbstractController();

controller.errorAction = function(request, response, exception) {
    controller.renderView("NootjsSwagBundle:Error/error.html.twig", {
        "statusCode": request.status,
    });
}

module.exports = controller;