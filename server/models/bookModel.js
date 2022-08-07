const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    bookName: {
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
    },
    available: {
        type: Number,
        required: true
    },
    location: {
        type: String,
    },
    authorName: {
        type: Object
    }
})

BookSchema.index({
    bookName: 1,
    produceYear: 1,
    department: 1,
    qty: 1,
    available: 1,
    location: 1,
    authorName: 1
})

module.exports = mongoose.model('books', BookSchema)