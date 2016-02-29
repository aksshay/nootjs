var event = require("nootjs/Bundle/FrameworkBundle/Event/KernelEvent");

event.prototype.setController = function(controller) {
    this.controller = controller;
    return this;
}
event.prototype.getController = function() {
    return this.controller;
}
event.prototype.setAction = function(action) {
    this.action = action;
    return this;
}
event.prototype.getAction = function() {
    return this.action;
}
module.exports = event;