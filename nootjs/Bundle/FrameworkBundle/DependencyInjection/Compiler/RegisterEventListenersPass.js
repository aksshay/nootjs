module.exports = function()
{
    this.process = function(container) {
        var taggedServices = container.findTaggedServices("event_listener");
        for(var k in taggedServices) {
            var taggedService = taggedServices[k];
            var event = taggedService.tag.event;
            var method = taggedService.tag.method;
            container.get("event_dispatcher").addListener(event, taggedService.instance[method]);
        }
    }
};

module.exports = function()
{
    this.process = function(container) {

        var definition = container.findDefinition("event_dispatcher");

        var taggedServices = container.findTaggedServices("event_listener");



        for(var id in taggedServices) {
            var taggedService = taggedServices[id];
            var tags = taggedService.tags;
            for(var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                if(tag.name == "event_listener") {
                    definition.calls.push(["addListenerService", [tag.event, "@"+id, tag.method]]);
                }
            }
        }
    }
};