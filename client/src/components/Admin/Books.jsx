import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import { Table, Space, Button, Popconfirm, message, Modal, Form, Input, InputNumber, Tag, Search } from 'antd';
import { PlusCircleTwoTone, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { setBookList, addToBookList } from "../../features/bookSlice";

const Books = (props) => {

    const { fetchBooks, setFetchBooks } = props

    //Add new book
    const dispatch = useDispatch()

    const [booksList, setBooksList] = useState(null);
    const [tags, setTags] = useState([]);
    const [editedBook, setEditedBook] = useState(null)
    const [bookForm] = Form.useForm();
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');


    const user = useSelector(state => state.user.user)

    // let isEmpty = Object.keys(editedBook).length === 0
    const columns = [
        {
            title: 'Author',
            dataIndex: 'authorName',
            key: 'author',
            render: (_, record) => (
                renderAuthorName(record)
            ),
        },
        {
            title: 'Name',
            dataIndex: 'bookName',
            key: 'bookName',
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
                return record.bookName.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                {
                    text: 'CSE',
                    value: 'CSE',
                },
                {
                    text: 'BA',
                    value: 'BA',
                },
                {
                    text: 'ISE',
                    value: 'ISE',
                }
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0,
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
            sortOrder: 'ascend',

        },
        {
            title: 'Available',
            dataIndex: 'available',
            key: 'available',
            sorter: (a, b) => a.qty - b.qty,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <div>
                    <InputNumber
                        placeholder="Type text here"
                        value={selectedKeys[0]}
                        // onChange={(e) => {
                        //     setSelectedKeys(e.target.value ? [e.target.value] : [])
                        //     confirm({ closeDropdown: false })
                        // }}
                        onChange={(value) => {
                            setSelectedKeys(value ? [value] : [])
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
                return record.available === value
            }
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

    const renderAuthorName = (book) => {

        const authors = book.authorName

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

    async function handleOk(event) {

        if (tags.length === 0) {
            message.error('Please enter author name')
            return;
        }

        console.log('Click Add');
        let newBook = {
            bookName: event.bookName,
            author: event.author,
            department: event.department,
            qty: event.qty,
            authorName: tags
        }
        const response = await axios.post('http://localhost:5000/books/update-book', newBook);
        const result = response.data;

        console.log('Add result: ', result)

        bookForm.resetFields() //clear form
        setIsModalVisible(false);

        if (result.status === 'ok') {
            message.success('Item added')
            loadBooks();
        } else {
            message.error('Add book fail')
            console.log("ERROR: ", result.error)
        }
        console.log('New book: ', newBook);

    };

    const handleCancel = () => {
        bookForm.resetFields() //clear form
        setIsModalVisible(false);
    };

    const loadBooks = async () => {

        const response = await axios.get('http://localhost:5000/books');
        const bookList = response.data.data;

        setBooksList(bookList)
        setFetchBooks(false)
    }

    useEffect(() => {
        loadBooks();
        console.log('BookList: ', booksList);
    }, [])

    useEffect(() => {
        if (!fetchBooks) {
            return;
        }
        loadBooks();
        console.log('BookList: ', booksList);
    }, [fetchBooks])

    async function confirmDelete(selectedBook) {

        console.log('selectedBook: ', selectedBook._id);

        const url = 'http://localhost:5000/books/delete-book/' + selectedBook._id
        const response = await axios.delete(url);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Delete item success')
            loadBooks()
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

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }

        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag) => {
        const tagElem = (
            <Tag closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block', }}          >
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);

    return (
        <div>
            Books page
            <Button icon={<PlusCircleTwoTone twoToneColor="#52c41a" />} onClick={handleAddNewBook} type="primary"  >Add new book</Button>
            <Table columns={columns} dataSource={booksList} bordered />

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
                    <Form.Item name='author' >
                        {/* <Input placeholder="Author" className="inputInfo" /> */}

                        <div style={{ marginBottom: 16, }}      >
                            {tagChild}
                        </div>
                        {inputVisible && (
                            <Input
                                ref={inputRef}
                                type="text"
                                size="small"
                                style={{
                                    width: 78,
                                }}
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputConfirm}
                                onPressEnter={handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag onClick={showInput} className="site-tag-plus">
                                <PlusOutlined /> New Author
                            </Tag>
                        )}

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