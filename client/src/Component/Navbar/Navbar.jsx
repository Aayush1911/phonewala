import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// main.js or main.ts
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate=useNavigate()
  let location=useLocation();
  const handlelogout=()=>{
    localStorage.removeItem('token')
    // alert('Logged out successfully!');
    navigate('/')

  }
  const isAuthenticated = localStorage.getItem('token');

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
              <Link className={`nav-link  ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
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
                    alert('Please log in to access the cart.');
                  }
                }}
              >
                Cart
              </Link>
              <Link
                className={`nav-link ${location.pathname === '/profile' ? 'active' : ''} `}
                aria-current="page"
                to="/profile"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    alert('Please log in to access the Profile.');
                  }
                }}
              >
                Profile
              </Link>
            </ul>
            {!localStorage.getItem('token')?
      <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1"to='/login' role="button">Login</Link>
        <Link className="btn btn-primary mx-1"to='/signup' role="button">Signup</Link>
      </form>:<button onClick={handlelogout} className="btn btn-primary mx-1" role="button">Logout</button>
}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar