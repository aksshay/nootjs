module.exports = function(container)
{
    this.container = container;

    this.data = {};
    this.collect = function(request, response)
    {

        var responseTime = Date.now() - request.receivedAt;

        this.data = {
            "responseTime": responseTime,
        };
    }
    this.get = function(key) {
        return this.data[key];
    }
    this.render = function() {
        var templating = this.container.get("templating");
        return templating.render("NootjsFrameworkBundle:Collector/time.html.twig", {"collector": this});
    }
}