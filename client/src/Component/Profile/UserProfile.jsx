import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [addressPromptShown, setAddressPromptShown] = useState(false);
    const[totalcart,settotalcart]=useState(0)
    const host=import.meta.env.VITE_API

    const getallcart = async () => {
        try {
          let url = `${host}/cart/items`;
          let data = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":Cookies.get('token')
            },
          });
          let parsedata = await data.json();
          settotalcart(parsedata)
        } catch (error) {
          console.error('Error fetching mobile data:', error);
        }
      };
      useEffect(()=>{
        getallcart()
      })
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    throw new Error('Authentication token not found.');
                }

                let addressToSend = sessionStorage.getItem('address');
                if (!addressToSend && !addressPromptShown) {
                    addressToSend = prompt('Please enter your address:');
                    setAddressPromptShown(true);
                    if (!addressToSend) return; // If user cancels the prompt
                    sessionStorage.setItem('address', addressToSend);
                }

                const response = await axios.post(`${host}/profile/add`, { address: addressToSend }, {
                    headers: {
                        "auth-token": token 
                    }
                });
                setProfile(response.data);
            } catch (err) {
                if (err.response && err.response.data) {
                    setError(err.response.data);
                } else {
                    setError(err.message || 'Something went wrong. Please try again.');
                }
            }
        };

        fetchProfile();
    }, [addressPromptShown]);

    return (
        <div className='container my-4'>
            <h2>User Profile</h2>
            {<div style={{ color: 'red' }}>{error}</div>}
            {profile && (
                <div className='my-4'>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <p><strong>Cart Items:</strong> {totalcart}</p>

                </div>
            )}
        </div>
    );
};

export default UserProfile;
