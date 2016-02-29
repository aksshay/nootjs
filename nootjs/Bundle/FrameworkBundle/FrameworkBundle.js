var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var RegisterEventListenersPass = require("nootjs/Bundle/FrameworkBundle/DependencyInjection/Compiler/RegisterEventListenersPass");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("config");
    bundle.addConfig("services");
    bundle.addConfig("listeners");
    bundle.addConfig("utils");
    bundle.addConfig("swag");
    bundle.addConfig("collectors");
    bundle.addConfig("routing");
}


bundle.processConfigs = function(configs, container) {
    var config = configs.config;;
    container.setParameter("debug", config.framework.debug);
}

bundle.build = function(container) {
    container.addCompilerPass(new RegisterEventListenersPass());
}

module.exports = bundle;