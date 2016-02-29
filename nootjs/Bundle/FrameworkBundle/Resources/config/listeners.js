module.exports = {
    "services": {

        "kernel.exception_listener": {
            "class": "nootjs/Bundle/FrameworkBundle/EventListener/KernelExceptionListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.exception", method: "onKernelException" }
            ]
        },

        "kernel.controller_listener": {
            "class": "nootjs/Bundle/FrameworkBundle/EventListener/KernelControllerListener",
            "arguments": ["@container"],
            "tags": [
                { name: "event_listener", event: "kernel.controller", method: "onKernelController" }
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