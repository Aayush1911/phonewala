import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
import Cookies from 'js-cookie';

function Signup(props) {
    const navigate=useNavigate()
    const [credentails, setcredentails] = useState({email:'',password:'',name:'',cpassword:''});
    const handlesubmit = async (e) => {
      e.preventDefault();
      const { name, email, password } = credentails;
      if (!name || !email || !password) {
        alert('Please fill in all required fields.');
        return;
      }
      const host=import.meta.env.VITE_API
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include' // Include cookies in the request
      });
      const json = await response.json();
      if (json && json.error === 'User already exists') {
        props.showalert('This email is already registered. Please use a different email.','danger');
      }
        // localStorage.setItem('token', json.authtoken);
        // Cookies.set('token', json.authtoken, { expires: 10 }); // Token will expire in 10 days
        else {
          // Store OTP in cookie after successful signup
          // Cookies.set('otp', json.otp, { secure: true, sameSite: 'strict' });
          navigate('/verify');
      }
    };
    
    
      const onchange = (e) => {
        setcredentails({ ...credentails, [e.target.name]: e.target.value });
      };
      const gologin=()=>{
        navigate('/login')
      }
  return (
    <div className="signup-container">
    <h2 className="signup-heading">Create an Account</h2>
    <div className="container mt-2 ">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            minLength={3}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onchange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onchange}
            required
            minLength={5}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onchange}
            required
            minLength={5}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      <button onClick={gologin} className="btn btn-primary my-2 mx-2">Already have an account</button>
      </form>
    </div>
    </div>
  );
}

export default Signup;