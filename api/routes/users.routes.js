const express = require("express")
const UsersController = require("../controllers/users.controllers")
const router = express.Router()

router.post("/login", UsersController.login)

module.exports = router