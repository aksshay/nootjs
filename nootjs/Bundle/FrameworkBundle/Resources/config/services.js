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
            "class": "nootjs/Component/EventDispatcher/ContainerAwareEventDispatcher",
            "arguments": ["@container"]
        },

        "event_listener_pass": {
            "class": "nootjs/Bundle/FrameworkBundle/DependencyInjection/Compiler/EventListenerPass",
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
            "arguments": ["@kernel"]
        },

        "http.request_enricher": {
            "class": "nootjs/Component/HttpKernel/Utils//RequestEnricher",
            "arguments": []
        },

        "http.request_stack": {
            class: "nootjs/Component/HttpFoundation/RequestStack",
            arguments: [],
        },

        "argument_matcher": {
            "class": "nootjs/Component/ArgumentMatcher/ArgumentMatcher",
        },
    }
}