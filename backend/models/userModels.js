const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        default: Date.now
    }
    ,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    faceID: {
        data: Buffer,
        contentType: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('students', StudentSchema)