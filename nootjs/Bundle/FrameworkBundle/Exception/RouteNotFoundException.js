exception = function(message)
{
    this.message = message;
    this.name = "RouteNotFoundException";
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;