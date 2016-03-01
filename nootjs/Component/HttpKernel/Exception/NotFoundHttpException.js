var HttpException = require("./HttpException");

exception = function(message)
{
    this.name = "NotFoundHttpException";
    this.message = message;
    this.statusCode = 404;
    this.stack = new Error().stack;
}
exception.prototype = new HttpException;

module.exports = exception;