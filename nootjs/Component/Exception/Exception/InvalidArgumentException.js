var LogicException = require("nootjs/Component/Exception/Exception/LogicException");

exception = function(message)
{
    this.name = "InvalidArgumentException";
    this.message = message;
    this.stack = new Error().stack;
}
exception.prototype = new LogicException;

module.exports = exception;