import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import './index.less';
import axios from 'axios';
import { motion } from 'framer-motion';
import bookImage from '../img/undraw_books_re_8gea.svg';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();
    // let history = useHistory();
    const [form] = Form.useForm();

    async function onFinish(event) {
        const user = {
            "studentID": event.studentID,
            "password": event.password
        };
        const response = await axios.post('http://localhost:4000/LibSystem/login', user)
        const result = response.data;

        console.log('Role: ', result.role);
        if (result.status === 'ok') {
            localStorage.setItem("accessToken", true)
            // navigate('/homepage');
            message.success('Sign In success as role: ', result.role)
            navigate('/homepage')
        } else {
            message.error(result.error)
        }
        // form.resetFields()
    };

    return (
        <>
            <div className='container_form-signin'>
                <motion.div className='circle-background' initial={{ translateY: 1000 }}
                    animate={{ translateY: 0 }} transition={{ type: 'spring', duration: 1.7 }} />
                <motion.div className='loginForm' initial={{ translateX: -500 }} animate={{ translateX: 0 }}
                    transition={{ type: 'spring', duration: 1.7 }}   >

                    <h1 className='title-signin'>Sign in</h1>
                    <Form form={form} name='login' layout='vertical' onFinish={onFinish}                    >
                        <Form.Item name='studentID' rules={[{
                            required: true, message: 'Please input your username!',
                        },]}  >
                            <Input allowClear prefix={<UserOutlined />} placeholder='Student ID' />
                        </Form.Item>
                        <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!', },]} >
                            <Input allowClear prefix={<LockOutlined />} type='password' placeholder='Password' />
                        </Form.Item>
                        <Form.Item>
                            <a className='login-form-forgot' href=''>Forgot password?</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' shape='round' className='btn-sign-in'>
                                Log in
                            </Button>
                            <br></br>
                        </Form.Item>
                    </Form>
                </motion.div>
                <motion.div className='image_signin'>
                    <motion.div className='signup-suggestion' initial={{ opacity: 0, translateY: 700 }}
                        animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1.3, delay: 0.2 }}                    >
                        <h1 className=''>New here?</h1>
                        <p>
                            While it may not be obvious to everyone, there are a
                            number of reasons creating random paragraphs can be
                            useful. A few examples of how some people use this
                            generator are listed in the following paragraphs.
                        </p>
                    </motion.div>
                    <motion.img className='bookImage' src={bookImage} alt='' initial={{ opacity: 0, translateY: 500 }}
                        animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1.3, delay: 0.3 }} />
                </motion.div>
            </div>
        </>
    );
};

export default Login;
