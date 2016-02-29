module.exports = {
    "entities": {

        "AppBundle:Log": {
            "class": "src/AppBundle/Entity/Log",
            "tableName": "app_log",
            "orm": {

                "identifier": "id",

                "fields": {
                    "id": {
                        "type": "integer",
                        "autoIncrement": true,
                    },

                    "body": {
                        "type": "string",
                    }
                },

                "relations": {
                    "user": {
                        "type": "manyToOne",
                        "targetEntity": "AppBundle:User",
                        "fieldName": "user_id",
                        "referencedColumnName": "id",
                        "inversedBy": "logs",
                    }
                }

            }
        }

    }

};