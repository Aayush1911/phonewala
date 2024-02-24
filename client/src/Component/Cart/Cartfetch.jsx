import React, { useEffect, useState } from 'react';
import './Cart.css'
function Cartfetch(props) {
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

    return (
        <div className="card mb-3" style={{margin:"30px 100px"}}>
            {mobileData && (
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={mobileData.image}style={{ width: '150px', height: '150px',margin:"20px" }} className="img-fluid rounded-start" alt={mobileData.model_name} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{mobileData.model_name}</h5>
                            <p className="card-text">Price: {mobileData.price}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cartfetch;
