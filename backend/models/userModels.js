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
        default: new Date()
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
        default: new Date()
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