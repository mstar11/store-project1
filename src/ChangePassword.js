import React, { useEffect, useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [checkpass, setcheckpass] = useState(false);
  const [testpass, setTestpass] = useState(false);
  const testusername = /^[a-zA-Z][a-zA-Z0-9._]{4,23}$/;
  const testemail = /^[a-zA-Z][\w\W]{5,30}$/;
  const testpassword = /^[A-Z][\w\W]{8,30}$/;

  const { token } = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : "";
  const putdata = async () => {
    await axios.put(
      `http://45.138.24.15:9000/api/users/profile`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  useEffect(() => {
    //  testpass = repeatpassword == password ? true : false
    setTestpass(repeatpassword == password ? true : false);
  }, [repeatpassword]);
  return (
    <div className="mainchangepass">
      <form className="changepass">
        {checkpass ? <p className="passnottru">password not equiled</p> : ""}

        <input
          className={testusername.test(name) ? "inputvalid" : "inputisinvalid"}
          type="text"
          placeholder="  name"
          required
          minLength={5}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className={testemail.test(email) ? "inputvalid" : "inputisinvalid"}
          type="email"
          placeholder="  sample@gmail.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className={
            testpassword.test(password) ? "inputvalid" : "inputisinvalid"
          }
          type="password"
          placeholder="  new password"
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className={
            testpassword.test(repeatpassword) ? "inputvalid" : "inputisinvalid"
          }
          type="password"
          placeholder="  repeat password"
          required
          minLength={8}
          onChange={(e) => setRepeatPassword(e.target.value)}
        ></input>
        <button
        style={{backgroundColor:testpass?"gray":""}}
          type="button"
          disabled={
            !(
              testpassword.test(password) &&
              testemail.test(email) &&
              testemail.test(name)
            )
          }
          onClick={() => {
            if (testpass) {
              putdata();
              setcheckpass(false);
            } else {
              setcheckpass(true);
            }
          }}
        >
          Change
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
