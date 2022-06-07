const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    amount: {
      type: String,
      required: [true, 'Please add an amount'],
    },
    exchangeRate: {
        type: String,
        required: [true, 'Please add an exchange rate'],
    },
    totalPrice: {
        type: String,
        required: [true, 'Please add an total price'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        
    },
    orderType: {
        type: String,
        required: [true, "Please add an order type"]
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

module.exports = mongoose.model('Order', orderSchema)