var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");

var controller = new AbstractController();

controller.indexAction = function(request, response) {

    var requests = this.get("http.request_stack").getAll();
    requests.reverse();

    controller.render({
        requests: requests,
    });

}

module.exports = controller;