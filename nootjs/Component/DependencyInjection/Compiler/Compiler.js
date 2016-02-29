module.exports = function() {

    this.passes = [];

    this.addPass = function(pass) {
        this.passes.push(pass);
    }

    this.compile = function(container) {
        // Execute compiler passes
        for(var i = 0; i < this.passes.length; i++) {
            var pass = this.passes[i];
            pass.process(container);
        }
        container.isCompiled = true;
    }
}