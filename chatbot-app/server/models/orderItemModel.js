const mongoose = require('mongoose')

const OrderItemModel = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('order_items', OrderItemModel)