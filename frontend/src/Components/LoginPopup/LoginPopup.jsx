import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

export default function LoginPopup({setShowLogin}) {
    const {url,setToken} = useContext(StoreContext)

    const[currState,setCurrState] = useState("Login")
    
    
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))

    }
    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login/register: ", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Error data:", error.response.data);
                alert(error.response.data.message || "An error occurred. Please try again.");
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                alert("No response from server. Please check your connection and try again.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up request:", error.message);
                alert("An error occurred. Please try again.");
            }
        }
    };
    // useEffect(()=>{
 
    //     console.log(data);
    // },[data])
 
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className='close-icon'
        />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />

            </div>
            <button type='submit'>{currState === "Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By Continuing, I agree to the terms of use & privacy policies.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
            }
        </form>
      
    </div>
  )
}
