module.exports = {
    "services": {
        "kernel": {
            "class": "nootjs/Bundle/FrameworkBundle/Http/Kernel",
            "arguments": [],
        },

        "templating": {
            "class": "nootjs/Bundle/FrameworkBundle/Templating/Templating",
            "arguments": ["@swag", "@kernel"],
        },

        "router": {
            "class": "nootjs/Bundle/FrameworkBundle/Routing/Router",
            "arguments": ["@kernel", "@router.matcher"],
        },

        "router.matcher": {
            "class": "nootjs/Bundle/FrameworkBundle/Routing/Matcher",
        },

        "event_dispatcher": {
            "class": "nootjs/Bundle/FrameworkBundle/EventDispatcher/EventDispatcher",
            "arguments": ["@event_listener_chain"]
        },


        "event_listener_chain": {
            "class": "nootjs/Bundle/FrameworkBundle/DependencyInjection/Compiler/EventListenerChain",
            "calls": [
                ["build", ["@container"]]
            ]
        },

        "http.controller_resolver": {
            "class": "nootjs/Bundle/FrameworkBundle/Http/ControllerResolver",
            "arguments": ["@container"]
        },

        "http.resource_resolver": {
            "class": "nootjs/Bundle/FrameworkBundle/Http/ResourceResolver",
            "arguments": ["@container"]
        },
    }
}