module.exports = function(swag, kernel)
{
    this.swag = swag;
    this.kernel = kernel;

    this.addFilters = function()
    {
    }

    this.addFunctions = function()
    {
        // Asset function
        this.swag.setFunction("asset", function(path){
            return kernel.getBaseUrl() + path;
        });
    }
}