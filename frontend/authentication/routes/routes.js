const express = require('express')
const router = express.Router()
const signupTemplateCopy = require('../models/models')

router.post('/signup', (request, response) => {
    const signupUser = new signupTemplateCopy({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
    })
    console.log("SIGNUP API: ", signupUser)
    signupUser.save()
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