var fs = require("fs");

module.exports = function(swag)
{
    this.swag = swag;

    this.render = function(view, args)
    {
        return this.swag.renderFile(view, args);
    }
};