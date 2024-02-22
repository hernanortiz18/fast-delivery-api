import { Request, Response } from "express";
import { generateToken } from "../config/tokens.config"

class UsersController {
    static login(req: Request, res: Response): Response {
        const { email } = req.body
        let payload = {
            email: email
        }
        let token = generateToken(payload)
        res.cookie("token", token, {
            sameSite: "none",
            httpOnly: true,
            secure: true
        })
        return res.status(200).send(payload)
    }
}

export default UsersController