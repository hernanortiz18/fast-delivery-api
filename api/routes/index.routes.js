const express = require("express");
const router = express.Router();
const users = require("./users.routes")
const TestsController = require("../controllers/tests.controllers")
const { validateAuth } = require("../middlewares/validateAuth.middlewares")


router.use("/users", users)
router.get("/hello-world", validateAuth, TestsController.helloWorld)

module.exports = router;
