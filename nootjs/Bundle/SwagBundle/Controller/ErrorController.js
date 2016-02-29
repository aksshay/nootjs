var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");

var controller = new AbstractController();

controller.errorAction = function(statusCode) {
    controller.render("NootjsSwagBundle:Error/error.html.twig", {
        "statusCode": statusCode,
    });
}

module.exports = controller;