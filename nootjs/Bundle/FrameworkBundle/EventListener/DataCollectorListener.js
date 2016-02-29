module.exports = function(container) {

    this.container = container;

    this.onKernelRequest = function(event) {

    }

    this.onKernelResponse = function(event) {

        request = event.getRequest();
        response = event.getResponse();

        var dataCollectors = container.get("data_collector_chain").getDataCollectors();
        for(var i = 0; i < dataCollectors.length; i++) {
            var dataCollector = dataCollectors[i];
            dataCollector.collect(request, response);
        }

        var templating = container.get("templating");
        response.body += templating.render("NootjsFrameworkBundle:Debug/toolbar.html.twig", {"collectors": dataCollectors});

    }

}