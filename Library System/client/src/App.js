import React, { useEffect } from "react";

import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import { Typography, Icon } from 'antd';
import './App.less';
import { useDispatch } from "react-redux";

import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Chatbot from './Chatbot/Chatbot';
import Login from "./components/Login";
import Order from "./components/Order/Order";
import AdminPage from "./components/Admin/AdminPage";

import { getAllBooks } from "./features/bookSlice";
import { setBookList } from "./features/bookSlice";

const { Title } = Typography;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getAllBooks()
      dispatch(setBookList(response.data.data))
      console.log('response', response.data.data)
    }
    fetchBook()
  }, [])

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
  )
}

export default App
