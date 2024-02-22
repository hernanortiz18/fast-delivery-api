import { NextFunction, Request, Response } from 'express'
import { validateToken } from '../config/tokens.config'

interface TokenAttributes {
  email: string
}

export const validateAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token: string = req.cookies.token
  if (token === undefined || token === null) {
    res.status(401).send("There's no token")
    return
  }
  const decodedToken = validateToken(token) as TokenAttributes
  if (decodedToken.email === undefined || decodedToken.email === null) {
    res.status(401).send('Invalid Token')
    return
  }

  req.body.tokenInfo = decodedToken
  next()
}
