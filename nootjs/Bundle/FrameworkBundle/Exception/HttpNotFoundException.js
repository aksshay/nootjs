exception = function(message)
{
    this.message = message;
    this.name = "HttpNotFoundException";
    this.statusCode = 404;
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;