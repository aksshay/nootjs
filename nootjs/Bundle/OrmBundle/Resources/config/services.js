module.exports = {
    "services": {

        "orm": {
            "class": "nootjs/Component/Orm/Orm",
            "arguments": ["@orm.entity_manager"],
        },

        "orm.entity_manager": {
            "class": "nootjs/Component/Orm/EntityManager",
            "arguments": [
                "%database_host%",
                "%database_user%",
                "%database_password%",
                "%database_name%"
            ],
        }

    }
};