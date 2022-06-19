import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

import { Table, InputNumber, Button, message, Layout, Popconfirm, List, Card, Modal } from 'antd'
import 'antd/dist/antd.css'

import Webcam from "../Webcam";

const { Header, Footer, Content } = Layout;

const Order = () => {

    const user = useSelector(state => state.user.user)
    const name = user.data.name
    const userID = user.data.userID
    const cartID = user.data.shopping_cart_id

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmID, setConfirmID] = useState()
    const [openCamera, setOpenCamera] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

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
    ];

    const [booksList, setBooksList] = useState(null);

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
        // if (user === null) {
        //     navigate('/')
        //     return;
        // }

        const loadBooks = async () => {
            const response = await axios.get('http://localhost:5000/books/shopping-cart/' + userID);
            const result = response.data.data
            console.log('result: ', result)
            setBooksList(result)
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
        const result = response.data.data._id

        console.log('result: ', result)
        setConfirmID(result)

        // console.log('Verify success')

        // setIsModalVisible(true);
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
                    <b>Name: {name}</b>
                    <br />
                    Address:
                </Card>
                <br />
                <Table columns={columns} dataSource={booksList} scroll={{ y: 240, }} />

            </Content>
            <Modal title="Your order success" visible={isModalVisible} onOk={handleOk}>
                This is your confirmation ID:
                {confirmID}
            </Modal>
            <Modal visible={openCamera} onCancel={() => setOpenCamera(false)} onOk={handleOk}>
                {!isVerified &&
                    <Webcam setOpenCamera={setOpenCamera} isVerified={isVerified} setIsVerified={setIsVerified} />}
                {isVerified && `This is your confirmation ID: ${confirmID || ''}`}
            </Modal>
            <Footer>
                <Button onClick={handleOrderButton} >Order</Button>
                <Button onClick={handleCamera} >Open camera</Button>
            </Footer>
        </Layout>
    )
}
export default Order