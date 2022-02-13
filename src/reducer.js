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
export const getAllPrudoct = (
  state = { looding: false, errore: false, data: [] },
  action
) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, looding: true };
    case GET_DATA_SUCCESS:
      return { looding: false, data: action.payload };
    case GET_DATA_FAILED:
      return { ...state, errore: true };
    default:
      return state;
  }
};

export const getOnePrudoct = (
  state = { looding: false, errore: false, onePrudoct: {} },
  action
) => {
  switch (action.type) {
    case GET_ONEDATA_REQUEST:
      return { ...state, looding: true };
    case GET_ONEDATA_SUCCESS:
      return { looding: false, onePrudoct: action.payload };
    case GET_ONEDATA_FAILED:
      return { ...state, errore: true };
    default:
      return state;
  }
};

export const getLoginReducer = (
  state = { looding: false, errore: false, Logindata: {} },
  action
) => {
  switch (action.type) {
    case POST_LOGIN_DATA_REQUEST:
      return { ...state, looding: true };
    case POST_LOGIN_DATA_SUCCESS:
      // console.log(action.payload)
      return { looding: false, Logindata: action.payload };
    case POST_LOGIN_DATA_FAILED:
      return { ...state, errore: true };
    default:
      return state;
  }
};
export const getSignUpReducer = (
  state = { looding: false, errore: false, signupdata: {} },
  action
) => {
  switch (action.type) {
    case POST_SIGNUP_REQUEST:
      return { ...state, looding: true };
    case POST_SIGNUP_SUCCESS:
      return { looding: false, signupdata: action.payload };
    case POST_SIGNUP_FAILED:
      return { ...state, errore: true };
    default:
      return state;
  }
};

// =============================getprofile ditails
export const getProfileDitailsReducer = (
  state = { looding: false, error: false, profiledata: {} },
  action
) => {
  switch (action.type) {
    case GET_PROFILEDITAILS_REQUEST:
      return { ...state, looding: true };
    case GET_PROFILEDITAILS_SUCCESS:
      return { looding: false, profiledata: action.payload };
    case GET_PROFILEDITAILS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};

export const addToBasketReducer = (state = { cart: []}, action) => {
  switch (action.type) {
    case "add":
      console.log(action.payload.countInStock)
      return {cart:action.payload}
    case "remove":
      return {cart:action.payload}
      case "removeasbasket":
        return {cart:action.payload}
      case "clearCart"  :
        return{cart:[]}
    default:
      return state;
  }
};
// ======================================


// =============================cunter reducer
export const cunterReducer = (state=0,action)=>{
  switch (action.type) {
    case "increaseBasket":
      localStorage.setItem("cunter", JSON.stringify(action.payload))
      return state=action.payload
    case "clearbasket"  :
      return state=0 
    default:
      return state
  }
}

// ==========================================

export const totalPriceReducer =(state= 0,action)=>{
  switch (action.type) {
    case "totalprice":
      localStorage.setItem("totalprice", JSON.stringify(action.payload))
      return state=action.payload
     case "clearprice" :
      localStorage.setItem("totalprice", JSON.stringify(action.payload))
       return state = 0 ;
    default:
      return state;
  }
}
// ===============================================
export const orderbysReducer =(state={looding:false,error: false,data:{}},action)=>{
  switch (action.type) {
    case POST_ORDERS_REQUEST:
      return {...state,looding:true}
    case POST_ORDERS_SUCCESS:
      return {looding: false,data: action.payload}  
    case POST_ORDERS_FAILED:
      return {...state,errore:true}  
    default:
      return state;
  }
}













// export const removeAsBasketdataReducer = (state=[],action) => {
//   // const exist = basketdata.find((x) => x.id === onePrudoct.id);
//   // exist.countInStock =  exist.countInStock + q
//   // console.log(exist)
//   // if (exist.qty === 1) {
//   //   setBasketdata(basketdata.filter((x) => x.id !== onePrudoct.id));
//   // } else {
//   //   setBasketdata(
//   //     basketdata.map((x) =>{
//   //       return x.id === onePrudoct.id ? { ...exist, qty: exist.qty - 1 } : x
//   //     }

//   //     )
//   //   );
//   // }
//   switch (action.type) {
//     case "remove":
//       console.log(action.payload)
//       return state
//     default:
//     return state
//   }
// };

// ========================================



// export const choiceInBasket = (state={looding: false,errore:false,data:[]},action)=>{
//   switch (action.type) {
//     case GET_CHOICE_PRUDOCT_REQUEST:
//       return { ...state, looding: true };
//     case GET_CHOICE_PRUDOCT_SUCCESS:

//     return {looding: false,data:[...state.data,action.payload]}

//     case REMOVE_BASKET_PRUDOCT:

//      state.data?.splice(action.selectdata,1)

//      return {looding:false,data:state.data}
//       case GET_CHOICE_PRUDOCT_FAILED:
//       return {...state,errore: true}
//     default:
//       return state
//   }

// }
