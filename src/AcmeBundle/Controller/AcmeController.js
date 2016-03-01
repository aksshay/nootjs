var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");
var controller = new AbstractController();

controller.indexAction = function() {
    //this.redirectToRoute("app.default.index");
    controller.render();
}

module.exports = controller;