import React, { useEffect,useState }from 'react'
import { useDispatch,useSelector} from "react-redux"
import {getProfileDitails} from "./action";
import {Link,Outlet} from "react-router-dom";

function Profile() {
        const dispatch =useDispatch();
        const logindata = useSelector(state => state.logindata)
        const {looding,profiledata}=useSelector(state => state.profileditails)
        console.log(looding)
        useEffect(() => {
                dispatch(getProfileDitails(logindata.Logindata.token))
        },[])
        return  <>
        {looding?<div className="profile looding">
        <div className="loodercontent">
          <div className="looder">
          <span></span>
          <span></span>
          <span></span>          
          </div>
          
          </div>
                
        </div>:<div className="profile">
                <p>Name : {profiledata.name}</p>
                <p>Email :{profiledata.email}</p>
                <div>
                        <Link to="changepassword" className="changepassword">Change password</Link>
                </div>
                        <Outlet />
                </div>
        }
        </>
}

export default Profile
