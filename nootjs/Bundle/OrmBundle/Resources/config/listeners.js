module.exports = {
    "services": {


        "orm.container_listener": {
            "class": "nootjs/Bundle/OrmBundle/EventListener/ContainerListener",
            "arguments": [],
            "tags": [
                { name: "event_listener", event: "container.pre_compile", method: "onPreCompile" },
                { name: "event_listener", event: "container.post_compile", method: "onPostCompile" },
            ]
        },

    }
};