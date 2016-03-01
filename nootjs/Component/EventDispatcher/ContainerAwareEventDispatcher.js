var ContainerAwareEventDispatcher = function (container) {
    this.container = container;

    this.addListenerService = function(eventName, service, method) {
        this.addListener(eventName, service[method]);
    }

}

function inherit(child, Parent) {
    child.prototype = new Parent;
}
inherit(ContainerAwareEventDispatcher, require("./EventDispatcher"));


module.exports = ContainerAwareEventDispatcher;