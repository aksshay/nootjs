module.exports = function()
{
    this.process = function(container) {

        var definition = container.findDefinition("swag");

        var taggedServices = container.findTaggedServices("swag_extension");

        for(var id in taggedServices) {
            definition.calls.push(["addExtension", ["@"+id]]);
        }
    }
};