module.exports = {
    "services": {
        "kernel": {
            "class": "app/AppKernel",
            "arguments": [],
        },

        "templating": {
            "class": "nootjs/Bundle/FrameworkBundle/Templating/Templating",
            "arguments": ["@swag"],
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

        "data_collector_chain": {
            "class": "nootjs/Bundle/FrameworkBundle/DependencyInjection/Compiler/DataCollectorChain",
            "calls": [
                ["build", ["@container"]]
            ]
        },

        "http.controller_resolver": {
            "class": "nootjs/Component/HttpKernel/Resolver/ControllerResolver",
            "arguments": ["@container"]
        },

        "http.resource_resolver": {
            "class": "nootjs/Component/HttpKernel/Resolver//ResourceResolver",
            "arguments": ["@container"]
        },

        "http.request_enricher": {
            "class": "nootjs/Component/HttpKernel/Utils//RequestEnricher",
            "arguments": []
        },
    }
}