import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "./store";
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import OnePrudoct from "./OnePrudoct"
import Profile from "./Profile"
import BasketsOfChoice from "./BasketsOfChoice"
import ChangePassword from "./ChangePassword"
import Shipingaddress from "./Shipingaddress"
import Ordersbys from "./Ordersbys"
import Orders from "./Orders"
import SingleOrders from "./SingleOrders"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>  
        <Route path="/" element={<Home />}></Route>
        <Route path="/prudoct/:id" element={<OnePrudoct />}></Route>
        <Route path="/basketsOfChoice" element={<BasketsOfChoice />}></Route>
        <Route path="/shipingaddress" element={<Shipingaddress />}></Route>
        <Route path="/orderbys"element={<Ordersbys />} ></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/orders/singleorders/:id" element={<SingleOrders/>}></Route>
        <Route path="/profile" element={<Profile />}>
        <Route path="/profile/changepassword" element={<ChangePassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
