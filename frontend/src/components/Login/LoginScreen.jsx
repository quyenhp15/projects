import React, { useRef } from "react";
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from "axios";

import 'antd/dist/antd.css'
import { Input, DatePicker, Button, message, Form } from 'antd';

const LoginScreen = () => {

    let navigate = useNavigate();
    // let history = useHistory();
    const [signupForm] = Form.useForm();


    // Check if user login or not
    async function handleClickSignIn(event) {

        // event.preventDefault()

        //send data to backend
        const signinAccount = {
            "studentID": event.studentID,
            "password": event.password
        }
        const response = await axios.post('http://localhost:4000/LibSystem/login', signinAccount)
        const result = response.data;

        // console.log("Result Login: ", result.status)
        if (result.status === 'ok') {
            localStorage.setItem("accessToken", true)
            navigate('/homepage');
            message.success('Sign In success')
        } else {
            signupForm.resetFields()
            message.error(result.error)
        }
    }

    function handleClickSignUp() {
        navigate('/register')
    }

    return (
        <div className="register-page">
            <div className="header-title">
                <ul>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">SERVICE</a></li>
                    <li><a href="#">ACCOUNT</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">CONTACT</a></li>
                </ul>
            </div>
            <div className="header-bar">

            </div>
            <div className="form__sign-up">
                <div className="signIn__title">
                    <h1>Sign In</h1>
                </div>
                <Form onFinish={handleClickSignIn} form={signupForm}>
                    <Form.Item name="studentID" rules={[{ required: true, message: 'Do not empty', },]} >
                        <Input placeholder="Student ID" className="input__user-name" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Do not empty', },]} >
                        <Input.Password placeholder="Password" className="input__user-name" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}          >
                        <Button type="primary" htmlType="submit" className="btn_sign-up">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <div className="remember-area">
                    <input
                        style={{
                            marginTop: "15px",
                            marginLeft: "5px",
                            marginRight: "5px",
                            cursor: "pointer",
                        }}
                        type="checkbox"
                    />
                    <p>Remember me</p>
                    <p style={{ marginLeft: "17%", cursor: "pointer" }} onClick={handleClickSignUp}>
                        Sign Up Now?
                    </p>

                </div>
            </div>

        </div>
    )
}

export default LoginScreen