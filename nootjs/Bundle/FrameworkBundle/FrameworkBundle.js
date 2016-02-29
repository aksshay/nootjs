var AbstractBundle = require("nootjs/Bundle/FrameworkBundle/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("config");
    bundle.addConfig("services");
    bundle.addConfig("listeners");
    bundle.addConfig("utils");
    bundle.addConfig("swag");
}


bundle.processConfigs = function(configs, container) {
    var config = configs.config;;
    container.setParameter("debug", config.framework.debug);
}

module.exports = bundle;