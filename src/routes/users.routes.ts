import express from "express"
import UsersController from "../controllers/users.controllers"
const router = express.Router()

router.post("/login", UsersController.login)

export default router