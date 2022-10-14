import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

import { Table, InputNumber, Button, message, Layout, Popconfirm, List, Card, Modal } from 'antd'
import 'antd/dist/antd.css'

import { updateAvailable } from "../../features/bookSlice";

import Webcam from "../Webcam";

const { Header, Footer, Content } = Layout;

const Order = () => {

    const user = useSelector(state => state.user.user)
    const name = user.data.name
    const userID = user.data.userID
    const cartID = user.data.shopping_cart_id

    const allBooks = useSelector(state => state.books.bookList)

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmID, setConfirmID] = useState()
    const [bookingDate, setBookingDate] = useState()
    const [returnDate, setReturnDate] = useState()
    const [openCamera, setOpenCamera] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

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
            dataIndex: 'qty',
            width: '10%',
            // render: (_, record) => (
            //     <InputNumber defaultValue={record.qty} min={1} max />
            // ),
        },
    ];

    const [booksList, setBooksList] = useState(null);

    const handleQty = (value, item) => {
        console.log('value: ', value)
        console.log('Item: ', item)
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

    useEffect(() => {
        if (user === null) {
            navigate('/')
            return;
        }

        const loadBooks = async () => {
            const response = await axios.get('http://localhost:5000/books/shopping-cart/' + userID);
            const result = response.data.data
            const bookList = []
            for (let i = 0; i < result.length; i++) {
                bookList.push({
                    order: i + 1,
                    ...result[i]
                })
            }
            setBooksList(bookList)
        }
        loadBooks();

        console.log('User: ', user)
    }, [])

    useEffect(() => {
        if (isVerified) {
            // setOpenCamera(false)
            handleOrderButton()
        }
    }, [isVerified]);

    const handleOrderButton = async () => {
        // console.log('Click')
        const response = await axios.post('http://localhost:5000/orders/new-order/' + userID + '/' + cartID)
        const result = response.data.data

        console.log('result: ', result)
        setConfirmID(result._id)
        setBookingDate(result.dateOfBooking)
        setReturnDate(result.dateOfReturn)

        const updatedBookList = response.data.availableBookList
        console.log('updatedBookList', updatedBookList)

        dispatch(updateAvailable(updatedBookList))

    }

    const handleCamera = () => {
        setOpenCamera(true)
    }

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/chatbot')
    };

    return (
        <Layout style={{ backgroundColor: 'gray' }} >

            <Header style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', color: 'blue' }}>
                ORDER
                <Button onClick={() => navigate('/shopping-cart')} >Back</Button>
                <Button onClick={() => {
                    dispatch(logout())
                    navigate('/')
                }} >Log out</Button>
            </Header>

            <Content>
                <Card title='Information'>
                    <b>Name: {name} - {userID}</b>
                    <br />
                    {/* <i> {new Date()}</i> */}
                </Card>
                <br />
                <Table columns={columns} dataSource={booksList} scroll={{ y: 240, }} bordered />

            </Content>

            <Modal title="Your order success" visible={isModalVisible} onOk={handleOk}>
                This is your confirmation ID:
                {confirmID}
            </Modal>
            <Modal visible={openCamera} onCancel={() => setOpenCamera(false)} onOk={handleOk}>
                {!isVerified &&
                    <Webcam setOpenCamera={setOpenCamera} isVerified={isVerified} setIsVerified={setIsVerified} />}
                {isVerified && `This is your confirmation ID: ${confirmID || ''} \n NEW LINEEE`}
            </Modal>
            <Footer>
                {/* <Button onClick={handleOrderButton} >Order</Button> */}
                <Button onClick={handleCamera} >Open camera</Button>
            </Footer>
        </Layout>
    )
}
export default Order