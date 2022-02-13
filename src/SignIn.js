import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAction } from "./action";
function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testemail = /^[a-zA-Z][\w\W]{5,30}$/;
  const testpassword =/^[A-Z][\w\W]{8,30}$/
  const { looding, errore, Logindata } = useSelector(
    (state) => state.logindata
  );
  console.log(errore)
  useEffect(() => {
    if (!Logindata.token) {
      navigate(`/signin`);
    } else {
      navigate(`/`);
    }
  }, [Logindata.token]);

  return (
    <div className="signin">
      <div className="mainsignin">
              {errore ? <p className="passnottru">password or email is not true</p>:""}
        <input
        className={testemail.test(username)?"inputvalid" :"inputisinvalid"}
          type="email"
          placeholder="  sample@gmail.com"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
        className={testpassword.test(password)? "inputvalid" :"inputisinvalid"}
          type="password"
          placeholder="  password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button
        className="loginbtn"
          onClick={() => {
                  dispatch(getLoginAction(username, password));
                }}
        >
          LOG IN
        </button>
         <Link to="/signUp" className="intothesignin">Sin up</Link>
      </div>
    </div>
  );
}

export default SignIn;
