var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");
var controller = new AbstractController();

controller.indexAction = function(request, response) {

    var em = this.getOrm().getEntityManager();

    var userRepository = em.getRepository("AppBundle:User");

    var user = userRepository.find(1).sync();
    var logs = user.getLogs().sync();

    if(request.method == "POST") {
        var name = request.get("name");
        user.name = name;
        em.flush();
    }

    this.render("AppBundle:Default/index.html.twig", {
        "name": user.name,
        "logs": logs,
    });

}

module.exports = controller;