import { Request, Response } from 'express'
import { generateToken } from '../config/tokens.config'

export const UsersController = {
  login (req: Request, res: Response): Response {
    const { email } = req.body
    const payload = {
      email
    }
    const token = generateToken(payload)
    res.cookie('token', token, {
      sameSite: 'none',
      httpOnly: true,
      secure: true
    })
    return res.status(200).send(payload)
  }
}
