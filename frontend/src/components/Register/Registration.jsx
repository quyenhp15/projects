import React, { Component, useRef } from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {

  // constructor() {
  //   super()
  //   this.state = {
  //     fullName: '',
  //     username: '',
  //     email: '',
  //     password: ''
  //   }
  // }

  const usernameRef = useRef(null)
  const fullNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  const signIn = () => {
    window.location.href = "/login";
    // navigate('/login')
  };

  const buttonSignUp = (event) => {
    event.preventDefault()

    const registered = {
      "fullName": fullNameRef.current.value,
      "username": usernameRef.current.value,
      "password": passwordRef.current.value,
      "email": emailRef.current.value
    }

    axios.post('http://localhost:4000/app/signup', registered).then(response => console.log(response.data))

    console.log(fullNameRef.current.value)
    console.log(usernameRef.current.value)
    console.log(passwordRef.current.value)
    console.log(emailRef.current.value)

  }

  return (

    <div className="register-page" >
      <div className="header-bar">

      </div>
      <div className="form__sign-up">
        <div className="signIn__title">
          <h1>Sign Up</h1>
        </div>
        <input ref={fullNameRef} />
        <input ref={emailRef} />

        <input placeholder="Username" className="input__user-name" ref={usernameRef} />
        <input type="password" placeholder="Password" className="input__password" ref={passwordRef} />
        <input type="password" placeholder="Confirm password" className="input__password" />

        <button className="btn_sign-in" onClick={buttonSignUp}>Sign Up</button>



        <p style={{ marginTop: "6%", marginLeft: "40%", cursor: "pointer" }} onClick={signIn}>
          Sign Up Now?
        </p>
      </div>

    </div>



  )
}

export default Registration