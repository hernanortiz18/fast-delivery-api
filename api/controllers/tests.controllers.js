const { generateToken, validateToken } = require("../config/tokens.config")

class TestsController {
    static helloWorld(req, res) {
        const { tokenInfo } = req
        res.send(tokenInfo)
    }
}

module.exports = TestsController