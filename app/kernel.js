var kernel = require("nootjs/Bundle/FrameworkBundle/Http/Kernel");

kernel.registerBundles = function() {
    this.addBundle("nootjsFrameworkBundle", "nootjs/Bundle/FrameworkBundle/FrameworkBundle");
    this.addBundle("nootjsSwigBundle", "nootjs/Bundle/SwigBundle/SwigBundle");
    this.addBundle("AppBundle", "src/AppBundle/AppBundle");
    this.addBundle("AcmeBundle", "src/AcmeBundle/AcmeBundle");
}

module.exports = kernel;