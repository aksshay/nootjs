module.exports = function()
{
    this.process = function(container) {

        var definition = container.findDefinition("data_collector_chain");

        

        var dataCollectors = container.findByTag("data_collector");
        for(var k = 0; k < dataCollectors.length; k++) {
            var dataCollector = dataCollectors[k];
            this.addDataCollector(dataCollector.instance);
        }
    }
};