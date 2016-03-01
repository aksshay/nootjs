module.exports = {
    "services": {

        "router_listener": {
            "class": "nootjs/Component/Routing/EventListener/RouterListener",
            "arguments": ["@router"],
            "tags": [
                { name: "event_listener", event: "kernel.request", method: "onKernelRequest" }
            ]
        },

        "request_stack_listener": {
            "class": "nootjs/Component/HttpFoundation/EventListener/RequestStackListener",
            "arguments": ["@http.request_stack"],
            "tags": [
                { name: "event_listener", event: "kernel.request", method: "onKernelRequest" }
            ]
        },

    }
}