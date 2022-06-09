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

    switch (request.body.direction) {
        case 'ADD':
            const bookRequest = new bookModel({
                bookName: request.body.bookName,
                author: request.body.author,
                produceYear: request.body.produceYear,
                department: request.body.department,
                qty: request.body.qty
            })

            bookRequest.save()
                .then((data) => {
                    response.json({ status: 'ok', data })
                    console.log("update-book API added: ", data)
                })
                .catch(error => {
                    console.log("ERROR at update-book API: ", error)
                    return response.json({ status: 'error', error: error })
                    throw error
                })

            break;

        case EDIT:


    }

})

bookRoutes.delete('/delete-book/:id', async (request, response) => {
    let result = await bookModel.deleteOne({ _id: request.params.id })
    return response.json({ status: 'ok' })
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