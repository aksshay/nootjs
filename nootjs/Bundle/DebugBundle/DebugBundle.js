var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("listeners");
    bundle.addConfig("swag");
    bundle.addConfig("utils");
}

module.exports = bundle;