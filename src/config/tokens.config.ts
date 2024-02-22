import jwt, { JwtPayload } from "jsonwebtoken"
const SECRET = "FDELIVERY"

interface PayloadAttributes {
    email: string
}
interface DecodedToken {
    user: object
}

export const generateToken = (payload: PayloadAttributes): string => {
    const token: string = jwt.sign(payload, SECRET, { expiresIn: "2d" })
    return token
}

export const validateToken = (token: string): string | JwtPayload | DecodedToken => {
    return jwt.verify(token, SECRET)
}
