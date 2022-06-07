const asyncHandler = require('express-async-handler')
const { generateWallet } = require("../chains/Chain")
const { fetchLivePrices } = require("../exchangeRates/exchangeRates")
const { supportedCoins, } = require("../coins/coins")

// Models
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")
const Transaction = require("../models/transactionModel")
const Order = require("../models/orderModel")



// @desc    Buy a certain coin
// @route   POST /api/wallet/buy
// @access  Private
const buy = asyncHandler(async (req, res) => {

    // Check if amount is valid
    if (parseFloat(req.amount) < 0) {
        res.status(401)
        throw new Error("Invalid amount")
    }


    // Check if amount does not exceed tether balance
    const tetherWallet = (await req.user.populate('balanceWallet')).balanceWallet
    const wallet = await Wallet.findOne({ address: req.address })
    const livePrice = await fetchLivePrices(wallet.chain)
    
    if (parseFloat(tetherWallet.balance) < ( parseFloat(req.amount) * parseFloat(livePrice[wallet.chain]) )) {
        res.status(401)
        throw new Error("Amount exceeds USDT balance")
    }

    // execute the buying, update tether balnace and the wallet balance
    await Wallet.findOneAndUpdate({ address: tetherWallet.address }, {$inc: {balance: -(parseFloat(req.amount) * parseFloat(livePrice[wallet.chain]))}})
    const updatedWallet = await Wallet.findOneAndUpdate({ address: req.address }, {$inc: {balance: parseFloat(req.amount)}}, {new: true})

    // create a new order for orders history
    const newOrder = await Order.create({
        amount: req.amount,
        exchangeRate: livePrice[wallet.chain],
        totalPrice: (parseFloat(req.amount) * parseFloat(livePrice[wallet.chain])).toString(),
        address: req.address,
        orderType: "Buy",
        chain: wallet.chain
    })

    // add the order to the user model
    req.user.orders.push(newOrder._id)
    await req.user.save()



    // return the response of the newly updated wallet after the order
    res.json(newOrder) 

})

// @desc    Sell a certain coin
// @route   POST /api/wallet/sell
// @access  Private
const sell = asyncHandler(async (req, res) => {

    // check if amount is valid
    if (parseFloat(req.amount) < 0) {
        res.status(401)
        throw new Error("Invalid amount")
    }

    // consts
    const tetherWallet = (await req.user.populate('balanceWallet')).balanceWallet
    const wallet = await Wallet.findOne({ address: req.address })
    const livePrice = await fetchLivePrices(wallet.chain)

    if (parseFloat(wallet.balance) <  parseFloat(req.amount)) {
        res.status(401)
        throw new Error("Amount exceeds balance")
    }

    

    // if no errors are thrown, execute the selling order
    wallet.balance = parseFloat(wallet.balance) - parseFloat(req.amount)
    await Wallet.findOneAndUpdate({ address: tetherWallet.address }, {$inc: {balance: +(parseFloat(req.amount) * parseFloat(livePrice[wallet.chain]))}})
    wallet.save()

    // create a new order for orders history
    const newOrder = await Order.create({
        amount: req.amount,
        exchangeRate: livePrice[wallet.chain],
        totalPrice: (parseFloat(req.amount) * parseFloat(livePrice[wallet.chain])).toString(),
        address: req.address,
        orderType: "Sell",
        chain: wallet.chain
    })

    // add the order to the user model
    req.user.orders.push(newOrder._id)
    await req.user.save()

    // return the response of the newly updated wallet after the order
    res.json(newOrder) 

})

// @desc    Withdraw to another address
// @route   POST /api/wallet/sell
// @access  Private
const withdraw = asyncHandler(async (req, res) => {

    // req body params
    const { targetAddress } = req.body
    const address = req.address

    // Check if needed fields are not empty
    if (!targetAddress) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const walletExists = await Wallet.findOne({ address })
    const targetWalletExists = await Wallet.findOne({ address: targetAddress })

    // Check if target wallet exists, (personal wallet is checked in transaction middleware)
    if (!targetWalletExists) {
        res.status(400)
        throw new Error("target address wallet does not exist invalid.")
    }
    
    // Check if both addresses are on the same chain
    if (walletExists.chain !== targetWalletExists.chain) {
        res.status(400)
        throw new Error("Can't complete transaction between two different chains")
    }

    // Check if withdrawn amount is less than balance
    if (parseFloat(req.amount) > 0 && (parseFloat(walletExists.balance) > parseFloat(req.amount))) {

        try {

            // execute the transaction
            walletExists.balance = parseFloat(walletExists.balance) - parseFloat(req.amount)
            targetWalletExists.balance = parseFloat(targetWalletExists.balance) + parseFloat(req.amount)
            await walletExists.save()
            await targetWalletExists.save()

            // save the transaction in wallet, targetWallet, and transaction model ( referenced document )
            const newTransaction = await Transaction.create({
                amount: req.amount,
                address: address,
                targetAddress: targetAddress,
                chain: walletExists.chain,
            })

            // Update address and target address transactions
            walletExists.transactions.push(newTransaction._id)
            targetWalletExists.transactions.push(newTransaction._id)

            await walletExists.save()
            await targetWalletExists.save()

            // return the response
            res.json({status: "execute"})


    
        } catch {
            res.status(400)
            throw new Error("The transaction didn't go through")
        }    
    } else {
        res.status(400)
        throw new Error("Amount exceeds balance")
    }

    
})


// @desc    Create a new wallet
// @route   POST /api/wallet/create
// @access  Private
const create = asyncHandler(async (req, res) => {
    const chain = req.body.chain
    const userId = req.user.id

    // Check for needed fields
    if (!chain) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // check if coin is supported
    if (!(supportedCoins.includes(chain))) {
        res.status(400)
        throw new Error("Invalid Chain")
    }

    // Create the wallet
    const { privateKey, address } = generateWallet()

    const newWallet = await Wallet.create({
        chain: chain,
        address: address,
        privateKey: privateKey,
        balance: "0.0",
        user: userId
    })

    // Update the user's wallets
    await User.findByIdAndUpdate(userId, { $push: { wallets: newWallet._id } })

    // send back response
    res.status(201).json(newWallet)


    
})

// @desc    View wallet transactions
// @route   POST /api/wallet/transactions
// @access  Private
const transactions = asyncHandler(async (req, res) => {
    const { address } = req.query

    // grab transactions
    const transactions = (await Wallet.findOne({address: address}).populate("transactions")).transactions

    res.status(200).json({ transactions })

})


module.exports = { buy, sell, withdraw, create, transactions }