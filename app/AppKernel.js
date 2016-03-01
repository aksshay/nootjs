var kernel = require("nootjs/Component/HttpKernel/Kernel");
var merge = require("merge");

var nootjsBundles = {
    "NootjsFrameworkBundle": "nootjs/Bundle/FrameworkBundle/FrameworkBundle",
    "NootjsSwagBundle": "nootjs/Bundle/SwagBundle/SwagBundle",
    "NootjsOrmBundle": "nootjs/Bundle/OrmBundle/OrmBundle",
};

var appBundles = {
    "AppBundle": "src/AppBundle/AppBundle",
    "AcmeBundle": "src/AcmeBundle/AcmeBundle",
};

var devBundles = {
    "NootjsDebugBundle": "nootjs/Bundle/DebugBundle/DebugBundle",
    "NootjsProfilerBundle": "nootjs/Bundle/ProfilerBundle/ProfilerBundle",
};

var thirdPartyBundles = {

};
var bundles = merge(nootjsBundles, appBundles, devBundles, thirdPartyBundles);

kernel.registerBundles(bundles);

module.exports = kernel;