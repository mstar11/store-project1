import React,{ useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderbysAction } from "./action";
import {useNavigate} from "react-router-dom"

function Ordersbys() {
  const dispatch = useDispatch();
  const navigate =useNavigate();
const [check,setCheck]= useState(false);
  const city = localStorage.getItem("cityname");
  const postalCode = localStorage.getItem("postalcode");
  const address = localStorage.getItem("address");
  const phone = localStorage.getItem("phoneNumber");
  const alldata = useSelector(state=> state.orderbysReducer)
 const price = useSelector(state=> state.price)
console.log(check)
  console.log(price)
  useEffect(()=>{
    if(alldata.data.status === 201){
      console.log("hello")
      navigate(`/orders`)
      dispatch({type:"clearCart"})
      dispatch({type:"clearprice"})
      dispatch({type:"clearbasket"})
    }
    alldata.data ={} 
  },[alldata.data])

  return (
    <div className="ordersbuycontent">
      <div className="ordersbuy">
      <section>
        <p>City : {city}</p>
        <p>PostalCode : {postalCode}</p>
        <p>Address : {address}</p>
        <p>Phone : {phone}</p>
        <div className="totalcontent">
        <p>Total : {price?.toFixed()}</p>
        <label htmlFor="agree">I agree this details</label>
        <input type="checkbox" name="agree" className="agreedetails" onClick={(e) =>
        setCheck(!check)
        }></input>
      </div>

      </section>
      
      </div>
   
      <button
      style={{backgroundColor:!check?"gray" :""}}
        onClick={() => {
          if(check){
            dispatch(orderbysAction(address,city,postalCode, phone))
          }
        }}
      >
        Pay
      </button>
    </div>
  );
}
export default Ordersbys;
