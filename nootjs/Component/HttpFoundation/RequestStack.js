module.exports = function()
{
    this.requests = [];

    this.add = function(request, response) {
        this.requests.push({
            request: request,
            response: response,
        });
    }

    this.getLast = function()
    {
        return this.requests[this.requests.length];
    }

    this.getAll = function() {
        return this.requests;
    }
}