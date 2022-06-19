import React from "react";


import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import { Typography, Icon } from 'antd';
import './App.less';

import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Chatbot from './Chatbot/Chatbot';
import Login from "./components/Login";
import Order from "./components/Order/Order";
import AdminPage from "./components/Admin/AdminPage";

const { Title } = Typography;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </Router>

    // <div>
    //   {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
    //     <Title level={2} >CHAT BOT APP&nbsp;<Icon type="robot" /></Title>
    //   </div> */}
    //   <div style={{ display: 'flex', justifyContent: 'center' }}>

    //     <Chatbot />


    //   </div>
    // </div>
  )
}

export default App
