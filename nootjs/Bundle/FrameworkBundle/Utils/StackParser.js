var fs = require("fs");

module.exports = function() {

    this.parse = function(stack) {
        var output = [];
        var lines = stack.split("\n");
        for(var i = 1; i < lines.length; i++) {
            var line = lines[i];
            var parsed = this.parseLine(line);
            output.push(parsed);
        }

        return output;
    }

    /**
     * Parse one line of a stack trace
     * @param method
     * @param arguments
     */
    this.parseLine = function(line) {
        var expression = new RegExp("at (.+) \((.+)\)");
        var matches = line.match(expression);


        var call = matches[1];
        var location = matches[2].substr(1);

        var locationParts = location.split(":");
        var filePath = locationParts[0];
        var line = locationParts[1];
        var column = locationParts[2];

        var lines = [];
        if(fs.existsSync(filePath)){
            lines = fs.readFileSync(filePath, 'utf8').split("\n");

            var padding = 10;
            var start = Math.max(0, (line - 1) -padding);
            var end = Math.min(lines.length, (line - 1) + padding);
            lines = lines.slice(start, end);
        }

        return {
            "call": call,
            "filePath": filePath,
            "line": line,
            "column": column,
            "lines": lines,
            "start": start,
            "end": end,
        };
    }

}