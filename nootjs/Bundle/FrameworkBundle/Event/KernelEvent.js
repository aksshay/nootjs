module.exports = function(request, response)
{
    this.request = request;
    this.response = response;

    this.getRequest = function() {
        return this.request;
    }
    this.getResponse = function() {
        return this.response;
    }
}