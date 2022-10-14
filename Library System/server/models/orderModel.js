const mongoose = require('mongoose')

const OrderModel = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    dateOfBooking: {
        type: Date,
        required: false,
        default: new Date().now
    },
    dateOfReturn: {
        type: Date,
        required: false,
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'borrowing'
    }
})

module.exports = mongoose.model('orders', OrderModel)