var chain = function()
{
    this.extensions = [];

    this.addExtension = function(extension) {
        this.extensions.push(extension);
    }

    this.getExtensions = function() {
        return this.extensions;
    }

    this.build = function(container) {
        var extensions = container.findByTag("swag_extension");
        for(var k = 0; k < extensions.length; k++) {
            var extension = extensions[k];
            this.addExtension(extension.instance);
        }
    }
};

module.exports = chain;