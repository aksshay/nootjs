var event = require("nootjs/Bundle/FrameworkBundle/Event/KernelEvent");

event.prototype.setException = function(exception) {

    this.exception = exception;
    return this;
}
event.prototype.getException = function() {
    return this.exception;
}
module.exports = event;