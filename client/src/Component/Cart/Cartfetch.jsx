import React, { useEffect, useState } from 'react';
import './Cart.css'
import { IoAdd } from "react-icons/io5";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Cartfetch(props) {
    const navigate = useNavigate();
    const { id } = props;
    const [mobileData, setMobileData] = useState(null);

    useEffect(() => {
        const fetchMobileData = async () => {
            try {
                let url = `http://localhost:4000/mobile/all/${id}`;
                let data = await fetch(url);
                let parsedData = await data.json();
                setMobileData(parsedData);
            } catch (error) {
                console.error('Error fetching mobile data:', error);
            }
        };

        fetchMobileData();
    }, [id]);
    const [quantity,setquantity]=useState(props.quantity)
    const handleadd = async (e) => {
        e.preventDefault();
        const host = 'http://localhost:4000';
        const response = await fetch(`${host}/cart/add/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        // console.log(json);
        setquantity(prevQuantity => prevQuantity + 1);
      };
      const handlesub = async (e) => {
        e.preventDefault();
        const host = 'http://localhost:4000';
        const response = await fetch(`${host}/cart/sub/${props.cartid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        // console.log(json);
        setquantity(prevQuantity => prevQuantity - 1);
         
      };
      const handledelete = async (e) => {
        e.preventDefault();
        const host = 'http://localhost:4000';
        const response = await fetch(`${host}/cart/delete/${props.cartid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
         
        // console.log(json);         
      };
    return (
        <div className="card mb-3" style={{ margin: "30px 100px" }}>
            {mobileData && (
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={mobileData.image} style={{ width: '150px', height: '150px', margin: "20px" }} className="img-fluid rounded-start" alt={mobileData.model_name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{mobileData.model_name}</h5>
                            <p className="card-text">Price: {mobileData.price}</p>
                            <div className="cart-button-container">
                                <button className="cart-button" onClick={handleadd}>
                                    <IoAdd />
                                </button>
                                <p className="card-text mx-2 my-1">Quantity: {quantity}</p>
                                <button className="cart-button" onClick={handlesub}>
                                    <MdOutlineHorizontalRule />
                                </button>
                            </div>                            
                            <button className="cart-button" onClick={handledelete}><MdDelete /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cartfetch;
