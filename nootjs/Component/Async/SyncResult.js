var SynchResult = function(sleepTime)
{
    this.result = null;
    this.done = false;
    this.sleepTime = sleepTime || 10;

    this.sync = function() {
        while(!this.done) {
            require("deasync").sleep(this.sleepTime);
        }
        return this.result;
    }

    this.return = function(result) {
        this.done = true;
        this.result = result;
    }
}
module.exports = SynchResult;