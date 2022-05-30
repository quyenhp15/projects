const mongoose = require('mongoose')

const signupTemplate = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    studentName: {
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
    }
})

module.exports = mongoose.model('students', signupTemplate)