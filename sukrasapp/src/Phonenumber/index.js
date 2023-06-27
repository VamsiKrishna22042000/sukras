
import './index.css'


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'




const Phonenumber  = (props) =>{
    const{phone,phonenumber,getOTP}=props
    
    const sendNumber = (value) =>{
         phonenumber(value)
    }
 
    const sendOTP = () =>{
        const errorMsg = document.getElementById("error-message");
        if(phone.length >= 12){
            console.log("no-error")
            errorMsg.classList.add("error-disable")
            getOTP(1)
        }else{
           console.log("error")
           errorMsg.classList.remove("error-disable")
        }
    }
   
    
    return(
        <>
            <PhoneInput placeholder = "Mobile number" className="phone-input" country={'in'} value={phone} onChange={sendNumber}/>
            <p id="error-message" className='error-number error-disable'>*Enter a valid numbers</p>
            <button className={phone.length<=3?"otp":"otp-2"} type="button" onClick={sendOTP}>Get OTP</button>
        </>
    )
}
export default Phonenumber