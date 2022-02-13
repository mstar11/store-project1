import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { POST_LOGIN_DATA_SUCCESS, POST_SIGNUP_SUCCESS } from "./Constanc";
import "./App.css";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { looding, errore, Logindata } = useSelector(
    (state) => state.logindata
  );
  const cunter = useSelector((state) => state.cunter);
  const { signupdata } = useSelector((state) => state.signupdata);

  return (
    <header className="header">
      <div className="topheaderslinks" >
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/" className="link">
          Prudocts
        </Link>
        <Link to="/" className="link">
        Profile
        </Link>
        <Link to="/" className="link">
        Contact Us
        </Link>
      </div>
      <div className="loginheaders">
        <Link to="/basketsOfChoice" className="link basket">
          {cunter ? <span>{cunter}</span> : ""}
          <i
            className="fas fa-shopping-cart logo"
            onClick={() => {
              navigate(`/`);
            }}
          ></i>
        </Link>
        {Logindata.token || signupdata.token ? (
          <ul className="lists">
            <li>
              <i className="far fa-user"></i>
              <ul>
                <li>
                  <Link to="/Profile" className="headerslinks">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="headerslinks">
                    orders
                  </Link>
                </li>
                <li className="logout">
                  <button
                    onClick={() => {
                      navigate(`/`);
                      dispatch({ type: POST_LOGIN_DATA_SUCCESS, payload: [] });
                      dispatch({ type: POST_SIGNUP_SUCCESS, payload: [] });
                      localStorage.clear();
                    }}
                    className="headerslinks btn"
                  >
                    log out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <div className="headerslogin">
            <Link to="/signin" className="l1">
              SIGN IN
            </Link>
            <Link to="/signup" className="l1">
              SIGN UP
            </Link>
          </div>
        )}
        {(Logindata.token || signupdata.token) && (
          <p>{Logindata.email || signupdata.email}</p>
        )}
      </div>
    </header>
  );
}

export default Header;
