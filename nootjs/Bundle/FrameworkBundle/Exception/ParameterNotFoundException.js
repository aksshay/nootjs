var KernelException = require("nootjs/Bundle/FrameworkBundle/Exception/KernelException");

exception = function(message)
{
    this.name = "ParameterNotFoundException";
    this.message = message;
    this.stack = new Error().stack;
}
exception.prototype = new KernelException;

module.exports = exception;