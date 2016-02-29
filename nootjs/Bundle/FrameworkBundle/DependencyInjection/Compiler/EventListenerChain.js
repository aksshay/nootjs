var EventListenerChain = function()
{
    this.events = {};

    this.addEventListener = function(eventName, callable)
    {
        if(!this.events[eventName]){
            this.events[eventName] = {
                "name": eventName,
                "listeners": [],
            }
        }

        this.events[eventName].listeners.push(callable);
    }

    this.findByName = function(eventName) {
        if(!this.events[eventName]) {
            return [];
        }
        return this.events[eventName].listeners;
    }

    this.build = function(container) {
        var taggedServices = container.findByTag("event_listener");
        for(var k in taggedServices) {
            var taggedService = taggedServices[k];
            var event = taggedService.tag.event;
            var method = taggedService.tag.method;
            this.addEventListener(event, taggedService.instance[method]);
        }
    }
};

module.exports = EventListenerChain;