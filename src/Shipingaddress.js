import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipingaddress() {
  const navigate = useNavigate();
  const [cityname, setCityName] = useState("");
  const [postalCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const testpostalcode =/^[0-9_-]{8,12}$/ 
  const testphone=/^[0-9]{11}$/
  const checkvalid = (testphone.test(phoneNumber)&&testpostalcode.test(postalCode)&&address&&cityname)? true : false
  const { token } = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : "";
    console.log(checkvalid)
localStorage.setItem("cityname", cityname)
localStorage.setItem("postalcode", postalCode)
localStorage.setItem("address", address)
localStorage.setItem("phoneNumber", phoneNumber)

  return <div className="shipingaddresscontent">
    <form>
      <fieldset>
        <legend>information</legend>
        <input
          type="text"
          placeholder="  City"
          onChange={(e) => setCityName(e.target.value)}
          required
        ></input>
        <input
        className={testpostalcode.test(postalCode)?"inputvalid" :"inputisinvalid"}
          type="text"
          placeholder="  postlCode"
          onChange={(e) => setPostCode(e.target.value)}
          required
        ></input>
        <input
        className={testphone.test(phoneNumber)?"inputvalid" :"inputisinvalid"}
          type="text"
          placeholder="  phone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        ></input>
        <textarea
          placeholder=" address"
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
        <button type="button"
        disabled={!(testphone.test(phoneNumber)&&testpostalcode.test(postalCode)&&address&&cityname)}
        style={{backgroundColor:!checkvalid ? "gray":""}}
          onClick={(e) => {
            if (token) {
              navigate(`/orderbys`);
            } else {
              navigate(`/signin`);
            }
          }}
        >Next
        
        </button>
        
      </fieldset>
    </form>
    {/* <Ordersbys cityname={cityname} addressname={address} phoneNumber={phoneNumber} postCode={postCode} /> */}
    </div>
}

export default Shipingaddress;
