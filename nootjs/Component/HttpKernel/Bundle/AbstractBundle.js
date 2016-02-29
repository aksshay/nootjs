var AbstractBundle = function() {

    this.configs = {};

    this.boot = function() {

    }

    this.processConfigs = function(configs, container) {

    }

    this.build = function() {

    }

    this.addConfig = function(path) {
        var name = path.replace("/", ":");
        this.configs[name] = require(this.directory + "/Resources/config/"+path);
    }
}
module.exports = AbstractBundle;