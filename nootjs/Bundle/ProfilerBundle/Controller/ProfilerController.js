var AbstractController = require("nootjs/Bundle/FrameworkBundle/Controller/Controller");

var controller = new AbstractController();

controller.indexAction = function(request, response) {

    var requests = controller.get("http.request_stack").getAll();

    var collector = controller.get("orm.query_data_collector");

    controller.render({
        requests: requests.reverse(),
        collector: collector,
    });

}

module.exports = controller;