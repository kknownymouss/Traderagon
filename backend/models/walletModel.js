const mongoose = require('mongoose')


const walletSchema = mongoose.Schema(
    {
        chain: {
            type: String,
            required : [true, "Please add a chain"]
        },
        address: {
            type: String,
            required : [true, "Please add an address"],
            unique: true
        },
        privateKey: {
            type: String,
            required : [true, "Please add a private key"],
            unique: true
        },
        balance: {
            type: mongoose.Types.Decimal128,
            default: 0.0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        transactions : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction"
            }

        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Wallet', walletSchema)