import React, { useRef } from "react";
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const LoginScreen = () => {

    const usernameInput = useRef();
    const passwordInput = useRef();
    let navigate = useNavigate();
    // let history = useHistory();

    // Check if user login or not
    function handleClickSignIn() {
        console.log(usernameInput.current.value);
        localStorage.setItem("accessToken", true)
        console.log(localStorage.getItem("accessToken"));
        navigate('/homepage');
        console.log("FROM Login")
    }

    function handleClickSignUp() {
        navigate('/register')
    }

    return (
        <div className="register-page">
            <div className="header-title">
                <ul>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">SERVICE</a></li>
                    <li><a href="#">ACCOUNT</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">CONTACT</a></li>
                </ul>
            </div>
            <div className="header-bar">

            </div>
            <div className="form__sign-up">
                <div className="signIn__title">
                    <h1>Sign In</h1>
                </div>
                <input placeholder="Your user name...." className="input__user-name" ref={usernameInput} />
                <input placeholder="Your password...." className="input__password" ref={passwordInput} />
                <button type="button" onClick={handleClickSignIn} className="btn_sign-in">
                    Sign In
                </button>
                <div className="remember-area">
                    <input
                        style={{
                            marginTop: "15px",
                            marginLeft: "5px",
                            marginRight: "5px",
                            cursor: "pointer",
                        }}
                        type="checkbox"
                    />
                    <p>Remember me</p>
                    <p style={{ marginLeft: "17%", cursor: "pointer" }} onClick={handleClickSignUp}>
                        Sign Up Now?
                    </p>

                </div>
            </div>

        </div>
    )
}

export default LoginScreen