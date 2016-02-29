module.exports = {
    "services": {
        "swag": {
            "class": "nootjs/Component/Swag/Swag",
            "arguments": ["@swag.extension_chain", "@swag.filesystem_loader"]
        },

        "swag.view_resolver": {
            "class": "nootjs/Bundle/SwagBundle/Utils/ViewResolver",
            "arguments": ["@kernel"],
        },

        "swag.filesystem_loader": {
            "class": "nootjs/Component/Swag/Loaders/Filesystem",
            "arguments": ["@swag.view_resolver"],
        },

        "swag.extension_chain": {
            "class": "nootjs/Bundle/SwagBundle/DependencyInjection/Compiler/SwagExtensionChain",
            "calls": [
                ["build", ["@container"]]
            ]
        },
    }
}