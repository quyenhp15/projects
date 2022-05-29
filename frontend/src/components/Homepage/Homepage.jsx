import React from "react";
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import Webcam from "../Webcam";

const Homepage = () => {

    let navigate = useNavigate();
    // let history = useHistory();

    let handleLogout = () => {
        // localStorage.setItem("accessToken", false);
        localStorage.removeItem("accessToken");
        console.log(localStorage.getItem("accessToken"));
        navigate('/login');
        // history.replace("/login");
    }


    return (
        <div>
            <h1 style={{ color: "red", fontSize: "50px" }}>HOME PAGE</h1>
            {/* <Webcam /> */}
            <button type="button" onClick={handleLogout}>
                Log Out
            </button>

        </div>
    )
}

export default Homepage