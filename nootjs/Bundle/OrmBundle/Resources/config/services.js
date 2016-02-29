module.exports = {
    "services": {

        "orm": {
            "class": "nootjs/Bundle/OrmBundle/Utils/Orm",
            "arguments": ["@orm.entity_manager"],
        },

        "orm.entity_manager": {
            "class": "nootjs/Bundle/OrmBundle/Manager/EntityManager",
            "arguments": [
                "%database_host%",
                "%database_user%",
                "%database_password%",
                "%database_name%"
            ],
        }

    }
};