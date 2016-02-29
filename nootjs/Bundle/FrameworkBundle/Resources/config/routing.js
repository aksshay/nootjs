module.exports = {
    "services": {
        "router": {
            "class": "nootjs/Component/Routing/Router",
            "arguments": ["@kernel", "@router.url_matcher"],
        },

        "router.url_matcher": {
            "class": "nootjs/Component/Routing/Matcher/UrlMatcher",
        },
    }
}