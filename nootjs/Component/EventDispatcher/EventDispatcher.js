var EventDispatcher = function() {

    this.events = {};

    /**
     * Dispatch an event
     * @param eventName
     * @param args
     */
    this.dispatch = function(eventName, args) {
        var eventListeners = this.getListenersByEventName(eventName);
        // TODO: Sort by priority
        for(var i = 0; i < eventListeners.length; i++) {
            var eventListener = eventListeners[i];
            eventListener(args);
        }
    }

    /**
     * Add new event listener
     * @param eventName
     * @param callable
     */
    this.addListener = function(eventName, callable) {
        if(!this.events[eventName]){
            this.events[eventName] = {
                "name": eventName,
                "listeners": [],
            }
        }

        this.events[eventName].listeners.push(callable);
    }

    /**
     * Find all listeners by event name
     * @param eventName
     * @returns {Array}
     */
    this.getListenersByEventName = function(eventName) {
        if(!this.events[eventName]) {
            return [];
        }
        return this.events[eventName].listeners;
    }
}
module.exports = EventDispatcher;