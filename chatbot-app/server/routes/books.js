const { request, response } = require('express')
const express = require('express')

const bookModel = require('../models/bookModel')
const departmentModel = require('../models/departmentModel')
const Author = require('../models/authorModel')
const BookAuthor = require('../models/book-authorModel')
const bookAuthorModel = require('../models/book-authorModel')
const cartItemModel = require('../models/cartItemModel')
const cartModel = require('../models/cartModel')

const bookRoutes = express.Router();

bookRoutes.get('/', async (request, response) => {

    console.log('books API called to response all books');

    const bookList = await bookModel.find({}).lean()

    if (!bookList) {
        return response.json({ error: 'No book found' })
    } else {
        const returnedBookList = []
        for (let book of bookList) {
            const authorIDList = await bookAuthorModel.find({ bookID: book._id }).lean()
            const authors = []
            for (let authorID of authorIDList) {
                const author = await Author.findOne({ _id: authorID.authorID }).lean()
                const authorName = author.authorName
                authors.push(authorName)
            }

            const bookInfo = {
                _id: book._id,
                bookName: book.bookName,
                department: book.department,
                qty: book.qty,
                author: authors
            }
            returnedBookList.push(bookInfo)
        }
        return response.json({ data: returnedBookList })
    }
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

    const inputID = request.params.id
    console.log('delete-book API called - request: ', inputID)

    try {
        const deletedBook = await bookModel.findOne({ _id: inputID }).lean()
    } catch (e) {
        console.log('Cannot find book')
        return response.json({ status: 'error', error: 'Cannot find book ID: ', inputID })
    }

    await bookModel.deleteOne({ _id: inputID })
    response.json({ status: 'ok' })

})

bookRoutes.delete('/:cartID/delete/:bookID', async (request, response) => { //delete bookID from cartID

    const inputCartID = request.params.cartID
    const inputBookID = request.params.bookID
    console.log('DELETE /delete from cart API called - request: ' + inputCartID + '\t' + inputBookID)

    try {
        const deletedBook = await cartItemModel.findOne({ bookID: inputBookID, cartID: inputCartID }).lean()
        await cartItemModel.deleteOne({ bookID: inputBookID, cartID: inputCartID })
        return response.json({ status: 'ok', data: deletedBook })

    } catch (e) {
        console.log('Cannot find book')
        return response.json({ status: 'error', error: 'Cannot find book ID: ' })
    }
})

bookRoutes.get('/departments', async (request, response) => { //Get all departments
    console.log('/departments API called')

    const departmentList = await departmentModel.find({}).lean()

    if (!departmentList) {
        return response.json({ error: 'No department found' })
    } else {
        return response.json({ data: departmentList })
    }
})

bookRoutes.get('/author/:authorName', async (request, response) => { //Get book by author name

    console.log('GET /author API called')
    const input = request.params.authorName

    console.log('Author request: ', input)
    const author = await Author.findOne({ authorName: input }).lean()

    if (!author) {
        return response.json({ status: 'error', data: 'No author find' })
    } else {
        const bookIDList = await BookAuthor.find({ authorID: author._id }).lean()
        if (!bookIDList) {
            return response.json({ status: 'error', data: 'No book find' })
        } else {
            const bookList = []
            console.log('bookIDList: ', bookIDList)

            for (let book of bookIDList) {
                const foundBook = await bookModel.findOne({ _id: book.bookID }).lean()
                // const b = {}
                console.log('foundBook: ', foundBook)

                const authorIDList = await bookAuthorModel.find({ bookID: foundBook._id }).lean()
                console.log('authorIDList: ', authorIDList)

                const authorList = []
                for (let authorID of authorIDList) {
                    const author = await Author.findOne({ _id: authorID.authorID }).lean()
                    const authorName = author.authorName
                    authorList.push(authorName)
                }

                const b = {
                    ...foundBook,
                    // authorName: authorList
                    authorName: authorList
                }

                // bookList.push(foundBook)
                bookList.push(b)
            }
            console.log('Book list: ', bookList)
            response.json({ status: 'ok', data: bookList })
        }
    }

    // return response.json({ data: bookList })
})

bookRoutes.get('/id/:id', async (request, response) => { //Get book by bookID

    console.log('GET /id API called')
    const input = request.params.id

    console.log('bookID input: ', input)

    try {
        const book = await bookModel.findOne({ _id: input }).lean()
    } catch (e) {
        console.log('No book found')
        return response.json({ status: 'error', error: 'No book found' })
    }
    return response.json({ status: 'ok', data: book })

    // return response.json({ data: bookList })
})

bookRoutes.get('/department/:department', async (request, response) => {    //Get book by departmentID
    // let result = await bookModel.find({ department: request.params.department })
    console.log('GET books/department/ API called')
    const inputDepartment = request.params.department

    console.log('Department request: ', inputDepartment)
    const bookList = await bookModel.find({ department: inputDepartment }).lean()

    if (!bookList) {
        return response.json({ data: 'No book found' })
    } else {
        const returnBookList = []
        for (let book of bookList) {

            const authorIDList = await bookAuthorModel.find({ bookID: book._id }).lean()
            const authorNameList = []

            for (let authorID of authorIDList) {
                const author = await Author.findOne({ _id: authorID.authorID }).lean()
                const authorName = author.authorName
                authorNameList.push(authorName)
            }

            item = {
                _id: book._id,
                bookName: book.bookName,
                authorName: authorNameList
            }
            returnBookList.push(item)
        }

        console.log('Book list: ', returnBookList)
        response.json({ status: 'ok', data: returnBookList })

    }

    // return response.json({ data: bookList })
})

bookRoutes.get('/shopping-cart/:userID', async (request, response) => { //Get shopping cart by userID

    console.log('GET books/shopping-cart by userID API called')
    const input = request.params.userID

    console.log('userID: ', input)

    try {
        const shopping_cart = await cartModel.findOne({ userID: input }).lean()
        const shopping_cart_id = shopping_cart._id
        const cartItemList = await cartItemModel.find({ cartID: shopping_cart_id }).lean()

        const returnList = []
        for (let cartItem of cartItemList) {
            console.log('cartItem: ', cartItem)
            const book = await bookModel.findOne({ _id: cartItem.bookID }).lean()
            console.log('book: ', book)
            const bookName = book.bookName

            const authorList = await bookAuthorModel.find({ bookID: cartItem.bookID }).lean()
            const returnedAuthorList = []
            for (let author of authorList) {
                const authorName = await Author.findOne({ _id: author.authorID })
                returnedAuthorList.push(authorName.authorName)
            }
            console.log('returnedAuthorList', returnedAuthorList)

            item = {
                bookID: book._id,
                bookName: bookName,
                author: returnedAuthorList,
                qty: cartItem.qty
            }
            returnList.push(item)
        }
        return response.json({ status: 'ok', data: returnList })
    } catch (e) {
        console.log('Error: ', e)
        return response.json({ status: 'error', error: 'No book found' })
    }
    // return response.json({ status: 'ok', data: book })

    // return response.json({ data: bookList })
})

module.exports = bookRoutes