import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';
import Webcam from './components/Webcam';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';

import Registration from './components/Register/Registration'
import Homepage from './components/Homepage/Homepage';
import LoginScreen from './components/Login/LoginScreen'


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginScreen />} />
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/homepage" element={<Homepage />} />
				<Route path="/homepage" element={localStorage.getItem("accessToken") ? <Homepage /> : <Navigate to="/" />} />
			</Routes>
		</Router>
	);
}

export default App;
