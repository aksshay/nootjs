module.exports = function(swag, router)
{
    this.swag = swag;
    this.router = router;

    this.addFilters = function()
    {

    }

    this.addFunctions = function()
    {
        // Path function
        var router = this.router;
        this.swag.setFunction("path", function(name, args){
            return router.generate(name, args);
        });
    }
}