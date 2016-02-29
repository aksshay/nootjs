var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");

var controller = new AbstractController();

controller.indexAction = function() {
    return this.render("AcmeBundle:Default/index.html.twig");
}

module.exports = controller;