import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAsCart, increaseBasket,setPriceAction } from "./action";
function BasketsOfChoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cunter = useSelector((state) => state.cunter);
  const price = useSelector((state) => state.price);
  const { cart } = useSelector((state) => state.basketdata);
  const { token } = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : "";
  return (
    <>
      <div className="basketproduct">
      <div className="basketproductmain">
        <div className="basketproductitems">
        {cart.length ? (
          cart.map((item, index) => {
            return (
              <div key={index} className="basketproductitem">
                <img
                  src={`http://localhost:3000/${item.image}`}
                  width={200}
                ></img>
                <p className="onePrudoctI">{item.name}</p>
                <p className="onePrudoctI">$ {item.price}</p>
                <span className="totalsingleprice">Total this items price :$ {(item.price * item.qty).toFixed()}</span>
                <p className="onePrudoctI quntity">quantity: {item.qty}</p>

                <button
                className="btnremove"
                  onClick={() => {
                    dispatch(removeAsCart(item, index));
                    dispatch(increaseBasket(cunter, -item.qty));
                    dispatch(setPriceAction(-(item.qty * item.price)))
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p>Nothing choice</p>
        )}
        </div>
     <div className="totalpricecontent">
     <div className="totalprice basketchoice">
           <p>Shiping price: 00.0</p>
           <p >Total price:   $ {price.toFixed()}</p>
         </div>
      </div>
     </div>
         
     <div className="nextcontent">
     <button
         className="btnnext"
         style={{backgroundColor:cart.length == 0 ? "gray":""}}
          disabled={cart.length == 0}
          onClick={() => {
            if (token) {
              navigate(`/shipingaddress`);
            } else {
              navigate(`/signin`);
            }
          }}
        >
          Next{" "}
        </button>
     </div>
      </div>
    </>
  );
}

export default BasketsOfChoice;
