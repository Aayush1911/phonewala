import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [addressPromptShown, setAddressPromptShown] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found.');
                }

                let addressToSend = localStorage.getItem('address');
                if (!addressToSend && !addressPromptShown) {
                    addressToSend = prompt('Please enter your address:');
                    setAddressPromptShown(true);
                    if (!addressToSend) return; // If user cancels the prompt
                    localStorage.setItem('address', addressToSend);
                }

                const response = await axios.post(`http://localhost:4000/profile/add`, { address: addressToSend }, {
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
                </div>
            )}
        </div>
    );
};

export default UserProfile;
