const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const multer = require('multer')
const { log } = require('@craco/craco/lib/logger')
const bookModel = require('../models/bookModel')


//STORE IMAGES
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (request, file, cb) => {
        cb(null, request.body.userID + '.png')
    }
})

const upload = multer({
    storage: Storage
}).single('faceID')

router.post('/signup', async (request, response) => {
    // upload(request, response, (error) => {
    //     if (error) {
    //         console.log('UPLOAD Image error: ', error);
    //     } else {
    const signupStudent = new User({
        userID: request.body.studentID,
        name: request.body.studentName,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        password: request.body.password,
        date: new Date(),
        faceID: {
            data: Buffer.from(request.body.faceID, 'base64'),
            contentType: 'image/png'
        },
        role: request.body.role
    })
    console.log("SIGNUP API receive request: ", signupStudent.userID, signupStudent.name, signupStudent.dateOfBirth)

    // signupStudent.save()
    //     .then((data) => {
    //         response.json({ status: 'ok', data })
    //         console.log("Signup API pass: ")
    //     })
    //     .catch(error => {
    //         if (error.code === 11000) {
    //             console.log("User exist => FAIL")
    //             return response.json({ status: 'error', error: 'User already exits' })
    //         }
    //         console.log("ERROR at Signup API: ", error)
    //         return response.json({ status: 'error', error: error })
    //         throw error
    //     })

    try {
        const saveUser = await signupStudent.save();
        response.json({ status: 'ok', data: saveUser })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }
    //     }
    // })
})

router.post('/login', async (request, response) => {

    console.log("Login API called request: ", request.body)

    const { studentID, password } = request.body
    const user = await User.findOne({ userID: studentID }).lean()

    console.log('User: ', user);

    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid student ID' })
    }

    if (password === user.password) {    //check password
        const token = jwt.sign(
            {
                id: user._id,
                // studentID: user.studentID
            },
            JWT_SECRET
        )
        console.log('Role: ', user.role);
        return response.json({ status: 'ok', data: token, role: user.role })
    } else {
        response.json({ status: 'error', error: 'Wrong password' })
    }
})

router.post('/validate-student', async (request, response) => {

    console.log("validate-student API called")

    const { userID, name } = request.body
    const user = await User.findOne({ userID }).lean()

    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid student ID' })
    }

    if (name === user.name) {    //check password
        const token = jwt.sign(
            {
                id: user._id,
                studentID: user.userID
            },
            JWT_SECRET
        )
        return response.json({ status: 'ok', data: token })
    } else {
        response.json({ status: 'error', error: 'Wrong info' })
    }
})

router.get('/getImage', async (request, response) => {
    const user = await User.findOne({ userID: 'fhfhfhfhfh' }).lean();
    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid student ID' })
    }
    return response.json({ status: 'ok', data: user.faceID.data })
})

router.get('/find-staff', async (request, response) => {

    console.log('find-staff API call');

    const staffList = await User.find({}).lean()

    if (!staffList) {
        return response.json({ error: 'No staff found' })
    } else {
        return response.json({ data: staffList })
    }

})

module.exports = router