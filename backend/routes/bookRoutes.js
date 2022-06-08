const { request, response } = require('express')
const express = require('express')
const User = require('../models/userModels')
const bookModel = require('../models/bookModel')

const bookRoutes = express.Router();

bookRoutes.get('/', (request, response) => {
    console.log('request')
})

bookRoutes.post('/update-book', (request, response) => {

    console.log('update-book API called - request: ', request.body);

    const bookRequest = new bookModel({
        bookID: request.body.bookID,
        bookName: request.body.bookName,
        author: request.body.author,
        produceYear: request.body.produceYear,
        department: request.body.department,
        qty: request.body.qty
    })
    console.log("update-book API receive request: ", bookRequest)

    bookRequest.save()
        .then((data) => {
            response.json({ status: 'ok', data })
            console.log("update-book API pass: ", data)
        })
        .catch(error => {
            if (error.code === 11000) {
                console.log("User exist => FAIL")
                return response.json({ status: 'error', error: 'User already exits' })
            }
            console.log("ERROR at update-book API: ", error)
            return response.json({ status: 'error', error: error })
            throw error
        })
})

bookRoutes.get('/find-books', async (request, response) => {

    console.log('find-books API call');

    const bookList = await bookModel.find({}).lean()

    if (!bookList) {
        return response.json({ error: 'No book found' })
    } else {
        return response.json({ data: bookList })

    }

})

module.exports = bookRoutes