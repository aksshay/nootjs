var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("routes");
}

module.exports = bundle;