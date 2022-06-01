const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/studentModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.post('/signup', (request, response) => {
    const signupStudent = new User({
        studentID: request.body.studentID,
        studentName: request.body.studentName,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        password: request.body.password,
    })
    console.log("SIGNUP API receive request: ", signupStudent)
    signupStudent.save()
        .then(data => {
            response.json({ status: 'ok', data })
            console.log("Signup API pass: ", data)
        })
        .catch(error => {
            if (error.code === 11000) {
                console.log("User exist => FAIL")
                return response.json({ status: 'error', error: 'User already exits' })
            }
            console.log("ERROR at Signup API")
            throw error
        })
})

router.post('/login', async (request, response) => {

    console.log("Login API called")

    const { studentID, password } = request.body
    const user = await User.findOne({ studentID }).lean()

    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid student ID' })
    }

    if (password === user.password) {    //check password
        const token = jwt.sign(
            {
                id: user._id,
                studentID: user.studentID
            },
            JWT_SECRET
        )
        return response.json({ status: 'ok', data: token })
    } else {
        response.json({ status: 'error', error: 'Wrong password' })
    }

})

module.exports = router