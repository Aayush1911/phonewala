import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Description.css'

function Description(props) {
    const { id } = useParams();
    const [mobileData, setMobileData] = useState(null);
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
    const isAuthenticated = localStorage.getItem('token');
    const handlesubmit = async (e,id) => {
        e.preventDefault();
        if (!isAuthenticated) {
          e.preventDefault();
          props.showalert('Please log in to access the cart.','danger');
        }else{
        const response = await fetch(`${host}/cart/add/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
    
        });
        const json = await response.json();
        // console.log(json);
        props.showalert('Product has benn Added','success')
    }
      };
    const renderDescription = () => {
        if (!mobileData) return null;

        // Split the description into an array of sentences
        const sentences = mobileData.description.split('. ');

        // Render each sentence as a list item with a bullet point
        return (
            <ul>
                {sentences.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mt-4">
            {mobileData ? (
                <div className="row my-4">
                    <div className="col-md-4">
                        <img src={mobileData.image} alt={mobileData.model_name} className="img-fluid my-5" />
                    </div>
                    <div className="col-md-8">
                        <h2>{mobileData.model_name}</h2>
                        {/* <p>{mobileData._id}</p> */}
                        <p><strong>Company : </strong> {mobileData.company_name}</p>
                        <p><strong>Price : ₹</strong> {mobileData.price}</p>
                        <div>
                            <strong>Description:</strong>
                            {renderDescription()}
                        </div>
                        <button  onClick={(e) => handlesubmit(e,id)}style={{backgroundColor:"pink",color:"red",border:"1px solid red",display:"block",height:"40px",width:"150px",margin:"0 auto"}} className='icon'>Add to cart</button>
                        {/* <button style={{backgroundColor:"pink",color:"red",border:"1px solid red",display:"block",height:"40px",width:"150px",margin:"10px auto"}} className='icon'>Buy Now</button> */}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Description;
