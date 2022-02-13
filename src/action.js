import axios from "axios";
import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  GET_ONEDATA_REQUEST,
  GET_ONEDATA_FAILED,
  GET_ONEDATA_SUCCESS,
  POST_LOGIN_DATA_SUCCESS,
  POST_LOGIN_DATA_REQUEST,
  POST_LOGIN_DATA_FAILED,
  POST_SIGNUP_FAILED,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_REQUEST,
  GET_PROFILEDITAILS_REQUEST,
  GET_PROFILEDITAILS_SUCCESS,
  GET_PROFILEDITAILS_FAILED,
  POST_ORDERS_REQUEST,
  POST_ORDERS_SUCCESS,
  POST_ORDERS_FAILED,
} from "./Constanc";

export const getAlldata = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DATA_REQUEST });
    const { data } = await axios.get("http://45.138.24.15:9000/api/products");
    console.log(data);
    dispatch({ type: GET_DATA_SUCCESS, payload: data });
  } catch (e) {
    console.log("somthing wrong");
    dispatch({ type: GET_DATA_FAILED });
  }
};

export const getOnePrudoct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ONEDATA_REQUEST });
    const { data } = await axios.get(
      `http://45.138.24.15:9000/api/products/${id}`
    );
    dispatch({ type: GET_ONEDATA_SUCCESS, payload: data });
    console.log(data);
    localStorage.setItem("oneprudoct", JSON.stringify(data));
  } catch (e) {
    console.log("somthing wrong");
    dispatch({ type: GET_ONEDATA_FAILED });
  }
};

export const getLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: POST_LOGIN_DATA_REQUEST });
    await axios
      .post("http://45.138.24.15:9000/api/users/login", { email, password })
      .then((res) => {
        {
          !email
            ? dispatch({ type: POST_LOGIN_DATA_SUCCESS, payload: [] })
            : dispatch({ type: POST_LOGIN_DATA_SUCCESS, payload: res.data });
        }
        localStorage.setItem("data", JSON.stringify(res.data));
      });
  } catch (e) {
    console.log(e);
    dispatch({ type: POST_LOGIN_DATA_FAILED });
  }
};

export const getSignUpAction = (name, email, password) => async (dispatch) => {
  // console.log(username,password,email)
  try {
    dispatch({ type: POST_SIGNUP_REQUEST });
    await axios
      .post("http://45.138.24.15:9000/api/users", { name, email, password })
      .then((res) => {
        dispatch({ type: POST_SIGNUP_SUCCESS, payload: res.data });
        localStorage.setItem("data", JSON.stringify(res.data));
        // console.log(res.data)
      });
  } catch (e) {
    console.log(e);
    dispatch({ type: POST_SIGNUP_FAILED });
  }
};

export const getProfileDitails = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILEDITAILS_REQUEST });
    const { data } = await axios.get(
      `http://45.138.24.15:9000/api/users/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_PROFILEDITAILS_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: GET_PROFILEDITAILS_FAILED });
  }
};
// ==================================================================
export const addToBasket = (onePrudoct, q) => (dispatch, getState) => {
  var { cart } = getState().basketdata;

  var exist = cart.find((x) => x._id === onePrudoct._id);
  const itemfind = cart.find((x) => x._id === onePrudoct._id) ? true : false;
  if (itemfind) {
    exist.countInStock = exist.countInStock + q;
    exist.qty = exist.qty + 1;
    cart.map((x) => {
      return x._id === onePrudoct._id ? { ...exist } : x;
    });
  } else {
    cart = [...cart, { ...onePrudoct, qty: 0 }];
  }
  dispatch({ type: "add", payload: [...cart] });
  localStorage.setItem("cart", JSON.stringify(cart))
};
// ====================================================================

export const removeAsBasket = (onePrudoct, q) => (dispatch, getState) => {
  var { cart } = getState().basketdata;
  const exist = cart.find((x) => x._id === onePrudoct?._id);
  exist.countInStock = exist.countInStock + q;
  exist.qty = exist.qty - 1;
  if (exist.qty == 0) {
    console.log(cart);
    cart.splice(exist, 1);
  } else {
    cart.map((x) => {
      return x._id === onePrudoct._id ? { ...exist } : x;
    });
  }
  dispatch({ type: "remove", payload: [...cart] });
  localStorage.setItem("cart", JSON.stringify(cart))

};

// ======================================increaseBasket
export const increaseBasket = (cunter, x) => (dispatch, getState) => {
  dispatch({ type: "increaseBasket", payload: cunter + x });
};
// ========================================================

export const removeAsCart = (item, index) => (dispatch, getState) => {
  const { cart } = getState().basketdata;
  console.log(cart);
  cart.splice(index, 1);
  dispatch({ type: "removeasbasket", payload: [...cart] });
};
// ===========================

export const setPriceAction = (x) => (dispatch, getState) => {
  const totalprice = getState().price;
  console.log(totalprice);
  dispatch({ type: "totalprice", payload: totalprice + x });
};
// =================================================

export const orderbysAction = (address,city,postalCode,phone) => async (dispatch, getState) => {
  const { token } = getState().logindata.Logindata;
  const newtoken =getState().signupdata.signupdata;
  const y = token ? token : newtoken
  console.log(y)
  console.log(newtoken.token)
  const { cart } = getState().basketdata;
  console.log(token)
  const totalPrice =getState().price
  const itemPrice = getState().price
  const shippingPrice = 0.00;
  const paymentMethod= "Buyer";
  console.log(token,totalPrice,itemPrice,shippingPrice,paymentMethod)
  let x = cart.map((item, index)=>{
return {product:item._id,name:item.name,image:item.image,price:item.price,countInStock:item.countInStock,qty:item.qty}
  })
  try {
    dispatch({ type: POST_ORDERS_REQUEST });
    await axios
      .post(
        "http://45.138.24.15:9000/api/orders", {
          "orderItems":x,
          "shippingAddress": {address,city,postalCode, phone
          },paymentMethod,itemPrice,shippingPrice,totalPrice
      }
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${y}`,
          },
        }
      )
      .then((res) =>dispatch({ type:POST_ORDERS_SUCCESS,payload:res}));
  } catch (e) {
    console.log(e);
    dispatch({ type: POST_ORDERS_FAILED });
  }
};









// =========================================================choiceInBasket

// export const AddInBasket = (id)=> async (dispatch) => {
//   try{
//     dispatch({ type:GET_CHOICE_PRUDOCT_REQUEST})

//     const {data} = await axios.get(`http://45.138.24.15:9000/api/products/${id}`)
//     dispatch({ type:GET_CHOICE_PRUDOCT_SUCCESS, payload:data})

//   }catch(e){
//     console.log("somthing wrong")
//     dispatch({ type:GET_CHOICE_PRUDOCT_FAILED})

//   }
// }

// // ===========================================remove at basket
// export const removeBasket =(id,basketdata)=> async (dispatch,getState) => {
//   const {data} = getState().chiocedata

// const selectdata = data.slice(basketdata[id],1)

//     dispatch({ type:REMOVE_BASKET_PRUDOCT,payload:selectdata})

// }
// ========================================================
