var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");

var controller = new AbstractController();

controller.errorAction = function(request, response, exception) {
    controller.render("NootjsSwagBundle:Error/error.html.twig", {
        "statusCode": request.status,
    });
}

module.exports = controller;