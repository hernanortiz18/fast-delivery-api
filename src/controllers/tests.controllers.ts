import { Request, Response } from "express";


class TestsController {
    static helloWorld(req: Request, res: Response): Response {
        const { tokenInfo } = req.body
        return res.send(tokenInfo)
    }
}

export default TestsController