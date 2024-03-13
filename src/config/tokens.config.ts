import jwt, { JwtPayload } from 'jsonwebtoken'
import { PayloadAttributes } from '../types'

interface DecodedToken {
  user: object
}

export const generateToken = (payload: PayloadAttributes): string => {
  const token: string = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2d' })
  return token
}

export const validateToken = (token: string): string | JwtPayload | DecodedToken => {
  return jwt.verify(token, process.env.SECRET as string)
}
