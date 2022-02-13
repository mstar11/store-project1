import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {getAllPrudoct,getOnePrudoct,getLoginReducer,getSignUpReducer,getProfileDitailsReducer,addToBasketReducer,cunterReducer,totalPriceReducer,orderbysReducer} from "./reducer";
const reducers =combineReducers({
        allPrudoct :getAllPrudoct,
        onePrudoct:getOnePrudoct,
        logindata:getLoginReducer,
        signupdata:getSignUpReducer,
        profileditails:getProfileDitailsReducer,
        basketdata:addToBasketReducer,
        cunter:cunterReducer,
        price:totalPriceReducer,
        orderbysReducer:orderbysReducer,
})
const data =JSON.parse(localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")) : {}
const onePrudoct =JSON.parse(localStorage.getItem("oneprudoct"))?JSON.parse(localStorage.getItem("oneprudoct")):{}
const cart = JSON.parse(localStorage.getItem("cart")) ?JSON.parse(localStorage.getItem("cart")):[];
const cunter= JSON.parse(localStorage.getItem("cunter"))?JSON.parse(localStorage.getItem("cunter")) :0;
const totalprice =JSON.parse(localStorage.getItem("totalprice"))?JSON.parse(localStorage.getItem("totalprice")) :0;

const initialState ={
        logindata:{Logindata:data},
        onePrudoct:{onePrudoct:onePrudoct},
        basketdata:{cart:cart},
        cunter:cunter,
        price:totalprice,
        
  
}

const middleware=[thunk]
const store=createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
)
export default store