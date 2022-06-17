const mongoose = require('mongoose')

const BookAuthorSchema = new mongoose.Schema({
    authorID: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('book-author', BookAuthorSchema)