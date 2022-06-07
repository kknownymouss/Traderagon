
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Wallet = require('../models/walletModel')

// Check if the jwt user is same as the address's user to allow transactions
const transactionProtected = asyncHandler(async (req, res, next) => {

    // grab params
    const userId = req.user.id
    const { address, amount } = req.body

    // check for fields
    if (!address || !amount) {
        res.status(400)
        throw new Error("Please add all fields")

    } 



    // Grab the wallet and check if it exists
    const wallet = (await Wallet.findOne({ address }).populate('user'))

    if (!wallet) {
        res.status(400)
        throw new Error("Not authorizedd to make this transaction, wallet does not exist")
    }
    
    // Check if wallet's user and user are same and assign new req variables
    if (userId == wallet.user.id) {
        req.address = address
        req.amount = amount
        
        next() // move to next middleware

    } else {
        res.status(400)
        throw new Error("Not authorizated to make this transaction")
        
    }
})

module.exports = { transactionProtected }