var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");

var controller = new AbstractController();

controller.indexAction = function(request, name) {
    return this.render("AppBundle:Default/index.html.twig", {
        "name": name,
    });
}

controller.getName = function() {
    return "App";
}

module.exports = controller;