const mongoose = require('mongoose')

const CartItemModel = new mongoose.Schema({
    bookID: {
        type: String,
        required: true
    },
    cartID: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('shopping-cart-items', CartItemModel)