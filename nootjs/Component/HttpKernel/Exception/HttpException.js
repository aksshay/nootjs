exception = function(message)
{
    this.message = message;
    this.name = "HttpException";
    this.statusCode = 404;
    this.stack = new Error().stack;
}
exception.prototype = new Error;

module.exports = exception;