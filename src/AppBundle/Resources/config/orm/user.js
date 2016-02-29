module.exports = {
    "entities": {

        "AppBundle:User": {
            "class": "src/AppBundle/Entity/User",
            "tableName": "app_user",
            "orm": {

                "identifier": "id",

                "fields": {
                    "id": {
                        "type": "integer",
                        "autoIncrement": true,
                    },

                    "name": {
                        "type": "string",
                    }
                },

                "relations": {
                    "logs": {
                        "type": "oneToMany",
                        "targetEntity": "AppBundle:Log",
                        "inversedBy": "user",
                    }
                }

            }
        }

    }

};