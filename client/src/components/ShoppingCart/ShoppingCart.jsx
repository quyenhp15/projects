import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

import { Table, InputNumber, Button, message, Layout, Popconfirm, List, Divider, Modal, Tag } from 'antd'
import 'antd/dist/antd.css'
const { Header, Footer, Content } = Layout;

const ShoppingCart = () => {

    const columns = [
        {
            dataIndex: 'order',
            width: '3%'
        },
        {
            title: 'Book',
            dataIndex: 'bookName',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            render: (_, record) => (
                renderAuthorName(record.author)
            ),
        },
        {
            title: 'Quantity',
            // dataIndex: 'qty',
            render: (_, record) => {
                return (
                    <InputNumber defaultValue={record.qty} min={1}
                        max={record.available}
                        onStep={(value) => handleQty(value, record)} />
                )
            },
        },
        {
            title: 'Department',
            dataIndex: 'department'
        },
        {
            width: '10%',
            render: (_, record) => (
                <Popconfirm title="Are you sure to delete?" onConfirm={() => confirmDelete(record)}
                    okText="Yes" cancelText="No"
                >
                    <a href="#">Delete</a>
                </Popconfirm>
            ),
        }
    ];

    const orderColumns = [
        {
            dataIndex: 'order',
            width: '5%'
        },
        {
            title: 'Order ID',
            dataIndex: '_id',
        },
        {
            title: 'From',
            dataIndex: 'dateOfBooking',
            key: 'dateOfBooking'
        },
        {
            title: 'To',
            dataIndex: 'dateOfReturn',
            key: 'dateOfReturn'
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            render: (_, record) => {
                switch (record.orderStatus) {
                    case 'complete':
                        return <Tag color='#87d068' >Complete</Tag>
                        break;
                    case 'borrowing':
                        return <Tag color='#FDD017'>Borrowing</Tag>
                        break;
                    case 'Outdated':
                        return <Tag color='#f50' >Out dated</Tag>
                }
            }
        },
        {
            width: '10%',
            render: (_, record) => (
                <Button onClick={() => handleClickDetail(record)} >More detail...</Button>
            ),
        }
    ];

    const orderItemColumn = [
        {
            dataIndex: 'order',
            key: 'order'
        },
        {
            title: 'Book',
            dataIndex: 'bookName',
            key: 'bookName'
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author'
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                switch (record.status) {
                    case 'complete':
                        return <Tag color='#87d068' >Complete</Tag>
                        break;
                    case 'borrowing':
                        return <Tag color='#FDD017'>Borrowing</Tag>
                        break;
                    case 'Outdated':
                        return <Tag color='#f50' >Out dated</Tag>
                }
            }
        }
    ]

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const [booksList, setBooksList] = useState(null);
    const [orderList, setOrderList] = useState(null);
    const [nestedData, setNestedData] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        // console.log('User cart: ', user)
        if (user === null) {
            navigate('/')
            return;
        }
        const userID = user.data.userID

        const loadOrders = async () => {
            const response = await axios.get('http://localhost:5000/orders/get-orders/' + userID)
            const result = response.data.data

            console.log("RESULT: ", result)

            const getOrderList = []
            for (let i = 0; i < result.length; i++) {
                console.log(result[i])
                getOrderList.push({
                    order: i + 1,
                    ...result[i]
                })
            }
            console.log('GET ORDER LIST: ', getOrderList)
            setOrderList(getOrderList)
        }

        loadBooks();
        loadOrders();
        console.log('User: ', user)
        console.log('User ID: ', userID)
    }, [])

    const loadBooks = async () => {

        const userID = user.data.userID

        const response = await axios.get('http://localhost:5000/books/shopping-cart/' + userID);
        const result = response.data.data
        // console.log('result: ', result)
        const bookList = []
        for (let i = 0; i < result.length; i++) {
            bookList.push({
                order: i + 1,
                ...result[i]
            })
        }
        setBooksList(bookList)
    }

    const handleQty = async (value, item) => {
        console.log('Record: ', value, item)

        const newUpdate = {
            cart_id: item.shopping_cart_id,
            bookID: item.bookID,
            newValue: value
        }

        console.log('newUpdate', newUpdate)

        const response = await axios.post('http://localhost:5000/books/update-cart', newUpdate);
        const result = response.data

        console.log('result: ', result)

    }

    const renderAuthorName = (authors) => {
        console.log('authors: ', authors)

        let authorString = ''
        console.log('length: ', authors.length)
        for (let i = 0; i < authors.length; i++) {
            authorString = authorString + authors[i]
            if (i !== authors.length - 1) {
                authorString += ', '
            }
        }
        return authorString
    }

    const confirmDelete = async (selectedBook) => {
        console.log('selectedBook: ', selectedBook)

        const url = 'http://localhost:5000/books/' + user.data.shopping_cart_id + '/delete/' + selectedBook.bookID
        const response = await axios.delete(url);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Delete item success')
            loadBooks()
        } else {
            message.error('Delete book fail')
            console.log("ERROR: ", result.error)
        }
        console.log('bookList: ', booksList)
    }

    const handleOrderButton = () => {
        console.log('booksList', booksList)
        if (booksList.length === 0) {
            message.error('Your cart have no item')
        } else {
            console.log('user: ', user.data)

            let maxItem = 0

            if (user.data.role === 'student') {
                maxItem = 5
            }

            if (booksList.length > maxItem) {
                message.error('As role of student, you can just borrow 5 items')
            } else {
                navigate('/order')
            }
        }
    }

    const renderOrderItem = async (orderID) => {
        const response = await axios.get('http://localhost:5000/orders/get-order-item/' + orderID)
        const itemList = response.data.data

        const bookList = []
        let i = 0;
        for (let item of itemList) {

            const getBookInfo = await axios.get('http://localhost:5000/books/id/' + item.bookID)
            const bookInfo = getBookInfo.data.data

            bookList.push({
                order: i + 1,
                bookName: bookInfo.bookName,
                author: bookInfo.authorName,
                qty: item.qty,

            })
            i++
        }
        return bookList
    }

    const ModalContent = () => (
        <div>
            <b>{selectedOrder?._id} <br /></b>
            <b>From:</b> {selectedOrder?.dateOfBooking} <br />
            <b>To:</b> {selectedOrder?.dateOfReturn} <br />
            <b>Status:</b> {selectedOrder?.orderStatus}
            <Divider>Order details</Divider>
            <Table columns={orderItemColumn} dataSource={nestedData.bookList} bordered />
        </div>
    )

    const handleClickDetail = async (order) => {

        console.log('order: ', order)

        await handleExpand(order)

        setIsModalVisible(true)
        setSelectedOrder(order)

        console.log('selectedOrder: ', selectedOrder)

        console.log('nestedData: ', nestedData)

    }

    const expandedRowRender = (record) => {
        const data = nestedData[record._id] || [];

        console.log('nestedData[record._id]', nestedData[record._id]);

        return <Table columns={orderItemColumn} dataSource={data} bordered />
    }

    const handleExpand = async (record) => {
        console.log('record', record);
        const response = await axios.get('http://localhost:5000/orders/get-order-item/' + record._id)
        const itemList = response.data.data;
        console.log('itemList', itemList);

        const bookList = []
        let i = 0;
        for (let item of itemList) {

            const getBookInfo = await axios.get('http://localhost:5000/books/id/' + item.bookID)
            const bookInfo = getBookInfo.data.data

            bookList.push({
                order: i + 1,
                bookName: bookInfo.bookName,
                author: bookInfo.authorName,
                qty: item.qty,
                status: item.status
            })
            i++
        }

        setNestedData(state => ({
            bookList
        }))
    }

    return (
        <div>
            <Header>
                <Button onClick={() => navigate('/chatbot')} >Back to chatbot</Button>
                <Button onClick={() => {
                    dispatch(logout())
                    navigate('/')
                }} >Log out</Button>
            </Header>
            <Button onClick={handleOrderButton} >Order</Button>

            <Divider>Cart</Divider>
            <Table columns={columns} dataSource={booksList} scroll={{ y: 240, }} bordered />
            {console.log('BOOKSLIST: ', booksList)}

            <Divider>Orders</Divider>
            <Table columns={orderColumns} dataSource={orderList} scroll={{ y: 540, }} bordered />

            <Modal visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={'70%'}
            >
                <ModalContent />
            </Modal>

        </div>

    )
}

export default ShoppingCart