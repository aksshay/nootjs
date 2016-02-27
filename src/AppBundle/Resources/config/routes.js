module.exports = {
    "routes": {
        "app.default.index": {
            "pattern": "/hello/{name}",
            "controller": "AppBundle:App:index",
            "methods": ["GET", "POST"],
        }
    }
}