import React, { useEffect, useState } from 'react';
import Cartfetch from './Cartfetch';

function Cart(props) {
  const host=import.meta.env.VITE_API
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCartData = async () => {
    try {
      const response = await fetch(`${host}/cart/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setCart(json);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  });

  // Calculate total price of all products in the cart
  const totalPrice = cart.reduce((total, item) => {
    // console.log(item);
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseFloat(item.quantity);
    if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
      return total + (itemPrice * itemQuantity);
    } else {
      console.error('Invalid price or quantity for item:', item);
      return total;
    }
  }, 0);

  // console.log('Cart:', cart);
  // console.log('Total Price:', totalPrice);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.productId}>
              <Cartfetch showalert={props.showalert} id={item.productId} quantity={item.quantity} cartid={item._id}  />
            </div>
          ))}
          <p className='mx-5 my-4'><b>Total Price: </b>{totalPrice.toFixed(2)}</p> {/* Ensure totalPrice is formatted correctly */}
          <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={()=>props.showalert(`Payment recieved of ${totalPrice}.`,'success')}>Buy now</button>
          </div>
        </>
      ) : (
        <p className='my-4 mx-4'><b>Your cart is empty.</b></p>
      )}
      
    </>
  );
}

export default Cart;
