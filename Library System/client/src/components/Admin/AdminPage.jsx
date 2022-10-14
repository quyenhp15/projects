import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/userSlice'
import './Admin.css'
import Staff from "./Staff";
import Books from "./Books";
import RegisterStudent from "./RegisterStudent";
import Order from "./Order";
import 'antd/dist/antd.css'
import { Layout, Tabs, Button } from 'antd';
const { Header, Footer, Content, } = Layout;

const { TabPane } = Tabs;

const AdminPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    const [fetchBooks, setFetchBooks] = useState(false)

    let navigate = useNavigate();

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
                <Header>
                    <Button onClick={() => {
                        dispatch(logout())
                        navigate('/')
                    }} >Log out</Button>
                </Header>
                <Tabs tabPosition={'left'} style={{ backgroundColor: 'aqua' }}>
                    <TabPane tab="Library staff" key="1" style={{ backgroundColor: 'blue', height: '500px' }} >
                        {/* <Staff /> */}
                        sOMETHING HERE
                    </TabPane>
                    <TabPane tab="Books" key="2" style={{ backgroundColor: 'beige' }} >
                        <Books fetchBooks={fetchBooks} setFetchBooks={setFetchBooks} />
                    </TabPane>
                    <TabPane tab="Orders" key="3" style={{ backgroundColor: 'beige' }}>
                        <Order setFetchBooks={setFetchBooks} />
                    </TabPane>
                    <TabPane tab="Register student account" key="4" style={{ backgroundColor: 'beige' }}>
                        <RegisterStudent />
                    </TabPane>
                </Tabs>
                <Footer> Footer </Footer>
            </Layout>
        </div>
    )
}

export default AdminPage