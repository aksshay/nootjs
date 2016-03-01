module.exports = function(requestStack) {

    this.onKernelRequest = function(event) {
        requestStack.add(event.getRequest(), event.getResponse());
    }
}