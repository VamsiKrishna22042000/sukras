
import './index.css'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import { useState } from 'react'

const Verification = (props) =>{

     const [obtainedOTP,setOTP] = useState({index:0, OTP:""})
     

     const obtainOtp = (event) =>{

        if((event.target.value)===""){
            const myotp = document.querySelectorAll(".otp-input")
            const {index,OTP}= obtainedOTP
            console.log(OTP)
            if(index===1){
                  setOTP(prevOTP=>({index:(prevOTP.index - 1),OTP:prevOTP.OTP.slice(0,OTP.length-1)}))
                  myotp[index-1].focus()
            }else{
                setOTP(prevOTP=>({index:(prevOTP.index - 1),OTP:prevOTP.OTP.slice(0,OTP.length-1)}))
                myotp[index-2].focus()
            }
            
        }else{
                    const myotp = document.querySelectorAll(".otp-input")
                    const numArray = ["1","2","3","4","5","6","7","8","9","0"]
                    const {index,OTP}= obtainedOTP
                    console.log(OTP)
                    if(numArray.includes(myotp[index].value) && index <= (myotp.length-2)){
                        setOTP(prevOTP=>({index:(prevOTP.index+1), OTP:prevOTP.OTP + event.target.value}))
                        myotp[index+1].focus()
                    }else if(numArray.includes(myotp[index].value) && index <= (myotp.length-1)){
                        setOTP(prevOTP=>({index:(prevOTP.index+1), OTP:prevOTP.OTP + event.target.value}))
                        myotp[index].focus()
                    }else{
                            myotp[index].focus()
                            myotp[index].value=""
                    }
        }
        
     }

     const verifyOTP = () => {
        const {OTP} = obtainedOTP
        const {history} = props
        history.replace("/select-category")
     }
    
    
    const changeFocus = (event) =>{
        event.target.classList.add("otp-input2")
   }

    const changeBlur = (event) =>{
        event.target.classList.remove("otp-input2")
    }

    return (
        <>   
            <div className='otp-box'>
                <input className='otp-input'  autoFocus type="tel"  maxLength={1} onFocus={changeFocus} onBlur={changeBlur} onChange={obtainOtp}/>
                <input className='otp-input'  type="tel"  maxLength={1} onFocus={changeFocus} onBlur={changeBlur} onChange={obtainOtp} />
                <input className='otp-input'  type="tel"  maxLength={1} onFocus={changeFocus} onBlur={changeBlur} onChange={obtainOtp} />
                <input className='otp-input'  type="tel"  maxLength={1} onFocus={changeFocus} onBlur={changeBlur} onChange={obtainOtp} />
            </div>
            <p className='resend-otp'>Did'nt get the OTP? <span className='resend-otp-span'>Resend OTP</span></p>
            <button type="button" onClick={verifyOTP} className={ obtainedOTP.index <= 3 ? "verify":"otp-verify-2"}>Verify</button>
        </> 
    )
}

export default withRouter(Verification)