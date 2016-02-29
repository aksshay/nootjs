var EventDispatcher = function(eventListenerChain) {

    this.eventListenerChain = eventListenerChain;

    this.events = {};

    /**
     * Dispatch an event
     * @param eventName
     * @param args
     */
    this.dispatch = function(eventName, args) {
        var eventListeners = this.getEventListenersByEventName(eventName);
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
    this.addEventListener = function(eventName, callable) {
        this.eventListenerChain.addEventListener(eventName, callable);
    }

    /**
     * Find all listeners by event name
     * @param eventName
     * @returns {Array}
     */
    this.getEventListenersByEventName = function(eventName) {
        return this.eventListenerChain.findByName(eventName);
    }
}
module.exports = EventDispatcher;