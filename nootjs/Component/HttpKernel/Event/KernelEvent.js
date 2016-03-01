module.exports = function(kernel, request, response)
{
    this.kernel = kernel;
    this.request = request;
    this.response = response;

    this.getKernel = function() {
        return this.kernel;
    }
    this.getRequest = function() {
        return this.request;
    }
    this.getResponse = function() {
        return this.response;
    }
}