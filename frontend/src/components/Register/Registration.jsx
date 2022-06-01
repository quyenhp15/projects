import React from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import 'antd/dist/antd.css'
import { Input, DatePicker, Button, message, Form } from 'antd';

const Registration = () => {

  const navigate = useNavigate()
  const [signupForm] = Form.useForm();

  const signIn = () => {
    window.location.href = "/login";
    // navigate('/login')
  };

  async function buttonSignUp(event) {

    if (event.password !== event.confirmPassword) {
      message.error('Password and Confirm password does not the same')
      // db.inventory.find( { students: "STUDENT ID" } )
      return;
    } else {
      if (event.password.length < 5) {
        message.error('Require longer password')
        return
      }
    }

    //send data to backend
    const registered = {
      "studentID": event.studentID,
      "studentName": event.studentName,
      "dateOfBirth": event.birthday,
      "password": event.password,
      "email": event.studentEmail
    }
    const response = await axios.post('http://localhost:4000/LibSystem/signup', registered);
    const result = response.data;

    if (result.status === 'ok') {
      message.success('Sign Up success')
    } else if (result.error === 'User already exits') {
      message.error("Student ID exist")
    }
    else {
      message.error('Sign Up fail ')
      console.log("ERROR: ", result)
    }
    signupForm.resetFields() //clear form
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

        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
          onFinish={buttonSignUp} onFinishFailed={onFinishFailed} form={signupForm}>
          <Form.Item name="studentID" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input placeholder="Student ID" className="inputInfo" />
          </Form.Item>

          <Form.Item name="studentName" rules={[{ required: true, message: 'Do not empty', },]}          >
            <Input placeholder="Student name" className="inputInfo" />
          </Form.Item>

          <Form.Item name="birthday" rules={[{ required: true, message: 'Do not empty', },]}          >
            <DatePicker placeholder="Birthday" className="inputInfo" />
          </Form.Item>

          <Form.Item name="studentEmail" rules={[{ required: true, message: 'Do not empty', },]}          >
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