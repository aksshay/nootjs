var AbstractBundle = require("nootjs/Component/HttpKernel/Bundle/AbstractBundle");
var MappingPass = require("nootjs/Bundle/OrmBundle/DependencyInjection/Compiler/MappingPass");
var bundle = new AbstractBundle();

bundle.boot = function() {
    bundle.addConfig("services");
    bundle.addConfig("listeners");
    bundle.addConfig("collectors");
}

bundle.build = function(container) {
    container.addCompilerPass(new MappingPass());
}

module.exports = bundle;