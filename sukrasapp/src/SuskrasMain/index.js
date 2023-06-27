
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
                <h1 className='website-name'>SUKRA'S</h1>
                <p className='tag-name'>SIGNATURE FOR STYLES</p>
            </div>
            <div className='website-body'>
                 <form className='form'>
                    <h1 className='website-form-name'>SUKRA'S</h1>
                    <p className='tag-form-name'>SIGNATURE FOR STYLES</p>
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