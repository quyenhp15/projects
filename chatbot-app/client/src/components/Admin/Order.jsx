import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Popconfirm, message, Modal, Form, Input, InputNumber, Collapse } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css'

const Order = () => {

    const [orderList, setOrderList] = useState(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'ID',
        },
        {
            title: 'User ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: [
                {
                    text: 'borrowing',
                    value: 'borrowing',
                },
                {
                    text: 'complete',
                    value: 'complete',
                },
            ],
            onFilter: (value, record) => record.orderStatus.indexOf(value) === 0,
        },
        {
            render: (_, record) => (
                renderButton(record)

            ),
        },
    ];

    const renderButton = (order) => {
        if (order.orderStatus === 'complete') {
            return;
        }
        return (
            <Popconfirm title="Change this order status to Complete?"
                onConfirm={() => handleCompleteOrder(order)}
                okText="Yes" cancelText="No"
            >
                <a href="#">Complete</a>
            </Popconfirm>
        )
    }

    const loadOrders = async () => {
        const response = await axios.get('http://localhost:5000/orders');
        setOrderList(response.data.data)
    }
    useEffect(() => {

        loadOrders();
        console.log('orderList: ', orderList);
    }, [])

    const handleCompleteOrder = async (order) => {
        console.log('order: ', order)
        const response = await axios.post('http://localhost:5000/orders/change-status/' + order._id);
        const list = await axios.get('http://localhost:5000/orders');
        setOrderList(list.data.data)


    }

    return (
        <div>
            <Table columns={columns} dataSource={orderList} />
        </div>

    )
}

export default Order