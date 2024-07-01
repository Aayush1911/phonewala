import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const VerifyOTP = () => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
        credentials: 'include', // Include credentials (cookies)
      });
      // Handle successful verification, e.g., redirect to dashboard
      const json = await response.json();
      if (response.ok) {
        setSuccessMessage(json.message);
        setError('');
        // Store authtoken in cookies
        Cookies.set('token', json.authtoken, { expires: 10 });
        navigate('/')
        // Handle successful verification, e.g., redirect to dashboard
      } else {
        setError(json.error);
        setSuccessMessage('');
      }
    } catch (err) { 
    //   setError(err.response.data.error);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Verify OTP</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOTP">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button className='my-3' variant="primary" type="submit" block='true'>
                  Verify OTP
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
