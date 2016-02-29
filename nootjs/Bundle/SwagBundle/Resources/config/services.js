module.exports = {
    "services": {
        "swag": {
            "class": "nootjs/Bundle/SwagBundle/Swag",
            "arguments": ["@swag.extension_chain"]
        },

        "swag.extension_chain": {
            "class": "nootjs/Bundle/SwagBundle/DependencyInjection/Compiler/SwagExtensionChain",
            "calls": [
                ["build", ["@container"]]
            ]
        },
    }
}