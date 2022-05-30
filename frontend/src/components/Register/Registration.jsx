import React, { Component, useRef } from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import 'antd/dist/antd.css'
import { Input, DatePicker, Button, message, Form } from 'antd';
import { useForm } from "antd/lib/form/Form";

const Registration = () => {

  const navigate = useNavigate()
  // const { reset } = useForm();

  const signIn = () => {
    window.location.href = "/login";
    // navigate('/login')
  };

  const buttonSignUp = (event) => {
    // event.preventDefault()

    if (event.password !== event.confirmPassword) {
      message.error('Password and Confirm password does not the same')
      // reset()
      return;
    }

    const registered = {
      "studentID": event.studentID,
      "studentName": event.studentName,
      "dateOfBirth": event.birthday,
      "password": event.password,
      "email": event.email
    }

    axios.post('http://localhost:4000/LibSystem/signup', registered).then(response => console.log(response.data))
    message.success('Sign Up success')

  }

  const onchange = (e) => {
    console.log(e.target.value)
  }

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
          onFinish={buttonSignUp} onFinishFailed={onFinishFailed} autoComplete="off" >
          <Form.Item name="studentID" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input placeholder="Student ID" className="inputInfo" />
          </Form.Item>

          <Form.Item name="studentName" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input placeholder="Student name" className="inputInfo" />
          </Form.Item>

          <Form.Item name="birthday" rules={[{ required: true, message: 'Do not empty', },]}          >
            <DatePicker placeholder="Birthday" className="inputInfo" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input placeholder="Email" className="inputInfo" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input.Password placeholder="Password" className="inputInfo" />
          </Form.Item>

          <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input.Password placeholder="Confirm password" className="inputInfo" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16, }}          >
            <Button type="primary" htmlType="submit" className="btn_sign-up">
              Sign Up
            </Button>
          </Form.Item>

        </Form>

        {/* <button className="btn_sign-in" onClick={buttonSignUp}>Sign Up</button> */}

        <p style={{ marginTop: "6%", marginLeft: "40%", cursor: "pointer" }} onClick={signIn}>
          Sign Up Now?
        </p>
      </div>

    </div>



  )
}

export default Registration