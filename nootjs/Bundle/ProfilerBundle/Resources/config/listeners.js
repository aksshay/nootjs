module.exports = {
    "services": {

        "collect_listener": {
            "class": "nootjs/Bundle/ProfilerBundle/EventListener/CollectListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.response", method: "onKernelResponse" },
            ]
        },

    }
}