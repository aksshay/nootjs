module.exports = function()
{
    this.dataCollectors = [];

    this.addDataCollector = function(dataCollector) {
        this.dataCollectors.push(dataCollector);
    }

    this.getDataCollectors = function() {
        return this.dataCollectors;
    }

    this.build = function(container) {
        var dataCollectors = container.findByTag("data_collector");
        for(var k = 0; k < dataCollectors.length; k++) {
            var dataCollector = dataCollectors[k];
            this.addDataCollector(dataCollector.instance);
        }
    }
};