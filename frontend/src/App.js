import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
// import './App.css';
import './App.less';

import Webcam from './components/Webcam';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';

import Registration from './components/Register/Registration'
import AdminPage from './components/Admin/AdminPage';
import Login from './components/Login/index'
import Student from './components/Student/Student';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/student" element={<Student />} />
				{/* <Route path="/homepage" element={<AdminPage />} /> */}
				<Route path="/homepage" element={localStorage.getItem("accessToken") ? <AdminPage /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
