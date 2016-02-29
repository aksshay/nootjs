var mapping = require("src/AppBundle/Resources/config/orm/log");

var Log = function() {
    this.id = null;
    this.body = null;
    this.user = null;
    this.mapping = mapping;
    this.mapping.name = "AppBundle:Log";
}
module.exports = Log;