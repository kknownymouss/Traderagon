const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const { generateWallet } = require("../chains/Chain")

// Models
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")


// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    // request body data
    const { name, email, password } = req.body

    // Check if all fields are not empty
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the user's password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the user
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    // Create the default wallet
    const { privateKey, address } = generateWallet()

    const newWallet = await Wallet.create({
        chain: "USDT",
        address: address,
        privateKey: privateKey,
        balance: "10000.0",
        user: newUser.id
    })

     // Create the wallet
     const btcWallet = generateWallet()
     const privateKeyBTC = btcWallet.privateKey
     const addressBTC = btcWallet.address

     const newBTCWallet = await Wallet.create({
         chain: "BTC",
         address: addressBTC,
         privateKey: privateKeyBTC,
         balance: "0.0",
         user: newUser.id
     })
 
     // Update the user's wallets ny adding btc wallet
     await User.findByIdAndUpdate(newUser.id, { $push: { wallets: newBTCWallet._id } })
 

    // Update the user's wallets by adding the balance wallet
    const updatedUser = await User.findByIdAndUpdate(newUser.id, { balanceWallet: newWallet._id } , {new: true}).populate("balanceWallet")

    // Returns user object alongside the jwt
    if (updatedUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            balanceWallet: updatedUser.balanceWallet,
            token: generateJWT(newUser.id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})


// @desc    Login
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    // request body data
    const { email, password } = req.body

    // Check if all fields are not empty
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists && ( await bcrypt.compare(password, userExists.password))) {
        res.status(201).json({
            _id : userExists.id,
            name: userExists.name,
            email: userExists.email,
            balanceWallet: (await userExists.populate('balanceWallet')).balanceWallet,
            wallets: (await userExists.populate('wallets')).wallets,
            token: generateJWT(userExists.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials.")
    }

})

// @desc    Get user data
// @route   GET /api/users/dashboard
// @access  Private
const dashboardUser = asyncHandler(async (req, res) => {
    res.status(200).json(await User.findById(req.user.id).populate({
        path: "wallets",
        populate: { path: 'transactions' }
    }).populate("balanceWallet")
    .populate("orders"))
    
})

// Creates a jwt
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    dashboardUser
}