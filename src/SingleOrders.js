import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function SingleOrders() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [looding,setLooding]= useState(false);
  const {Logindata } = useSelector(
    (state) => state.logindata
  );
  useEffect(() => {
    setLooding(true)
    const getSingleOrder = async () => {
      try {
        const { data } = await axios.get(
          `http://45.138.24.15:9000/api/orders/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Logindata.token}`,
            },
          }
        );
        setData(data);
    setLooding(false)

      } catch (e) {
        console.log("somthing wrong");
      }
    };
    getSingleOrder();
  }, []);

  return <div className="singleorder">
    {looding?<div className="loodercontent">
          <div className="looder">
          <span></span>
          <span></span>
          <span></span>          
          </div>
          
          </div>:
      <div>
    <div>
    <p>{data.updatedAt}</p>
      <p>
        {`city:`}
        {data.shippingAddress?.city}
        {`  address: `}
        {data.shippingAddress?.address}
        {`   phone:`}
        {data.shippingAddress?.phone}
        {` postalCode: `}
        {data.shippingAddress?.postalCode}
      </p>
    </div>
      <hr />
      <div>
        {data.orderItems?.map((item, index) => {
          return (
            <div key={index}>
              <img className="singleorderimg"
                style={{ display: "inline" }}
                src={`http://localhost:3000/${item.image}`}
                
              ></img>
              <p>{item.name}</p>
              <p>$ {item.price}</p>
              <p>quantity : {item.qty}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div>
        <p>Total price: {data.totalPrice?.toFixed()}</p>
      </div>
    </div>}
  </div>
}

export default SingleOrders;
