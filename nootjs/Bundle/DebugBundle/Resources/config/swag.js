module.exports = {
    "services": {


        "nootjs.debug.swag.debug_extension": {
            "class": "nootjs/Bundle/DebugBundle/Swag/DebugExtension",
            "arguments": ["@swag", "@stack_parser"],
            "tags": [
                {"name": "swag_extension"},
            ]
        },
    }
}