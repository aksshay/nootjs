module.exports = function()
{
    this.process = function(container) {

        var chainDefinition = container.findDefinition("data_collector_chain");

        var dataCollectors = container.findTaggedServices("data_collector");

        for(var id in dataCollectors) {
            chainDefinition.calls.push(["addDataCollector", ["@"+id]]);
        }
    }
};