const mongoose = require('mongoose')

const CartMondel = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('shopping-carts', CartMondel)