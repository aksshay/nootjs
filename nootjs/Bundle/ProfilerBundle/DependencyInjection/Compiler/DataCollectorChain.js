module.exports = function()
{
    this.dataCollectors = [];

    this.addDataCollector = function(dataCollector) {
        this.dataCollectors.push(dataCollector);
    }

    this.getDataCollectors = function() {
        return this.dataCollectors;
    }
};