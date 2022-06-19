import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'antd/dist/antd.css';
import './chatbot.less'
import { ShoppingCartOutlined, PlusCircleTwoTone, RobotFilled, RobotOutlined, UserOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveMessage, deleteMessage } from '../features/messageSlice';
import Message from './Sections/Message';
import { List, Avatar, Button, Card, message, Layout, Typography } from 'antd';
import { logout } from '../features/userSlice';
const { Header, Footer, Content } = Layout;
const { Title } = Typography;

function Chatbot() {

    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user.user)

    const [allMessages, setAllMessages] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        // if (user === null) {
        //     navigate('/')
        //     return;
        // }
        dispatch(deleteMessage())

        eventQuery('firstGreeting')

        const conversation = {
            who: 'bot',
            content: {
                text: {
                    text: "Hello " + user.data.name + "! This is automatic library system. I will help you find your book",
                }
            }
        }
        dispatch(saveMessage(conversation))

        console.log('USer: ', user)

    }, [])


    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation))
        // console.log('text I sent', conversation)

        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: content
                }

                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }

            dispatch(saveMessage(conversation))
        }

    }


    const eventQuery = async (event) => {

        // We need to take care of the message Chatbot sent 
        const eventQueryVariables = {
            event
        }
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            // console.log('Response: ', response.data.fulfillmentMessages);
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content
                }
                dispatch(saveMessage(conversation))
            }


        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

    }


    const keyPressHanlder = (e) => {
        if (e.key === "Enter") {

            if (!e.target.value) {
                return alert('you need to type somthing first')
            }

            //we will send request to text query route 
            textQuery(e.target.value)
            e.target.value = "";
        }
    }

    const renderOptions = (options) => {
        return (
            options.map((item, i) => {
                const title = item.structValue.fields.title.stringValue;
                const value = item.structValue.fields.value.stringValue;
                return (
                    <div>
                        <Card key={i} onClick={() => handleOnClickTitle(value)}>
                            {title}
                        </Card>
                    </div>
                );
            }))
    };

    const renderDepartments = (departments) => {
        return (
            departments.map((item, i) => {
                const departmentID = item.departmentID;
                const departmentName = item.departmentName
                return (
                    <div>
                        <Card key={i} onClick={() => handleClickDepartment(departmentID)}>
                            {/* <Meta title={departmentName} /> */}
                            {departmentName}
                        </Card>
                    </div>
                );
            }))
    }

    const renderBooks = (books) => {
        console.log('renderBooks: ', books)

        return (
            <InfiniteScroll dataLength={books.length} scrollableTarget="scrollableDiv"
                endMessage='It is all books, nothing more 🤐'
            >

                {/* // <List.Item key={i} style={{ padding: '1rem' }}>
            //         <List.Item.Meta
            //             avatar={<Avatar icon={AvatarSrc} />}
            //             title={message.who}
            //             description={renderBooks(contentList)}
            //         />
            //     </List.Item> */}

                <List dataSource={books} itemLayout="horizontal"
                    renderItem={(item) => (
                        <List.Item key={item._id} style={{ width: '500px' }} >
                            <List.Item.Meta title={item.bookName}
                                description={renderAuthorName(item.authorName)}
                            />
                            <Button icon={<PlusCircleTwoTone />} onClick={() => handleClickBook(item._id)} >Add to cart</Button>
                        </List.Item>
                    )}
                />

            </InfiniteScroll>
        )
    }

    const renderAuthorName = (authors) => {
        // let authorString = ''
        // console.log('length: ', authors.length)
        // for (let i = 0; i < authors.length; i++) {
        //     authorString = authorString + authors[i]
        //     if (i != authors.length - 1) {
        //         authorString += ', '
        //     }
        // }
        return 'Author: ' + authors
    }

    const handleClickBook = async (bookID) => {
        console.log('bookID: ', bookID)
        try {
            let newShoppingCartItem = {
                bookID: bookID,
                cartID: '62a828d235a5f3f7145af5d7'
            }
            const response = await Axios.post('http://localhost:5000/user/add-shopping-cart-item', newShoppingCartItem)
            const result = response.data.data

            if (response.data.status === 'ok') {
                message.success('Add to cart')
            } else {
                message.error('Cannot add item')
            }

        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem Department"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }

    const makeBotConversation = (contentField, array) => {
        let conversation = {
            who: 'bot',
            content: {
                platform: "PLATFORM_UNSPECIFIED",
                message: 'payload',
                payload: {
                    fields: contentField

                }
            }
        }
        return conversation
    }

    const handleClickDepartment = async (departmentID) => {
        try {
            //I will send request to the textQuery ROUTE 
            const response = await Axios.get('http://localhost:5000/books/department/' + departmentID)
            const result = response.data.data

            let contentField = {
                books: {
                    kind: 'listValue',
                    listValue: {
                        values: result
                    }
                }
            }
            const conversation = makeBotConversation(contentField)

            console.log('Books conversation: ', conversation);
            dispatch(saveMessage(conversation))

        } catch (error) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: " Error just occured, please check the problem Department"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }
    }

    const findBookByAuthor = async (authorName) => {
        console.log('Author name: ', authorName)
        try {
            const response = await Axios.get('http://localhost:5000/books/author/' + authorName)
            const result = response.data
            // console.log('result: ', result)

            if (result.status === 'ok') {
                console.log('return Result: ', result.data)
                // setBookListByAuthor(result.data)
                return result.data
            } else {
                return null
            }

        } catch (error) {
            console.log('Error when find book by author: ', error);
            return null
        }
    }

    const findBookByID = async (bookID) => {
        console.log('findBookByID: ', bookID)
        try {
            const response = await Axios.get('http://localhost:5000/books/id/' + bookID)
            const result = response.data

            if (result.status === 'ok') {
                console.log('return Result: ', result.data)
                // setBookListByAuthor(result.data)
                return result.data
            } else {
                return 'No book found'
            }

        } catch (error) {
            console.log('Error when find book by bookID: ', error);
            return null
        }
    }


    const handleOnClickTitle = async (value) => {
        switch (value) {
            case 'department':
                // eventQuery('departmentOption')
                try {
                    //I will send request to the textQuery ROUTE 
                    const response = await Axios.get('http://localhost:5000/books/departments')
                    const result = response.data.data

                    let contentField = {
                        departments: {
                            kind: 'listValue',
                            listValue: {
                                values: result
                            }
                        }
                    }
                    const conversation = makeBotConversation(contentField)

                    console.log('Departments conversation: ', conversation);
                    dispatch(saveMessage(conversation))

                } catch (error) {
                    let conversation = {
                        who: 'bot',
                        content: {
                            text: {
                                text: " Error just occured, please check the problem Department"
                            }
                        }
                    }
                    dispatch(saveMessage(conversation))
                }
                break
            case 'author':
                textQuery('Author')
                break;
            case 'bookid':
                textQuery('Find book by ID')
                break
            default:


        }
    };

    const renderOneMessage = async (message, i) => {
        console.log('message', message)

        // we need to give some condition here to separate message kinds

        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            return <Message key={i} who={message.who} text={message.content.text.text} />
            // } else if (message.content && message.content.payload.fields.options) {
        } else if (message.content && message.content.payload.fields.options) {

            const contentList = message.content.payload.fields.options.listValue.values;
            console.log('Options payload: ', message.content.payload.fields.options);
            const AvatarSrc = message.who === 'bot' ? (<RobotFilled />) : (<UserOutlined />);


            return (
                <List.Item key={i} style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderOptions(contentList)}
                    />
                </List.Item>
            );
        } else if (message.content && message.content.payload.fields.departments) {
            const contentList = message.content.payload.fields.departments.listValue.values;
            console.log('departments payload: ', message.content.payload.fields.departments);
            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <UserOutlined />;

            return (
                <List.Item key={i} style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderDepartments(contentList)}
                    />
                </List.Item>
            );
        } else if (message.content && message.content.payload.fields.books) {
            const contentList = message.content.payload.fields.books.listValue.values;
            console.log('books payload: ', message.content.payload.fields.books);
            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <UserOutlined />;

            return (
                <List.Item key={i} style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderBooks(contentList)}
                    />
                </List.Item>
            );
        } else if (message.content && message.content.payload.fields.author) {
            const authorName = message.content.payload.fields.author.stringValue
            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <UserOutlined />;

            const bookList = await findBookByAuthor(authorName)

            console.log('Boook list: ', bookList);

            if (bookList != null) {
                return (
                    <List.Item key={i} style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description={renderBooks(bookList)}
                        />
                    </List.Item>
                );
            } else {
                return (
                    <List.Item key={i} style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description={'Sorry! No book found by author name: ' + authorName}
                        />
                    </List.Item>
                );
            }

        } else if (message.content && message.content.payload.fields.bookID) {
            const bookID = message.content.payload.fields.bookID.stringValue
            // const AvatarSrc = message.who === 'bot' ? (<Icon type='robot' />) : (<Icon type='smile' />);
            const AvatarSrc = message.who === 'bot' ? <RobotOutlined /> : <UserOutlined />;


            const book = await findBookByID(bookID)

            console.log('Boook : ', book);
            const bookList = [book]

            if (book !== 'No book found') {
                return (
                    <List.Item key={i} style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description={renderBooks(bookList)}
                        />
                    </List.Item>
                );
            } else {
                return (
                    <List.Item key={i} style={{ padding: '1rem' }}>
                        <List.Item.Meta
                            avatar={<Avatar icon={AvatarSrc} />}
                            title={message.who}
                            description='Sorry! No book found'
                        />
                    </List.Item>
                );
            }

        }
    }

    const renderMessage = (returnedMessages) => {
        if (returnedMessages) {
            return Promise.all(
                returnedMessages.map(async (message, i) => {
                    return await renderOneMessage(message, i);
                })
            );
        } else {
            return null;
        }
    };

    useEffect(() => {
        console.log('Useeffect', messagesFromRedux);
        renderMessage(messagesFromRedux).then((data) =>
            setAllMessages(data)
        );
    }, [messagesFromRedux]);

    return (
        <div>
            <Header>
                <ShoppingCartOutlined onClick={() => navigate('/shopping-cart')}
                    style={{ color: 'white', fontSize: '50px' }}
                />
                <Button onClick={() => {
                    dispatch(logout())
                    navigate('/')
                }} >Log out</Button>
            </Header>
            <div style={{ height: 790, width: 700, border: '3px solid black', borderRadius: '7px', marginLeft: '25%' }}>
                <Content>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                        <Title level={2} >CHAT BOT APP&nbsp;<RobotOutlined /></Title>
                        <p>You can type help for finding books</p>
                    </div>
                    <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                        {allMessages}
                    </div>
                    <input
                        style={{
                            margin: 0, width: '100%', height: 50,
                            borderRadius: '4px', padding: '5px', fontSize: '1rem'
                        }}
                        placeholder="Send a message..." onKeyPress={keyPressHanlder} type="text"
                    />
                </Content>
            </div>
        </div>
    )
}

export default Chatbot;