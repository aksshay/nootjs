var event = require("nootjs/Bundle/FrameworkBundle/Event/KernelEvent");

event.prototype.setException = function(exception) {
    this.exception = exception;
    return this;
}
event.prototype.getException = function() {
    return this.exception;
}
event.prototype.setAction = function(action) {
    this.action = action;
    return this;
}
event.prototype.getAction = function() {
    return this.action;
}
module.exports = event;