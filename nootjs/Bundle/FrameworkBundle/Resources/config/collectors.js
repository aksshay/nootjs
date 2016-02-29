module.exports = {
    "services": {

        "http.request_collector": {
            "class": "nootjs/Bundle/FrameworkBundle/DataCollector/RequestCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

        "http.time_collector": {
            "class": "nootjs/Bundle/FrameworkBundle/DataCollector/TimeCollector",
            "arguments": ["@container"],
            "tags": [
                { name: "data_collector" }
            ]
        },

    }
}