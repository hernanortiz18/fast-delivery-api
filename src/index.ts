import express, { NextFunction, Request, Response } from 'express'
require('dotenv').config() // eslint-disable-line no-alert
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import routes from './routes/index.routes'
import db from './config/db.config'
import { createAdminUser } from './utils/index.utils'

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

if (require.main === module) {
  db.sync({ force: false })
    .then(async () => {
      return await createAdminUser()
    })
    .then(() => {
      app.listen(3001, () => console.log('Servidor en el puerto 3001'))
    })
    .catch(console.error)
}

export default app
