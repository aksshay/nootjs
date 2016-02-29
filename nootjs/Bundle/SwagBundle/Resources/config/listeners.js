module.exports = {
    "services": {

        "nootjs.swag.error_listener": {
            "class": "nootjs/Bundle/SwagBundle/EventListener/ErrorListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.exception", method: "onKernelException" }
            ]
        },

    }
}