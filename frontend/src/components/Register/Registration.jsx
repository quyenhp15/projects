import React, { useState, useEffect } from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'antd/dist/antd.css'
import { Input, DatePicker, Button, message, Form, Upload, Modal } from 'antd';

import Webcam from "../Webcam";

const Registration = () => {

  const navigate = useNavigate()
  const [signupForm] = Form.useForm();

  // UPLOAD IMAGE variables
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState(null);


  const signIn = () => {
    window.location.href = "/login";
    // navigate('/login')
  };

  async function buttonSignUp(event) {

    console.log("Image signup: ", imageData);

    if (event.password !== event.confirmPassword) {
      message.error('Password and Confirm password does not the same')
      return;
    } else {
      if (event.password.length < 5) {
        message.error('Require longer password')
        return
      }
    }

    //send data to backend
    const registered = {
      studentID: event.studentID,
      studentName: event.studentName,
      dateOfBirth: new Date(),
      password: event.password,
      email: event.studentEmail,
      faceID: imageData,
      role: 'student'
    }
    const response = await axios.post('http://localhost:4000/LibSystem/signup', registered);
    const result = response.data;
    console.log(result)

    if (result.status === 'ok') {
      message.success('Sign Up success')
    } else if (result.error === 'User already exits') {
      message.error("Student ID exist")
    } else {
      message.error('Sign Up fail ')
      console.log("ERROR: ", result.error)
    }
    signupForm.resetFields() //clear form
    setImageData(null)
  }

  const onchange = (e) => {
    console.log(e.target.value)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    setVisible(visible => !visible);
  }

  const handleCancle = () => {
    setVisible(visible => !visible);
  }

  // Function for Upload Image
  useEffect(() => {
    console.log('img', imageData);
  }, [imageData]);

  // UPLOAD IMAGE functions
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div style={{ marginTop: 8, }}      >
      Upload
    </div>
  );

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

          <Button onClick={() => setVisible((visible) => !visible)}>
            {visible ? 'Turn Off' : 'Turn On'}
          </Button>
          <Modal visible={visible} onOk={handleOk} onCancel={handleCancle}>
            <Webcam onReceiveImg={setImageData} />
          </Modal>

          <Form.Item wrapperCol={{ offset: 8, span: 16, }}          >
            <Button type="primary" htmlType="submit" className="btn_sign-up">
              Sign Up
            </Button>
          </Form.Item>

        </Form>
      </div>

    </div>



  )
}

export default Registration