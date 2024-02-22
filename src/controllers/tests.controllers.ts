import { Request, Response } from 'express'

export const TestsController = {
  helloWorld (req: Request, res: Response): Response {
    const { tokenInfo } = req.body
    return res.send(tokenInfo)
  }
}
