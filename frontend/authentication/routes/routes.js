const express = require('express')
const router = express.Router()
const signupTemplateCopy = require('../models/models')

router.post('/signup', (request, response) => {
    const signupStudent = new signupTemplateCopy({
        studentID: request.body.studentID,
        studentName: request.body.studentName,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        password: request.body.password,
    })
    console.log("SIGNUP API: ", signupStudent)
    signupStudent.save()
        .then(data => {
            response.json(data)
            console.log("SAVE")
        })
        .catch(error => {
            response.json(error)
            console.log("ERROR: ", error)
        })
})

module.exports = router