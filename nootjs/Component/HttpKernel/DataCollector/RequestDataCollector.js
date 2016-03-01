module.exports = function(container)
{
    this.container = container;

    this.data = {};
    this.collect = function(request, response)
    {
        this.data = {
            "method": request.method,
            "path": request.url,
            "route": request.route,
            "statusCode": response.status,
        };
    }
    this.get = function(key) {
        return this.data[key];
    }
    this.render = function() {
        var templating = this.container.get("templating");
        return templating.render("NootjsFrameworkBundle:Collector/request.html.twig", {"collector": this});
    }
}