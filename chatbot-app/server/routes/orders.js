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

const orders = express.Router();

orders.get('/', async (request, response) => {

    console.log('orders API called');

    const orderList = await OrderModel.find({}).lean()

    if (!orderList) {
        return response.json({ error: 'No book found' })
    } else {
        return response.json({ data: orderList })
    }
})

orders.post('/new-order/:userID/:shopping_cart_id', async (request, response) => {

    const inputUserID = request.params.userID
    const inputCartID = request.params.shopping_cart_id

    console.log('POST /order/:userID API called');

    const newOrder = new OrderModel({
        userID: inputUserID,
        // dateOfBooking: new Date().now,
        // dateOfReturn: new Date().now.getDate + 10,
        orderStatus: 'borrowing'
    })

    try {
        const order = await newOrder.save();
        console.log('Order: ', order)

        const bookList = await cartItemModel.find({ cartID: inputCartID }).lean()
        for (let book of bookList) {
            console.log('book: ', book)
            const order_item = new OrderItemModel({
                orderID: order._id,
                bookID: book.bookID,
                qty: book.qty
            })
            await order_item.save()
            await cartItemModel.deleteOne({ cartID: inputCartID, bookID: book.bookID })
        }
        response.json({ status: 'ok', data: order })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

orders.post('/change-status/:id', async (request, response) => {

    const inputOrderID = request.params.id

    console.log('POST /change-status API called: ', inputOrderID);

    try {
        const order = await OrderModel.findOneAndUpdate(
            { _id: inputOrderID },
            { orderStatus: 'complete' }
        )
        console.log('order: ', order)
        response.json({ status: 'ok', data: order })
    }
    catch (error) {
        console.log(error);
        response.json({ status: 'error', error: error });
    }

})

module.exports = orders