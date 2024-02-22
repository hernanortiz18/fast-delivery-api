import express from "express"
import users from "./users.routes"
import TestsController from "../controllers/tests.controllers"
import { validateAuth } from "../middlewares/validateAuth.middlewares"
const router = express.Router()


router.use("/users", users)
router.get("/hello-world", validateAuth, TestsController.helloWorld)

export default router