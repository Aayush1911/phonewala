import React, { useEffect, useState } from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'
import { CImage } from '@coreui/react';

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
  const handlesubmit = async (e, id) => {
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
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <>
      {/* <CCarousel controls indicators>
  <CCarouselItem>
    <CImage className="d-block w-100 " style={{height:"90vh"}} src='https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/Eureka_Launch/Sale/8thFeb/2Ingress.jpg' alt="slide 1" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>Samsung S24</h5>
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100 " style={{height:"90vh"}} src='https://m.media-amazon.com/images/G/31/img23/Wireless/nbshagun/new/1400x800._CB581251640_.jpg'  alt="slide 2" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>OnePlus 12R</h5>
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100 " style={{height:"90vh"}} src='https://m.media-amazon.com/images/G/31/img24/Wireless/Samsung/SamsungM/M14/27thFeb/D77911710_IN_WLME_SamsungM_M145G_Launch_catpage_1400x800._CB581959248_.jpg' alt="slide 3" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>Samsung M14 5G</h5>
    </CCarouselCaption>
  </CCarouselItem>
</CCarousel> */}
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
                    <button onClick={(e) => handlesubmit(e, mobile._id)} style={{ margin: " 0 auto", color: "red", display: "block", height: "40px", fontWeight: "500", fontSize: "1.2rem", border: "0.5px solid white", backgroundColor: "pink", margin: "0 auto" }} className='icon'>Add to cart</button>
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div >
    </>
  );
}

export default Homepage;
