import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSignUpAction } from "./action";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [checkpass,setcheckpass] = useState(false);
  const [testpass,setTestpass]= useState(false);
  const { errore, signupdata } = useSelector((state) => state.signupdata);
  const testusername= /^[a-zA-Z][a-zA-Z0-9._]{4,23}$/ ;
  const testemail = /^[a-zA-Z][\w\W]{5,30}$/;
  const testpassword = /^[A-Z][\w\W]{8,30}$/



  useEffect(() => {
    //  testpass = repeatpassword == password ? true : false
     setTestpass(repeatpassword == password ? true : false)
  
},[repeatpassword])

  useEffect(() => {
    if (!signupdata.token) {
      navigate(`/signup`);
    } else {
      navigate(`/`);
    }
  }, [signupdata.token]);
  return (
    <div className="signup">
      <form className="mainsignup">
        <p className="passnottru">{errore && "Somthing wrong"}</p>
        {checkpass ? <p className="passnottru">password not equiled</p>:""}
        <input
        className={testusername.test(name) ? "inputvalid" :"inputisinvalid" }
          type="text"
          placeholder="  username"
          onChange={(e) => 
            setUserName(e.target.value)
          }
        ></input>
        <input
        className={testemail.test(email) ? "inputvalid" :"inputisinvalid" }

          type="email"
          placeholder="  sample@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
         className={testpassword.test(password) ? "inputvalid" :"inputisinvalid"}
          type="password"
          placeholder="  password"
          onChange={(e) => setPassword(e.target.value)}
        required
        ></input>
         <input
         className={testpassword.test(repeatpassword) ? "inputvalid" :"inputisinvalid"}
         type="password"
          placeholder="  repeat password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        required
        ></input>



        <Link to="/signin" className="intothesignin">already sign in</Link>
        <button type="button"
        disabled={!(testpassword.test(password) && testemail.test(name) && testemail.test(email))}
        className="loginbtn"
          onClick={(e) => {
            if(testpass){
              dispatch(getSignUpAction(name, email, password))
              setcheckpass(false)
            }else{
              setcheckpass(true)
            }
          }
          }
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUp;
