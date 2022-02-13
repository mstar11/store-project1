import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";

function Orders() {

        const [data, setData] = useState([])
        const {Logindata} = useSelector(state => state.logindata)
        const [looding,setLooding]=useState(false)


useEffect(() => {
        const getmyorders = async()=>
           {
                   setLooding(true)
                   try{
                        const {data} = await axios.get("http://45.138.24.15:9000/api/orders/myorders",{
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Bearer ${Logindata.token}`,
                                },
                              })
                              setData(data)
                              setLooding(false)
                              console.log(data)

        
                   }catch (e) {
                           console.log("somthing wrong")
                   }
           }
           getmyorders()

},[])


  return <div className="orders">
          {looding?<div className="loodercontent">
                <div className="looder">
          <span></span>
          <span></span>
          <span></span>          
          </div>
          </div>:
          <div className="orders">
          {data.map((item, index)=>{
                  return <div className="ordersItems" key={index}>
                          <div>
                                  <p>{item.updatedAt}</p>
                                  <p>{`city:`}{item.shippingAddress.city}{`  address: `}{item.shippingAddress.address}{`   phone:`}{item.shippingAddress.phone}{` postalCode: `}{item.shippingAddress.postalCode}</p>
                          </div>
                          <hr />
                          <div>
                                  {item.orderItems?.map((item, index)=>{
                                          
                                          return <div key={index}>
                                                   <img className="ordersItemsimg" src={`http://localhost:3000/${item.image}`} ></img>
                                                   <p>{item.name}</p>
                                                   <p>$ {item.price}</p>
                                                   <p>quantity : {item.qty}</p>
     
     
                                          </div>
                                  })}
     
                          </div>
                          <hr />
                          <div className="seeSingleInformation">
                                  <p>Total price:$ {item.totalPrice.toFixed()}</p>
                                    <Link to={`singleorders/${item._id}`} className="seeSingleInformationbtn">See Information</Link>
                          </div>
     
                  </div>
          })}
         </div>
          }
  </div>
}
export default Orders;
