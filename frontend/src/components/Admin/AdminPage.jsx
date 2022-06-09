import React from "react";
import './Admin.css'
import WebcamForCheck from "../Webcam/WebcamForCheck";
import Staff from "./Staff";
import Books from "./Books";
import RegisterStudent from "./RegisterStudent";
// import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Layout, Tabs } from 'antd';
const { Header, Footer, Content } = Layout;

const { TabPane } = Tabs;

const AdminPage = () => {

    // let navigate = useNavigate();
    // let history = useHistory();

    let handleLogout = () => {
        // localStorage.setItem("accessToken", false);
        localStorage.removeItem("accessToken");
        console.log(localStorage.getItem("accessToken"));
        // navigate('/login');
        // history.replace("/login");
    }

    return (
        <div>
            <Layout>
                <Header></Header>
                <Tabs tabPosition={'left'} style={{ backgroundColor: 'red' }}>
                    <TabPane tab="Library staff" key="1" style={{ backgroundColor: 'blue', height: '500px' }} >
                        <Staff />
                        sOMETHING HERE
                    </TabPane>
                    <TabPane tab="Books" key="2">
                        <Books />
                    </TabPane>
                    <TabPane tab="Orders" key="3">
                        Content of Tab 3
                    </TabPane>
                    <TabPane tab="Register student account" key="4">
                        <RegisterStudent />
                    </TabPane>
                </Tabs>
                <Footer> Footer </Footer>
            </Layout>
        </div>
    )
}

export default AdminPage