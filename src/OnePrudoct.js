import React, { useEffect, useState } from "react";
import {
  getOnePrudoct,
  addToBasket,
  removeAsBasket,
  increaseBasket,
  setPriceAction,
} from "./action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function OnePrudoct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {looding, onePrudoct } = useSelector((state) => state.onePrudoct);
  const cunter = useSelector(state => state.cunter)
 const price = useSelector(state=> state.price)
 console.log(looding)

  console.log(onePrudoct);
  const { cart } = useSelector((state) => state.basketdata);
  console.log(cart);

  useEffect(() => {
    dispatch(getOnePrudoct(id));
  }, []);
  const exist = cart.find((x) => x._id === onePrudoct._id);
  const itemfind = cart.find((x) => x._id === onePrudoct._id) ? true : false;
 
  return <>
  {looding?<main className="main">
  <div className="loodercontent">
          <div className="looder">
          <span></span>
          <span></span>
          <span></span>          
          </div>
          
          </div>
  </main>:
  <main className="main">
  {itemfind ? (
    <div className="oneProduct">
      <div className="onePrudoctInformation" >
      <img src={`http://localhost:3000/${exist.image}`} width={200}></img>
      <p className="onePrudoctI">{exist.name}</p>
      <span className="onePrudoctI">Rating : {onePrudoct.rating}</span>
      <p className="onePrudoctI">{onePrudoct["price"]} </p>
      <p className="onePrudoctDescription">{exist.description}</p>
      </div>
      
    <div className="oneproductbtn" >
    <button className="plusbtn"
        disabled={exist.countInStock == 0}
        style={{backgroundColor:exist.countInStock == 0 && "gray"}}

        onClick={() => {
          dispatch(addToBasket(onePrudoct, -1));
          dispatch(setPriceAction(exist.price));
           dispatch(increaseBasket(cunter, 1));
        }}
      >
        +
      </button>
      <button className="minesbtn"
        disabled={exist.countInStock == onePrudoct.countInStock}
        style={{backgroundColor:exist.countInStock == onePrudoct.countInStock?"gray":""}}
        onClick={() => {
          dispatch(removeAsBasket(onePrudoct, 1));
           dispatch(increaseBasket(cunter, -1));
          dispatch(setPriceAction(-(exist.price)));
        }}
      >
        -
      </button>
      <div className="countInStock">{exist.countInStock}</div>
    </div>
    </div>
  ) : (
    <div className="oneProduct">
      <div className="onePrudoctInformation">
        <img
          src={`http://localhost:3000/${onePrudoct.image}`}
          width={200}
        ></img>
        <p className="onePrudoctI" >{onePrudoct["name"]}</p>
      <span className="onePrudoctI">Rating : {onePrudoct.rating}</span>
        <p className="onePrudoctI">{onePrudoct["price"]}</p>
        <p className="onePrudoctDescription">{onePrudoct["description"]}</p>
      </div>
      <div className="oneproductbtn">
      <button className="addtobasket"
        disabled={onePrudoct.countInStock == 0}
        onClick={() => {
          dispatch(addToBasket(onePrudoct, -1));
        }}
      >
        Add to basket
      </button>
      <div className="countInStock">{onePrudoct.countInStock}</div>
      </div>
    </div>
  )}

  <div className="totalpricecontent">
    <div className="totalprice">
    <p>Single price: {itemfind?(exist.price * exist.qty).toFixed():"0"}</p>
    <p>Shiping price: 00.0</p>
    <p>Total price:$ {price.toFixed()}</p>
    </div>
  </div>
</main>
  }
  </>
}

export default OnePrudoct;











// dispatch(increaseBasket(cunter, -1));
// dispatch(AddInBasket(id));
// dispatch(increaseBasket(cunter, +1));
// dispatch(changeCountInStock(id, -1));
// dispatch(changeCountInStock(id, 1));
// dispatch(removeBasket(id, basketdata));
// setBasketdata((prev) => {
//   const temp = { ...prev };
//   console.log(temp[`${id}`]);
//   temp[`${id}`].pop();
//   return temp;
// });

// const [x,setX]= useState(false)
//   useEffect(() => {
//     if (data.length) {
//       setX(basketdata.find((item, index) => item._id == id) ? true : false)
//       const d = JSON.parse(localStorage.getItem("oneprudoct"));
//       if (x) {
//         console.log("put x")
//       } else{
//         dispatch(getOnePrudoct(id));
//       }
//     } else if (data.length == 0) {
//       dispatch(getOnePrudoct(id));
//     }
//   }, [id]);
