module.exports = function()
{
    this.process = function(container) {
        var taggedServices = container.findByTag("event_listener");
        for(var k in taggedServices) {
            var taggedService = taggedServices[k];
            var event = taggedService.tag.event;
            var method = taggedService.tag.method;
            container.get("event_dispatcher").addListener(event, taggedService.instance[method]);
        }
    }
};