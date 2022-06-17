const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('authors', AuthorSchema)