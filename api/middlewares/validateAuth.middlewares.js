const { validateToken } = require("../config/tokens.config")

function validateAuth(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).send("There's no token")

    const { user } = validateToken(token)
    if (!user) return res.status(401).send("Invalid Token")

    req.tokenInfo = user
    next()
}

module.exports = { validateAuth }