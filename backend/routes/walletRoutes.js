const express = require('express')
const { buy, sell, withdraw, create, transactions } = require('../controllers/walletControllers')
const { transactionProtected } = require("../middleware/transactionMiddleware")
const { protected } = require("../middleware/authMiddleware")

// Init router
const router = express.Router()

// Routes middlewares
router.post("/buy", protected, transactionProtected, buy)
router.post("/sell", protected, transactionProtected, sell)
router.post("/withdraw", protected, transactionProtected, withdraw)
router.post("/create", protected, create)
router.get("/transactions", protected, transactions)


 module.exports = router