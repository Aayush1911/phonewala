import React, { useEffect, useState } from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Homepage() {
  const [mobileData, setMobileData] = useState([]);
  const getallmobile = async () => {
    try {
      let url = 'http://localhost:4000/mobile/all';
      let data = await fetch(url);
      let parsedata = await data.json();
      setMobileData(parsedata);
    } catch (error) {
      console.error('Error fetching mobile data:', error);
    }
  };
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    getallmobile();
  }, []);
  const handlesubmit = async (e,id) => {
    e.preventDefault();
    if (!isAuthenticated) {
      e.preventDefault();
      alert('Please log in to access the cart.');
    }
    const host = 'http://localhost:4000';
    const response = await fetch(`${host}/cart/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json);
  };
  return (
    <div className="container">
      <div className="row my-4 mx-4">
        {mobileData.map((mobile) => (
          <div key={mobile._id} className="col-md-4">
            <div className="card mb-3 " >
              <Link to={`/description/${mobile._id}`} className="link-style">
                <img
                  src={mobile.image}
                  className="card-img-top"
                  alt={mobile.model_name}
                  style={{ width: '100%', height: '300px' }}
                />              <div className="card-body">
                  <p className="card-title" style={{ fontWeight: "400" }}><strong>Model : </strong>{mobile.model_name}</p>
                  <p className="card-text"><strong>Company :</strong> {mobile.company_name}</p>
                  <p className="card-text"><b>Price : ₹</b>{mobile.price}</p>
                  <Link to={'/cart'} style={{ textDecoration: 'none', color: 'black' }}>
                    <button onClick={(e) => handlesubmit(e, mobile._id)} style={{ margin: " 0 auto", color: "red", display: "block", height: "40px",fontWeight:"500",fontSize:"1.2rem", border: "0.5px solid white", backgroundColor: "pink", margin: "0 auto" }} className='icon'>Add to cart</button>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div >

  );
}

export default Homepage;
