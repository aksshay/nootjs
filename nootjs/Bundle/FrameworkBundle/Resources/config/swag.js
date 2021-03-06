module.exports = {
    "services": {

        "nootjs.framework.swag.routing_extension": {
            "class": "nootjs/Bundle/FrameworkBundle/Swag/RoutingExtension",
            "arguments": ["@swag", "@router"],
            "tags": [
                {"name": "swag_extension"},
            ]
        },

        "nootjs.framework.swag.asset_extension": {
            "class": "nootjs/Bundle/FrameworkBundle/Swag/AssetExtension",
            "arguments": ["@swag", "@kernel"],
            "tags": [
                {"name": "swag_extension"},
            ]
        },

    }
}