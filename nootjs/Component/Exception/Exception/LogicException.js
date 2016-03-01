exception = function(message)
{
    this.name = "LogicException";
    this.message = message;
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;