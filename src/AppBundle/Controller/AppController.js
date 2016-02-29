var AbstractController = require("nootjs/Bundle/FrameworkBundle/Http/Controller");
var controller = new AbstractController();

controller.indexAction = function(request, name) {

    var em = this.get("orm.entity_manager");

    //this.get("container").getParameter("yolo");

    var userRepository = em.getRepository("AppBundle:User");

    var user = userRepository.find(1).sync();
    var logs = user.getLogs().sync();

    this.render("AppBundle:Default/index.html.twig", {
        "name": user.name,
        "logs": logs,
    });

}

module.exports = controller;