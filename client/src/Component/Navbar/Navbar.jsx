import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// main.js or main.ts
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
  let navigate = useNavigate()
  let location = useLocation();
  const host=import.meta.env.VITE_API
  const handlelogout = () => {
    localStorage.removeItem('token')
    // alert('Logged out successfully!');
    navigate('/login')
  }
  const [totalcart, settotalcart] = useState(0)
  const isAuthenticated = localStorage.getItem('token');
  const getallcart = async () => {
    if(!localStorage.getItem('token')){
      settotalcart(0)
    }else{
      try {
        let url = `${host}/cart/items`;
        let data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        let parsedata = await data.json();
        settotalcart(parsedata)
      } catch (error) {
        console.error('Error fetching mobile data:', error);
      }
    }
    
    
  };

  useEffect(() => {
    getallcart()
  })

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PhoneWala</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link  className={`nav-link  ${location.pathname === '/' ? 'active' : ""}`}
                 aria-current="page"
                 onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    props.showalert('Please log in to access the Phonewala.', 'danger');
                    navigate('/login')
                  }
                }}
                  to="/">Home
                </Link>
              </li>
              <li className="nav-item dropdown mx-3">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Company
                </a>
                <ul className="dropdown-menu">
                  <li><Link onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      props.showalert('Please log in to access the Phonewala.', 'danger');
                      navigate('/login')
                    }
                  }} className="dropdown-item " to='/mobile/Samsung' >Samsung</Link></li>
                  <li><Link onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      props.showalert('Please log in to access the Phonewala.', 'danger');
                      navigate('/login')
                    }
                  }} className="dropdown-item " to='/mobile/Apple'>Apple</Link></li>
                  <li><Link onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      props.showalert('Please log in to access the Phonewala.', 'danger');
                      navigate('/login')
                    }
                  }} className="dropdown-item" to='/mobile/Real me'>Realme</Link></li>
                  <li><Link onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      props.showalert('Please log in to access the Phonewala.', 'danger');
                      navigate('/login')
                    }
                  }} className="dropdown-item" to='/mobile/OnePlus'>OnePlus</Link></li>
                  <li><Link onClick={(e) => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      props.showalert('Please log in to access the Phonewala.', 'danger');
                      navigate('/login')
                    }
                  }} className="dropdown-item" to='/mobile/Vivo'>Vivo</Link></li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0 mx-3">
              <Link
                className={`nav-link ${location.pathname === '/cart' ? 'active' : ''} `}
                aria-current="page"
                to="/cart"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    props.showalert('Please log in to access the cart.', 'danger');
                  }
                }}
              >
                Cart 
                <span className="badge bg-danger mx-2">{totalcart}</span>
              </Link>
              <Link
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''} `}
                aria-current="page"
                to="/profile"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    props.showalert('Please log in to access the Profile.', 'danger');
                  }
                }}
              >
                Profile
              </Link>
            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-1" to='/login' role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to='/signup' role="button">Signup</Link>
              </form> : <button onClick={handlelogout} className="btn btn-primary mx-1" role="button">Logout</button>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar