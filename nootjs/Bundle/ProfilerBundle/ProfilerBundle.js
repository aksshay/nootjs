var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var bundle = new AbstractBundle();

var RegisterDataCollectorsPass = require("nootjs/Bundle/ProfilerBundle/DependencyInjection/Compiler/RegisterDataCollectorsPass");

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("routes");
    bundle.addConfig("listeners");
}

bundle.build = function(container) {
    container.addCompilerPass(new RegisterDataCollectorsPass());
}

module.exports = bundle;