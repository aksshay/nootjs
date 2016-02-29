module.exports = {
    "services": {

        "debug_listener": {
            "class": "nootjs/Bundle/DebugBundle/EventListener/DebugListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.exception", method: "onKernelException" }
            ]
        },

    }
}