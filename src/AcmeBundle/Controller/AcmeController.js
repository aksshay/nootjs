var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");
var controller = new AbstractController();

controller.indexAction = function() {
    //this.redirectToRoute("app.default.index");
    this.render();
}

module.exports = controller;