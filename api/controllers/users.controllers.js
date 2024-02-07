const { generateToken, validateToken } = require("../config/tokens.config")
class UsersController {
    static login(req, res) {
        const { email, password } = req.body
        let payload = {
            email: email
        }
        let token = generateToken(payload)
        res.cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
            secure: true
        })
        res.status(200).send(payload)
    }
}

module.exports = UsersController