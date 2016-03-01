module.exports = function(container)
{
    this.container = container;

    this.data = {};
    this.collect = function(request, response)
    {
        var em = this.container.get("orm.entity_manager");
        this.data = {
            "executedQueries": em.getExecutedQueries(),
        };
    }

    this.getExecutedQueries = function() {
        return this.data["executedQueries"];
    }

    this.render = function() {
        var templating = this.container.get("templating");
        return templating.render("NootjsOrmBundle:Collector/query.html.twig", {
            "executedQueries": this.getExecutedQueries(),
        });
    }
}