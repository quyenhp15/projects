import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from 'react-redux';

// import { useHistory } from 'react-router-dom';
import { Table, InputNumber, Button, message, Layout } from 'antd'
import 'antd/dist/antd.css'
const { Header, Footer, Content } = Layout;

const columns = [
    {
        title: 'Book',
        dataIndex: 'bookName',
    },
    {
        title: 'Author',
        dataIndex: 'author',
    },
    {
        title: 'Quantity',
        // dataIndex: 'qty',
        render: (_, record) => (
            <InputNumber defaultValue={record.qty} />
        ),
    },
];

const ShoppingCart = () => {

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

    const handleOrderButton = () => {
        if (!booksList) {
            message.error('Your cart have no item')
        } else {

        }
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    return (
        <div>
            <Header>
                <Button onClick={() => {
                    dispatch(logout())
                    navigate('/')
                }} >Log out</Button>
            </Header>
            <Table columns={columns} dataSource={booksList} scroll={{ y: 240, }}
                rowSelection={rowSelection}
            />
            <Button onClick={handleOrderButton} >Order</Button>
        </div>

    )
}

export default ShoppingCart