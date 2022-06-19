import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

import { Table, InputNumber, Button, message, Layout, Popconfirm, List } from 'antd'
import 'antd/dist/antd.css'
const { Header, Footer, Content } = Layout;

const ShoppingCart = () => {

    const columns = [
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
            render: (_, record) => (
                <InputNumber defaultValue={record.qty} />
            ),
        },
        {
            render: (_, record) => (
                <Popconfirm title="Are you sure to delete?" onConfirm={() => confirmDelete(record)}
                    okText="Yes" cancelText="No"
                >
                    <a href="#">Delete</a>
                </Popconfirm>
            ),
        }
    ];

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const [booksList, setBooksList] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        // console.log('User cart: ', user)
        if (user === null) {
            navigate('/')
            return;
        }
        const userID = user.data.userID

        const loadBooks = async () => {
            const response = await axios.get('http://localhost:5000/books/shopping-cart/' + userID);
            const result = response.data.data
            console.log('result: ', result)
            setBooksList(result)
        }
        loadBooks();
        console.log('User: ', user)
        console.log('User ID: ', userID)
    }, [])

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

        let currentBookList = booksList
        console.log('currentBookList', currentBookList)

        console.log('selectedBook: ', selectedBook.bookID);

        const url = 'http://localhost:5000/books/' + user.data.shopping_cart_id + '/delete/' + selectedBook.bookID
        const response = await axios.delete(url);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Delete item success')
            currentBookList = currentBookList.filter(item => item.bookID !== selectedBook.bookID)
            console.log('List after: ', currentBookList);
            setBooksList(currentBookList)
        } else {
            message.error('Delete book fail')
            console.log("ERROR: ", result.error)
        }
        console.log('bookList: ', booksList)
    }

    const handleOrderButton = () => {
        if (!booksList) {
            message.error('Your cart have no item')
        } else {
            console.log('bookList: ', booksList)
            console.log('user: ', user.data)
            navigate('/order')
        }
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
            <Table columns={columns} dataSource={booksList} scroll={{ y: 240, }} />
            <Button onClick={handleOrderButton} >Order</Button>
        </div>

    )
}

export default ShoppingCart