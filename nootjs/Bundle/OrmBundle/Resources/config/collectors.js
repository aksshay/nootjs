module.exports = {
    "services": {

        "orm.query_collector": {
            "class": "nootjs/Bundle/OrmBundle/DataCollector/QueryCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

    }
}