var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");
var controller = new AbstractController();
var User = require("src/AppBundle/Entity/User");

controller.indexAction = function(request, response) {

    var em = this.getOrm().getEntityManager();

    var userRepository = em.getRepository("AppBundle:User");

    var userId = 3;

    var user = userRepository.find(userId).sync();

    if(!user) {
        var user = new User();
        user.id = userId;
        user.name = "Your name";
        em.persist(user);
        em.flush();
    }
    var logs = user.getLogs().sync();

    if(request.method == "POST") {
        var name = request.get("name");
        user.name = name;
        em.flush();
    }

    this.render({
        "name": user.name,
        "logs": logs,
    });




}

module.exports = controller;