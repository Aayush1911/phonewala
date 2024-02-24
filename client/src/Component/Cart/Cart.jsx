import React, { useContext, useEffect, useState } from 'react';
import Cartfetch from './Cartfetch';

function Cart() {
  const host='http://localhost:4000'
  const initialcart=[]
  const [cart,setcart]=useState(initialcart)
  const getallcart=async ()=>{
    const response=await fetch(`${host}/cart/all`,{
      method:"GET",
      headers:{
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem('token')
      }
  })
  const json = await response.json();
  setcart(json);
  
  }
  useEffect(()=>{
    getallcart()
  },[])
  
  return (
    <>
     {cart.map((item) => (
          <div key={item.productId}>
            <Cartfetch id={item.productId}/>      
          </div>
        ))
      }
    </>
  );
}

export default Cart;
