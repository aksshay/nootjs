exception = function(message)
{
    this.name = "ServiceNotFoundException";
    this.message = message;
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;