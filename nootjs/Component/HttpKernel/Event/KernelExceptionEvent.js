module.exports = function(kernel, request, response, exception)
{
    this.kernel = kernel;
    this.request = request;
    this.response = response;
    this.exception = exception;

    this.getKernel = function() {
        return this.kernel;
    }
    this.getRequest = function() {
        return this.request;
    }
    this.getResponse = function() {
        return this.response;
    }
    this.getException = function() {
        return this.exception;
    }
}