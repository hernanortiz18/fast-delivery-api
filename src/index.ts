import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import routes from './routes/index.routes'
import db from './config/db'
import dotenv from 'dotenv'
import { createAdminUser } from './utils/index.utils'
import User from './models/User.models'
dotenv.config()

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
)
app.use((err: Error, req: Request, res: Response, next: NextFunction): express.Response => {
  return res.status(500).send(err)
})
app.use('/api', routes)

db.sync({ force: true })
  .then(async () => {
    return await User.count()
  })
  .then(async (count) => {
    if (count === 0) {
      return await createAdminUser()
    }
  })
  .then(() => {
    app.listen(3001, () => console.log('Servidor en el puerto 3001'))
  })
  .catch(console.error)

export default app
