var AbstractBundle = require("nootjs/Bundle/FrameworkBundle/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("listeners");
    bundle.addConfig("collectors");
}

module.exports = bundle;