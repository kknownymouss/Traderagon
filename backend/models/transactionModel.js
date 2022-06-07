const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: String,
      required: [true, 'Please add an amount'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        
    },
    targetAddress: {
        type: String,
        required: [true, 'Please add a target address'],
    },
    chain: {
      type: String,
      required: [true, 'Please add a chain']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)
