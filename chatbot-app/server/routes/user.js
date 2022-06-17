const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const CartModel = require('../models/cartModel')
const CartItemModel = require('../models/cartItemModel')
const cartModel = require('../models/cartModel')


router.get('/', async (request, response) => {

    console.log('users API called to response all users');

    const userList = await User.find({}).lean()

    if (!userList) {
        return response.json({ error: 'No user found' })
    } else {
        return response.json({ data: userList })
    }
})

router.post('/signup', async (request, response) => {

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

    try {
        const saveUser = await signupStudent.save();
        response.json({ status: 'ok', data: saveUser })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }
})

router.post('/create-shopping-cart', async (request, response) => {

    console.log('/create-shopping-cart called for: ', request.body.userID)

    const newShoppingCart = new cartModel({
        userID: request.body.userID
    })

    try {
        const save = await newShoppingCart.save();
        response.json({ status: 'ok', data: save })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

router.post('/add-shopping-cart-item', async (request, response) => {

    console.log('POST user/add-shopping-cart-item called for: ', request.body)

    const findItem = await CartItemModel.findOne({ bookID: request.body.bookID, cartID: request.body.cartID }).lean()

    console.log('Find Item: ', findItem)

    if (!findItem) {
        const newShoppingCartItem = new CartItemModel({
            bookID: request.body.bookID,
            cartID: request.body.cartID,
            qty: 1
        })
        try {
            const save = await newShoppingCartItem.save();
            response.json({ status: 'ok', data: save })
        }
        catch (error) {
            console.log(error);
            response.json({ status: 'error', error: error });
        }
    } else {
        const findQty = findItem.qty
        CartItemModel.update({ bookID: request.body.bookID, cartID: request.body.cartID, }, { qty: findQty + 1 })
        response.json({ status: 'ok', data: 'Item already exist' })

    }

})

router.post('/login', async (request, response) => {

    console.log("Login API called request: ", request.body)

    const { userID, password } = request.body
    const user = await User.findOne({ userID: userID }).lean()

    // console.log('User: ', user);

    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid user' })
    }

    if (password === user.password) {    //check password
        const token = jwt.sign(
            {
                id: user._id,
                // studentID: user.studentID
            },
            JWT_SECRET
        )
        console.log('Login API passed')
        return response.json({ status: 'ok', data: { userID: userID, name: user.name } })
    } else {
        console.log('Error at Login API')
        response.json({ status: 'error', error: 'Wrong password' })
    }
})

router.post('/validate-student', async (request, response) => {

    console.log("validate-student API called")

    const { userID, name } = request.body
    const user = await User.findOne({ userID }).lean()

    if (!user) {    //check studentID exist
        return response.json({ status: 'error', error: 'Invalid user ID' })
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