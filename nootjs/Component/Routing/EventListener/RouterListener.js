module.exports = function(router) {

    this.router = router;

    this.onKernelRequest = function(event) {

        var request = event.getRequest();
        var response = event.getResponse();

        var route = router.match(request);

        if(route) {
            request.attributes.route = route;
            request.attributes.controller = route.controller;
            response.status = 200; // TODO: Remove?
            request.route = route; // TODO: Remove?
        } else {
            request.attributes.controller = "NootjsFrameworkBundle:Static:index";
        }

    }

}