import React, { useState, useEffect } from "react";
// import './Admin.css'
import axios from "axios";
import 'antd/dist/antd.css'
import { Layout, Tabs, Form, Input, Button, message, Divider, Select, AutoComplete } from 'antd';

const { Option } = Select;
const { Search } = Input;

const NewOrder = () => {

    const [createOrderForm] = Form.useForm();
    const [searchBookForm, setSearchBookForm] = useState(false);

    const [bookList, setBookList] = useState(null);
    const [suggestions, setSuggestion] = useState([])

    const [options, setOptions] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:4000/books/find-books')
    //         .then((res) => {
    //             console.log('Res.dat: ', res.data.data)
    //             setBookList(res.data.data);
    //             // console.log(posts);
    //         })
    // }, ['http://localhost:4000/books/find-books']);

    useEffect(() => {
        const loadBooks = async () => {
            const response = await axios.get('http://localhost:4000/books/find-books');
            setBookList(response.data.data)
            console.log('Response: ', response.data.data)
        }
        loadBooks();
    }, [])

    async function handleSuggest(value) {

        let matches = []

        if (value) {
            matches = bookList.filter(book => {
                const regex = new RegExp(value, 'gi')
                return book.bookID.match(regex)
            })
            // setOptions(matches)
        }

        console.log('Matches: ', matches);
        setSuggestion(matches)
        // setOptions(
        //     matches
        // );
    };

    const handleKeyPress = (ev) => {
        console.log('handleKeyPress', ev);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    const handleSearchBook = (event) => {
        console.log('Search Book: ', event);
    }

    const selectBefore = (
        <Select defaultValue="bookID" className="select-before" style={{ width: '100px' }} >
            <Option value="bookID">Book ID</Option>
            <Option value="bookName">Book name</Option>
        </Select>
    );


    async function handleNewOrder(event) {
        const checkStudentInfo = {
            "studentID": event.studentID,
            "studentName": event.studentName
        }

        const response = await axios.post('http://localhost:4000/LibSystem/validate-student', checkStudentInfo);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Success')
            setSearchBookForm(true)
        } else {
            message.error('Wrong student info')
            console.log("ERROR: ", result.error)
        }
        createOrderForm.resetFields() //clear form
    }

    return (
        <div>
            CREATE NEW ORDER BOOKING
            <Form form={createOrderForm} onFinish={handleNewOrder} >
                <Form.Item name="studentID" rules={[{ required: true, message: 'Do not empty', },]}>
                    <Input placeholder="Student ID" className="fillOderInput" />
                </Form.Item>
                <Form.Item name="studentName" rules={[{ required: true, message: 'Do not empty', },]}>
                    <Input placeholder="Student name" className="fillOderInput" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16, }}          >
                    <Button type="primary" htmlType="submit" className="btn_sign-up">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <Divider>Enter books</Divider>
            <AutoComplete options={bookList} style={{ width: 200, }} onSelect={onSelect}
                onSearch={handleSuggest}
            // dataSource={bookList}
            >
                <Search addonBefore={selectBefore} placeholder="input search text" onSearch={handleSearchBook} style={{ width: '500px' }} />
                {suggestions && suggestions.map((suggestions, i) =>
                    <div key={i} className='suggestion' >{suggestions.id}   {suggestions.name}</div>
                )}
            </AutoComplete>

        </div>
    )
}

export default NewOrder