import React from "react";
import './Admin.css'
import axios from "axios";
import WebcamForCheck from "../Webcam/WebcamForCheck";

// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Layout, Tabs, Form, Input, Button, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

// import Webcam from "../Webcam";

const AdminPage = () => {

    // let navigate = useNavigate();
    // let history = useHistory();
    const [createOrderForm] = Form.useForm();

    let handleLogout = () => {
        // localStorage.setItem("accessToken", false);
        localStorage.removeItem("accessToken");
        console.log(localStorage.getItem("accessToken"));
        // navigate('/login');
        // history.replace("/login");
    }

    async function handleNewOrder(event) {
        const checkStudentInfo = {
            "studentID": event.studentID,
            "studentName": event.studentName
        }

        const response = await axios.post('http://localhost:4000/LibSystem/validate-student', checkStudentInfo);
        const result = response.data;

        if (result.status === 'ok') {
            message.success('Success')
        } else {
            message.error('Wrong student info')
            console.log("ERROR: ", result.error)
        }
        createOrderForm.resetFields() //clear form
    }


    return (
        <div>
            <Layout>
                <Header></Header>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="Create new order" key="1">
                        CREATE NEW ORDER BOOKING
                        <Form form={createOrderForm} onFinish={handleNewOrder}>
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
                    </TabPane>
                    <TabPane tab="Manage books" key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab="Orders" key="3">
                        Content of Tab 3
                    </TabPane>
                </Tabs>
                <Footer> Footer </Footer>
            </Layout>
        </div>
    )
}

export default AdminPage