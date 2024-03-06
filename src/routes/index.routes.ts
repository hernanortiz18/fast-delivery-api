import express from 'express'
import users from './users.routes'
import packages from './packages.routes'
import { TestsController } from '../controllers/tests.controllers'
import { validateAuth } from '../middlewares/validateAuth.middlewares'
const router = express.Router()

router.use('/users', users)
router.use('/packages', packages)
router.get('/hello-world', validateAuth, TestsController.helloWorld)

export default router
