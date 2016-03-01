module.exports = {
    "services": {
        "swag": {
            "class": "nootjs/Component/Swag/Swag",
            "arguments": ["@swag.filesystem_loader"]
        },

        "swag.bundle_path_resolver": {
            "class": "nootjs/Bundle/SwagBundle/PathResolver/BundlePathResolver",
            "arguments": ["@kernel"],
        },

        "swag.filesystem_loader": {
            "class": "nootjs/Component/Swag/Loaders/Filesystem",
            "arguments": ["@swag.bundle_path_resolver"],
        },
    }
}