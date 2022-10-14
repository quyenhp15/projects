import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Popconfirm, message, Modal, Divider, Tag, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const Order = (props) => {

    const { setFetchBooks } = props

    const [orderList, setOrderList] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [nestedData, setNestedData] = useState({});

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'ID',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div>
                    <Input.Search
                        placeholder="Type text here"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropdown: false })
                        }}
                        onPressEnter={() => {
                            confirm()
                            // clearFilters()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        allowClear
                    />
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record._id.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'User ID',
            dataIndex: 'userID',
            key: 'userID',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div>
                    <Input.Search
                        placeholder="Type text here"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropdown: false })
                        }}
                        onPressEnter={() => {
                            confirm()
                            // clearFilters()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                        allowClear
                    />
                </div>
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.userID.toLowerCase().includes(value.toLowerCase())
            }
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
                {
                    text: 'Outdated',
                    value: 'Outdated'
                }
            ],
            onFilter: (value, record) => record.orderStatus.indexOf(value) === 0,
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
        },
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
        },
        {
            render: (_, record) => (
                renderButton(record)
            ),
        },
    ]

    const handleClickDetail = (order) => {
        setIsModalVisible(true)
        setSelectedOrder(order)

        console.log('selectedOrder: ', selectedOrder)

        handleExpand(order)

        console.log('nestedData: ', nestedData)
    }

    const ModalContent = () => (
        <div>
            <b>{selectedOrder._id} <br /></b>
            <b>From:</b> {selectedOrder.dateOfBooking} <br />
            <b>To:</b> {selectedOrder.dateOfReturn} <br />
            <b>Status:</b> {selectedOrder.orderStatus}
            <Divider>Order details</Divider>
            <Table columns={orderItemColumn} dataSource={nestedData.bookList} bordered />
        </div>
    )

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

            console.log('bookInfo: ', bookInfo)

            bookList.push({
                order: i + 1,
                bookName: bookInfo.bookName,
                author: bookInfo.authorName,
                qty: item.qty,
                status: item.status,
                bookID: bookInfo._id,
                orderID: item.orderID
            })
            i++
        }

        setNestedData(state => ({
            bookList
        }))
    }

    const renderButton = (order) => {

        console.log('ORDER: ', order)
        if (order.status === 'complete') {
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
        console.log('orderList2: ', orderList);

    }
    useEffect(() => {
        loadOrders();
        console.log('orderList: ', orderList);
    }, [])

    const handleCompleteOrder = async (order) => {
        console.log('order: ', order)
        const response = await axios.post('http://localhost:5000/orders/change-status/' + order.orderID + '/' + order.bookID);

        const data = { _id: order.orderID }
        handleExpand(data)
        loadOrders()

        setFetchBooks(true)
    }

    return (
        <div>
            <Table columns={columns} dataSource={orderList} />

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

export default Order