const express = require('express')
const { registerUser, loginUser, dashboardUser } = require("../controllers/userController")
const { protected } = require("../middleware/authMiddleware")

// Init router
const router = express.Router()

// Routes middlewares
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/dashboard", protected, dashboardUser)


 module.exports = router