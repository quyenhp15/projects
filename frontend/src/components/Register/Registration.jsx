import React, { Component, useRef } from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import 'antd/dist/antd.css'
import { Input, DatePicker, Button, message, Form } from 'antd';

const Registration = () => {

  const navigate = useNavigate()

  const signIn = () => {
    window.location.href = "/login";
    // navigate('/login')
  };

  const buttonSignUp = (event) => {
    event.preventDefault()

    const registered = {
      // "studentID": studentIDRef.current.value,
      // "studentName": studentNameRef.current.value,
      // "dateOfBirth": dateOfBirthRef.current.value,
      // "password": passwordRef.current.value,
      // "email": emailRef.current.value
    }

    axios.post('http://localhost:4000/LibSystem/signup', registered).then(response => console.log(response.data))

  }

  const onchange = (e) => {
    console.log(e.target.value)
  }

  const onFinish = (values) => {
    console.log('Success:', values.username);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (

    <div className="register-page" >
      <div className="header-bar">

      </div>
      <div className="form__sign-up">
        <div className="signIn__title">
          <h1>Sign Up</h1>
        </div>

        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }}
          onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
          <Form.Item name="studentID" rules={[{
            required: true,
            message: 'Please input student ID!',
          },]}          >
            <Input placeholder="Student ID" className="inputInfo" />
          </Form.Item>

          <Form.Item name="username" rules={[{
            required: true,
            message: 'Please input your username!',
          },]}          >
            <Input placeholder="Student ID" className="inputInfo" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{
            required: true,
            message: 'Please input your password!',
          },]}          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>

        <input placeholder="Student ID" className="inputInfo" />
        <input placeholder="Student name" className="inputInfo" />
        <DatePicker placeholder="Birthday" className="inputInfo" />
        <br />
        <br />
        <input placeholder="Email" className="inputInfo" />

        <Input.Password type="password" placeholder="Password" className="input__password" onChange={onchange} />
        <Input.Password type="password" placeholder="Confirm password" className="input__password" />

        <button className="btn_sign-in" onClick={buttonSignUp}>Sign Up</button>



        <p style={{ marginTop: "6%", marginLeft: "40%", cursor: "pointer" }} onClick={signIn}>
          Sign Up Now?
        </p>
      </div>

    </div>



  )
}

export default Registration