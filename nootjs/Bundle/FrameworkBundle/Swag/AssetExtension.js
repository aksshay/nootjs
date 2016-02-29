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

            // Check if it points to a bundle's resource file
            path = path.replace("@", "/bundles/");

            return kernel.getBaseUrl() + path;
        });
    }
}