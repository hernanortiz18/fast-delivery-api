import { NextFunction, Request, Response } from "express";
import { validateToken } from "../config/tokens.config";

interface TokenAttributes {
    email: string,
}


export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) return res.status(401).send("There's no token")
    const decodedToken = validateToken(token) as TokenAttributes
    if (!decodedToken.email) return res.status(401).send("Invalid Token")

    req.body.tokenInfo = decodedToken
    next()
    return
}