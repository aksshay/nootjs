module.exports = function(container)
{
    this.container = container;

    this.data = {};
    this.collect = function(request, response)
    {
        var em = this.container.get("orm.entity_manager");
        this.data = {
            "amountOfQueries": em.queriesExecuted,
        };
    }
    this.get = function(key) {
        return this.data[key];
    }
    this.render = function() {
        var templating = this.container.get("templating");
        return templating.render("NootjsOrmBundle:Collector/query.html.twig", {"collector": this});
    }
}