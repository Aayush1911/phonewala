import React, { useEffect, useState } from 'react';
import './Cart.css';
import { IoAdd } from "react-icons/io5";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Cartfetch(props) {
    const navigate = useNavigate();
    const { id } = props;
    const [mobileData, setMobileData] = useState(null);
    const [quantity, setQuantity] = useState(props.quantity);
    const host=import.meta.env.VITE_API


    useEffect(() => {
        const fetchMobileData = async () => {
            try {
                let url = `${host}/mobile/all/${id}`;
                let data = await fetch(url);
                let parsedData = await data.json();
                setMobileData(parsedData);
            } catch (error) {
                console.error('Error fetching mobile data:', error);
            }
        };

        fetchMobileData();
    }, [id]);

    const handleAdd = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/cart/add/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": Cookies.get('token')
            },
        });
        const json = await response.json();
        setQuantity(prevQuantity => prevQuantity + 1);
        props.showalert('Product has benn Incremented','success')
    };

    const handleSubtract = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/cart/sub/${props.cartid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": Cookies.get('token')
            },
        });
        const json = await response.json();
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
        props.showalert('Product has been Decremented','success')

    };

    const handleDelete = async (e) => {
        e.preventDefault();
        // console.log('Delete button clicked'); // Add this line for debugging

        const response = await fetch(`${host}/cart/delete/${props.cartid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": Cookies.get('token')
            },
        });
        // const json = await response.json();
        props.showalert('Product has been deleted','danger')
        // console.log(json);         
    };

    // Calculate total price within quantity
    const totalPrice = mobileData ? mobileData.price * quantity : 0;
    
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
                            {/* <p className="card-text">Total Price: {totalPrice}</p> */}
                            <div className="cart-button-container">
                                <button className="cart-button btn btn-primary" onClick={handleAdd}>
                                    <IoAdd />
                                </button>
                                <p className="card-text mx-2 my-1">Quantity: {quantity}</p>
                                <button className="cart-button btn btn-primary" onClick={handleSubtract}>
                                    <MdOutlineHorizontalRule />
                                </button>
                            </div>
                            <div className='delete'>
                            <button className="cart-button  btn btn-primary my-2" onClick={handleDelete}><MdDelete /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cartfetch;
