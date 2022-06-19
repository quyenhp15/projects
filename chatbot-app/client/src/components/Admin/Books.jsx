import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Popconfirm, message, Modal, Form, Input, InputNumber, Collapse } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons'
import 'antd/dist/antd.css'

const { Panel } = Collapse;

const Books = () => {

    const [booksList, setBooksList] = useState(null);
    const [editedBook, setEditedBook] = useState(null)
    const [bookForm] = Form.useForm();
    // let isEmpty = Object.keys(editedBook).length === 0
    const columns = [
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (_, record) => (
                renderAuthorName(record.author)
            ),
        },
        {
            title: 'Name',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                {
                    text: 'IT',
                    value: 'IT',
                },
                {
                    text: 'BA',
                    value: 'BA',
                },
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0,
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
            sortOrder: 'ascend',
            sorter: (a, b) => a.qty - b.qty,
        },
        {
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm title="Are you sure to delete?" onConfirm={() => confirmDelete(record)}
                        onCancel={cancelDelete} okText="Yes" cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);

    const renderAuthorName = (authors) => {
        // console.log('authors: ', authors)

        // let authorString = ''
        // console.log('length: ', authors.length)
        // for (let i = 0; i < authors.length; i++) {
        //     authorString = authorString + authors[i]
        //     if (i !== authors.length - 1) {
        //         authorString += ', '
        //     }
        // }
        return authors
    }

    async function handleOk(event) {
        console.log('Click Add');
        let newBook = {
            bookName: event.bookName,
            author: event.author,
            department: event.department,
            qty: event.qty,
            direction: 'ADD'
        }
        const response = await axios.post('http://localhost:5000/books/update-book', newBook);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Success')
            const currentBookList = booksList
            newBook = {
                _id: result.data._id,
                bookName: event.bookName,
                author: event.author,
                department: event.department,
                qty: event.qty,
            }
            currentBookList.push(newBook)
            setBooksList(currentBookList)
        } else {
            message.error('Add book fail')
            console.log("ERROR: ", result.error)
        }

        console.log('New book: ', newBook);
        bookForm.resetFields() //clear form
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        bookForm.resetFields() //clear form
        setIsModalVisible(false);
    };

    useEffect(() => {
        const loadBooks = async () => {
            const response = await axios.get('http://localhost:5000/books');
            setBooksList(response.data.data)
        }
        loadBooks();
        console.log('BookList: ', booksList);
    }, [])

    async function confirmDelete(selectedBook) {
        let currentBookList = booksList

        console.log('selectedBook: ', selectedBook._id);

        const url = 'http://localhost:5000/books/delete-book/' + selectedBook._id
        const response = await axios.delete(url);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Delete item success')
            currentBookList = currentBookList.filter(item => item._id !== selectedBook._id)
            console.log('List after: ', currentBookList);
            setBooksList(currentBookList)
        } else {
            message.error('Delete book fail')
            console.log("ERROR: ", result.error)
        }
    };

    const cancelDelete = (e) => {
        console.log('Cancel delete: ', e.target.value);
        message.error('Click on No');
    };

    const handleAddNewBook = (newBook) => {
        setIsModalVisible(true);
    }

    return (
        <div>
            Books page
            <Button icon={<PlusCircleTwoTone />} onClick={handleAddNewBook} >Add new book</Button>
            <Table columns={columns} dataSource={booksList} />

            <Modal title="New book" visible={isModalVisible}
                footer={[
                    <Button onClick={handleCancel}> Cancel</Button>
                ]}
            >
                <Form onFinish={handleOk} form={bookForm}>
                    Book name:
                    <Form.Item name='bookName' rules={[{ required: true, message: 'Do not empty', },]} >
                        <Input placeholder="Book name" className="inputInfo" />
                    </Form.Item>
                    Author:
                    <Form.Item name='author' rules={[{ required: true, message: 'Do not empty', },]}>
                        <Input placeholder="Author" className="inputInfo" />
                    </Form.Item>
                    Produce year:
                    <Form.Item name='produceYear' rules={[{ required: true, message: 'Do not empty', },]}>
                        <InputNumber placeholder="Produce year" className="inputInfo" />
                    </Form.Item>
                    Department:
                    <Form.Item name='department' rules={[{ required: true, message: 'Do not empty', },]}>
                        <Input placeholder="Department" className="inputInfo" />
                    </Form.Item>
                    Qty:
                    <Form.Item name='qty' rules={[{ required: true, message: 'Do not empty', },]}>
                        <InputNumber placeholder="Qty" className="inputInfo" defaultValue={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn_sign-up">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default Books