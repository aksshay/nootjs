exception = function(message)
{
    this.message = message;
    this.name = "KernelException";
    this.statusCode = 404;

    this.setAction = function(action) {
        this.action = action;
        return this;
    }

    this.setRequest = function(request) {
        this.request = request;
        return this;
    }
    this.getRequest = function() {
        return this.request;
    }

    this.setResponse = function(response) {
        this.response = response;
        return this;
    }
    this.getResponse = function() {
        return this.response;
    }
}
exception.prototype = new Error;

module.exports = exception;