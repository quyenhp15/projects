const { request, response } = require('express')
const express = require('express')

const bookModel = require('../models/bookModel')
const departmentModel = require('../models/departmentModel')
const Author = require('../models/authorModel')
const BookAuthor = require('../models/book-authorModel')
const bookAuthorModel = require('../models/book-authorModel')
const cartItemModel = require('../models/cartItemModel')
const cartModel = require('../models/cartModel')
const OrderModel = require('../models/orderModel')
const OrderItemModel = require('../models/orderItemModel')
const orderItemModel = require('../models/orderItemModel')

const orders = express.Router();

orders.get('/', async (request, response) => {

    console.log('orders API called');

    const orderList = await OrderModel.find({}).lean()

    if (!orderList) {
        return response.json({ error: 'No order found' })
    } else {

        const returnedOrder = orderList.map(async order => {

            const returnDate = new Date(order.dateOfReturn)
            const today = new Date()

            if (today > returnDate && order.orderStatus === 'borrowing') {
                console.log('ORDER outdated')
                await OrderModel.findOneAndUpdate(
                    { _id: order._id },
                    { orderStatus: 'Outdated' }
                )

                const orderBookList = await orderItemModel.find({ orderID: order._id }).lean()

                console.log('orderBookList: ', orderBookList)
                for (let book of orderBookList) {
                    if (book.status !== 'complete') {
                        await orderItemModel.findOneAndUpdate(
                            { orderID: order._id, bookID: book.bookID },
                            { status: 'Outdated' }
                        )
                    }
                }

                return {
                    ...order,
                    dateOfBooking: order.dateOfBooking.toDateString(),
                    dateOfReturn: order.dateOfReturn.toDateString(),
                    orderStatus: 'Outdated'
                }
            }

            return {
                ...order,
                dateOfBooking: order.dateOfBooking.toDateString(),
                dateOfReturn: order.dateOfReturn.toDateString()
            }
        })

        return response.json({ data: await Promise.all(returnedOrder) })
    }
})

orders.post('/new-order/:userID/:shopping_cart_id', async (request, response) => {

    const inputUserID = request.params.userID
    const inputCartID = request.params.shopping_cart_id

    console.log('POST /orders/new-order API called');

    const today = new Date();
    const returnDate = new Date();

    returnDate.setDate(returnDate.getDate() + 10)

    console.log('today: ', today)
    console.log('returnDate: ', returnDate)

    const newOrder = new OrderModel({
        userID: inputUserID,
        dateOfBooking: today.toDateString(),
        dateOfReturn: returnDate.toDateString(),
        orderStatus: 'borrowing'
    })

    try {
        const order = await newOrder.save();
        console.log('Order: ', order)

        const bookList = await cartItemModel.find({ cartID: inputCartID }).lean()
        const availableBookList = []
        for (let book of bookList) {
            console.log('book: ', book)
            const order_item = new OrderItemModel({
                orderID: order._id,
                bookID: book.bookID,
                qty: book.qty,
                status: 'borrowing'
            })
            await order_item.save()
            await cartItemModel.deleteOne({ cartID: inputCartID, bookID: book.bookID })

            //Update availability
            let availableBook = await bookModel.findOne({ _id: book.bookID })
            console.log('availableBook: ', availableBook)

            const remainingBook = availableBook.available - book.qty
            const updatedBook = await bookModel.findOneAndUpdate({ _id: book.bookID }, { available: remainingBook })
            availableBook = await bookModel.findOne({ _id: book.bookID })

            console.log('availableBook: ', availableBook)

            availableBookList.push(availableBook)
        }
        console.log('newOrder: ', newOrder)
        response.json({ status: 'ok', data: newOrder, availableBookList: availableBookList })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }
})

orders.post('/change-status/:orderID/:bookID', async (request, response) => {

    const inputOrderID = request.params.orderID
    const inputBookID = request.params.bookID

    console.log('POST orders/change-status API called: ', inputOrderID);

    try {
        // Update book status
        const updatedItem = await orderItemModel.findOneAndUpdate(
            { orderID: inputOrderID, bookID: inputBookID },
            { status: 'complete' }
        )
        const borrowedQty = updatedItem.qty

        console.log('updatedItem', updatedItem)

        //Update availability
        const returnedBook = await bookModel.findOne({ _id: inputBookID })
        const returnedBookAvailable = returnedBook.available

        await bookModel.findOneAndUpdate(
            { _id: inputBookID },
            { available: returnedBookAvailable + borrowedQty }
        )

        //Checking completed order?
        const items = await orderItemModel.find({ _id: inputOrderID }).lean()

        let isCompletedOrder = true
        for (let item of items) {
            if (item.status !== 'complete') {
                isCompletedOrder = false
                break;
            }
        }

        if (isCompletedOrder) {
            await OrderModel.findOneAndUpdate({ _id: inputOrderID }, { orderStatus: 'complete' })
        }

        response.json({ status: 'ok', data: updatedItem, isCompletedOrder: isCompletedOrder })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

orders.get('/get-orders/:userID', async (request, response) => {    //Get all orders of userID

    const input = request.params.userID

    console.log('GET /get-orders API called: ', input);

    try {
        const orders = await OrderModel.find({ userID: input }).lean()
        // console.log('orders: ', orders)

        const returnedOrder = orders.map(async order => {

            const returnDate = new Date(order.dateOfReturn)
            const today = new Date()

            if (today > returnDate && order.orderStatus === 'borrowing') {
                await OrderModel.findOneAndUpdate(
                    { _id: order._id },
                    { orderStatus: 'Outdated' }
                )

                return {
                    ...order,
                    dateOfBooking: order.dateOfBooking.toDateString(),
                    dateOfReturn: order.dateOfReturn.toDateString(),
                    orderStatus: 'Outdated'
                }
            }

            return {
                ...order,
                dateOfBooking: order.dateOfBooking.toDateString(),
                dateOfReturn: order.dateOfReturn.toDateString()
            }
        })

        response.json({ status: 'ok', data: await Promise.all(returnedOrder) })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

orders.get('/get-order-item/:orderID', async (request, response) => {    //Get all items of orderID

    const input = request.params.orderID

    console.log('GET orders/get-order-item API called: ', input);

    try {
        const order = await orderItemModel.find({ orderID: input }).lean()
        console.log('order: ', order)
        response.json({ status: 'ok', data: order })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

module.exports = orders