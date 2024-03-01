import express from 'express'
import { validateAuth } from '../middlewares/validateAuth.middlewares'
import { UsersController } from '../controllers/users.controllers'

const router = express.Router()

router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.post('/logout', UsersController.logout)
router.put('/:id/forgot-password', UsersController.passRecovery)
router.get('/single/:id', UsersController.getUserById)
router.delete('/:id', UsersController.deleteUserById)
router.put('/:id', UsersController.updateUserById)
router.get('/me', validateAuth, (req, res) => { res.sendStatus(200) })
router.get('/', UsersController.getAllUsers)

export default router
