module.exports = {
    "services": {

        "http.request_data_collector": {
            "class": "nootjs/Component/HttpKernel/DataCollector/RequestDataCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

        "http.time_data_collector": {
            "class": "nootjs/Component/HttpKernel/DataCollector/TimeDataCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

    }
}