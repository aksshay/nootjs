var fs = require('fs');

module.exports = function (pathResolver) {

    this.pathResolver = pathResolver;

    encoding = "utf8";

    this.load = function (identifier, cb) {
        if (!fs || (cb && !fs.readFile) || !fs.readFileSync) {
            throw new Error('Unable to find file ' + identifier + ' because there is no filesystem to read from.');
        }

        if (cb) {
            fs.readFile(identifier, encoding, cb);
            return;
        }

        return fs.readFileSync(identifier, encoding);
    };

    this.resolve = function(to, from) {
        return this.pathResolver.resolve(to);
    }

};