var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

var RegisterSwagExtensionsPass = require("nootjs/Component/Swag/DependencyInjection/Compiler/RegisterSwagExtensionsPass");

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("listeners");
}

bundle.build = function(container) {
    container.addCompilerPass(new RegisterSwagExtensionsPass());
}

module.exports = bundle;