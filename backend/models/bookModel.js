const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    produceYear: {
        type: String,
        required: false,
        default: new Date().getFullYear(),
    },
    department: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('books', BookSchema)