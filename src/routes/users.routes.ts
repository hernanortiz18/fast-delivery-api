import express from 'express'
import { validateAuth} from '../middlewares/validateAuth.middlewares'
import { UsersController } from '../controllers/users.controllers'

const router = express.Router()

router.get("/single/:id", validateAuth, UsersController.getUserById)
router.post("/login", UsersController.login)
router.delete("/:id", validateAuth, UsersController.deleteUserById)
router.get("/", validateAuth, UsersController.getAllUsers)

export default router
