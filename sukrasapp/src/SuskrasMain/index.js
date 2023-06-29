
import Phonenumber from '../Phonenumber'
import Verification  from '../Verification'
import './index.css'



import { useState } from 'react'

const Sukras = () =>{

    const [phone,setPhone]=useState("")
    const [otp,setOTP]=useState(0)

    const phonenumber = (value) =>{
         setPhone(value)
    }

    const getOTP = (OTP) =>{
        setOTP(OTP)
        console.log(OTP)
    }

   
    return(
        <div className="sukras-main">
            <div className='header'>
                <img className='sukras-logo' src="./sukraslogo.png" alt="Logo Space"/>
            </div>
            <div className='website-body'>
                 <form className='form'>
                    <img className='sukras-logo2' src='./logo2.png' alt="Logo Space2"/>
                    <p className='welcome-name'>Welcome to Sukra's</p>
                    <p className='verify-number'>Get Verified by your Mobile Number</p>
                    {otp === 0?<p className='enter-number'>Enter your mobile number to get started.</p>:<p className='enter-number'>Enter the OTP sent on *********{phone.slice((phone.length-2),(phone.length))}</p>}
                    {otp === 0?<Phonenumber phone={phone} phonenumber={phonenumber} getOTP={getOTP}/>:<Verification/>}
                 </form>
            </div>
        </div>
    )
}

export default Sukras