module.exports = {
    "services": {

        "kernel.controller_listener": {
            "class": "nootjs/Bundle/FrameworkBundle/EventListener/KernelControllerListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.controller", method: "onKernelController" }
            ]
        },

        "data_collector_listener": {
            "class": "nootjs/Bundle/FrameworkBundle/EventListener/DataCollectorListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.response", method: "onKernelResponse" },
                { name: "event_listener", event: "kernel.request", method: "onKernelRequest" },
            ]
        },

        "kernel.finish_request_listener": {
            "class": "nootjs/Bundle/FrameworkBundle/EventListener/KernelFinishRequestListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.finish_request", method: "onKernelFinishRequest" }
            ]
        },

    }
}