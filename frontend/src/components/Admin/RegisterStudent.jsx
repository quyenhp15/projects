import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, DatePicker, Button, message, Form, Upload, Modal } from 'antd';
import 'antd/dist/antd.css'
import Webcam from "../Webcam";

const RegisterStudent = () => {

    // UPLOAD IMAGE variables
    const [visible, setVisible] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [signupForm] = Form.useForm();

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

    return (
        <div>
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
    )
}

export default RegisterStudent