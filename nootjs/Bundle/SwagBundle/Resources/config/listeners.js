module.exports = {
    "services": {

        "nootjs.swag.exception_listener": {
            "class": "nootjs/Bundle/SwagBundle/EventListener/KernelExceptionListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.exception", method: "onKernelException" }
            ]
        },

    }
}