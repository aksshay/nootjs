var fs = require("fs");
var merge = require("merge");

module.exports = function() {

    this.onPreCompile = function(container) {

        var bundles = container.get("kernel").getRegisteredBundles();
        for(var k in bundles) {
            var bundle = bundles[k];
            // Load mapping configs

            var path = bundle.directory + "/Resources/config/orm/";
            if(fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function(file) {
                    bundle.addConfig("orm/"+file);
                }.bind(bundle));
            };
        }

        // Load entities from configs
        var kernel = container.get("kernel");
        var bundles = kernel.getRegisteredBundles();
        var entityManager = container.get("orm.entity_manager");
        var entities = {};
        for(var k in bundles) {
            var bundle = bundles[k];
            for(var c in bundle.configs)
            {
                var config = bundle.configs[c];
                if(config.entities) {
                    entities = merge(entities, config.entities);
                }
            }
        }

        entityManager.loadEntities(entities);
        entityManager.connect();
    }



    this.onPostCompile = function(bundle) {

    }
}