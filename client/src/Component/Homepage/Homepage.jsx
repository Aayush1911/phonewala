import React, { useEffect, useState } from 'react';
import './Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link, useParams } from 'react-router-dom';
import { CCarousel, CCarouselItem, CCarouselCaption, CImage } from '@coreui/react';

function Homepage(props) {
  const { category } = useParams();
  const [mobileData, setMobileData] = useState([]);
  const host=import.meta.env.VITE_API
  const getallmobile = async () => {
    if(category){
    try {
      let url = `${host}/mobile/${category}`;
      let data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let parsedata = await data.json();
      setMobileData(parsedata);
    } catch (error) {
      console.error('Error fetching mobile data:', error);
    }
  }else{
    try {
      let url = `${host}/mobile/all`;
      let data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let parsedata = await data.json();
      setMobileData(parsedata);
    } catch (error) {
      console.error('Error fetching mobile data:', error);
    }
  }
  };

  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    getallmobile();
  }, [category]);

  const handlesubmit = async (e, id) => {
    e.preventDefault();
    if (!isAuthenticated) {
      e.preventDefault();
      alert('Please log in to access the cart.');
    }
    const response = await fetch(`${host}/cart/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    props.showalert("Product has benn Added","success")
    // console.log(json);
    // window.location.reload(); 
  };

  return (
    <>
      <div className="container">
        <div className="row my-4 mx-4">
          {mobileData.map((mobile) => (
            <div key={mobile._id} className="col-md-4">
              <div className="card mb-3">
                <Link to={`/description/${mobile._id}`} className="link-style">
                  <img
                    src={mobile.image}
                    className="card-img-top"
                    alt={mobile.model_name}
                    style={{ width: '100%', height: '300px' }}
                  />
                  <div className="card-body">
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
      </div>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Get to Know Us</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-white">About Us</Link>
                </li>
                <li>
                  <Link className="text-white">Careers</Link>
                </li>
                <li>
                  <Link className="text-white">Press Releases</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Make Money with Us</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-white">Sell on Phonewala</Link>
                </li>
                <li>
                  <Link className="text-white">Sell under Phonewala Accelerator</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Phonewala Payment Products</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-white">Amazon Business Card</Link>
                </li>
                <li>
                  <Link className="text-white">Shop with Points</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Let Us Help You</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link className="text-white">Your Account</Link>
                </li>
                <li>
                  <Link className="text-white">Your Orders</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Homepage;
