import React, { Component } from "react";
import './Registration.css'
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate()

  const signIn = () => {

    // window.location.href = "/login";
    navigate('/login')
  };

  return (

    <div className="register-page" >
      <div className="header-bar">


      </div>
      <div className="form__sign-up">
        <div className="signIn__title">
          <h1>Sign Up</h1>
        </div>
        <input placeholder="Username" className="input__user-name" />
        <input type="password" placeholder="Password" className="input__password" />
        <input type="password" placeholder="Confirm password" className="input__password" />

        <div className="btn_sign-in">Sign Up</div>



        <p style={{ marginTop: "6%", marginLeft: "40%", cursor: "pointer" }} onClick={signIn}>
          Sign Up Now?
        </p>
      </div>

    </div>



  )
}

export default Registration