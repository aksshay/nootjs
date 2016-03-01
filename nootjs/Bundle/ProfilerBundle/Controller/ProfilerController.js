var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");

var controller = new AbstractController();

controller.indexAction = function(request, response) {

    var requests = controller.get("http.request_stack").getAll();

    controller.render({
        requests: requests.reverse(),
    });

}

module.exports = controller;