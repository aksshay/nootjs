module.exports = function(swag, stackParser)
{
    this.swag = swag;
    this.stackParser = stackParser;

    this.addFilters = function()
    {
    }

    this.addFunctions = function()
    {
        this.swag.setFunction("stackTrace", function(stack){
            var output = "<ol>";
            var lines = stack.split("\n");

            for(var i = 1; i < lines.length; i++) {
                var line = lines[i];
                var parsed = stackParser.parseLine(line);
                output += "<li>at <strong>"+ parsed.call +"</strong> in <strong>"+parsed.filePath+"</strong> at line <strong>"+parsed.line+"</strong></li>";
            }
            output += "</ol>";

            return output;
        });
    }
}