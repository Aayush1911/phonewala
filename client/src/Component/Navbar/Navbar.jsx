import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// main.js or main.ts
import 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom';

function Navbar() {
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
                <Link className="nav-link active" to='/' aria-current="page" href="#">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0 mx-3">
            <Link className="nav-link active" to='/cart' aria-current="page" href="#">Cart</Link>
            </ul>
            <form className="d-flex" role="search">
            <Link className="btn btn-outline-primary" to='/login' role='button'>Login</Link>
            <Link className="btn btn-outline-primary mx-2" to='/signup' role='button'>Signup</Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar