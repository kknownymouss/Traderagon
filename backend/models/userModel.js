const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    balanceWallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet"
    },
    wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"
      }
    ],
    orders : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
