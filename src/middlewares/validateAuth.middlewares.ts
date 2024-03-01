import { NextFunction, Request, Response } from 'express'
import { validateToken } from '../config/tokens.config'
import { TokenAttributes } from '../types'

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

export const validateAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token: string = req.cookies.token
  if (token === undefined || token === null) {
    res.status(401).send("There's no token")
    return
  }
  const decodedToken = validateToken(token) as TokenAttributes
  if (decodedToken.email === undefined || decodedToken.email === null) {
    res.status(401).send('Invalid Token')
    return
  } else if (decodedToken.role !== 'Admin') {
    res.status(403).send('User is not admin')
    return
  }
  req.body.tokenInfo = decodedToken
  next()
}
