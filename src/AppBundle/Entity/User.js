var mapping = require("src/AppBundle/Resources/config/orm/user");

var User = function() {
    this.id = null;
    this.name = null;
    this.logs = [];
    this.mapping = mapping;
    this.mapping.name = "AppBundle:User";
}
module.exports = User;