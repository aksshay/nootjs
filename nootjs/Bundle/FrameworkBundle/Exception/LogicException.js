exception = function(message)
{
    this.message = message;
    this.name = "LogicException";
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;