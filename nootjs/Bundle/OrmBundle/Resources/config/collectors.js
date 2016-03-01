module.exports = {
    "services": {

        "orm.query_data_collector": {
            "class": "nootjs/Component/Orm/DataCollector/QueryDataCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

    }
}