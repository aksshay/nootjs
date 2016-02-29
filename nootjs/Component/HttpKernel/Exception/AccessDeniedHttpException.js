var HttpException = require("nootjs/Component/HttpKernel/Exception/HttpException");

exception = function(message)
{
    this.name = "AccessDeniedHttpException";
    this.message = message;
    this.statusCode = 403;
    this.stack = new Error().stack;
}
exception.prototype = new HttpException;

module.exports = exception;