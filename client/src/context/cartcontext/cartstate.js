import React, { useState } from "react";
import cartcontext from "./cartcontext";

const cartstate=(props)=>{
    const host='http://localhost:4000'
    const initialcart=[
               {
          "_id": "65d77e4395dcada039a58f89",
          "productId": "65cedde5d1dc1eb58943e20a",
          "quantity": "15",
          "__v": "0"
        }
      ]
    const [cart,setcart]=useState(initialcart)
    const getcart=async()=>{
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
    console.log(json);
    }
    return (
        <cartcontext.Provider
          value={{ cart,getcart }}
        >
          {props.children}
        </cartcontext.Provider>
      );
}
export default cartstate