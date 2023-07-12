
import './index.css'


import {withRouter} from 'react-router-dom'

import {useState} from 'react'

const paymentMethodArr = [
    {
        imgUrl:"CashafterPayment",
        mode:"Cash After Service"
    },
    {
        imgUrl:"UPi",
        mode: "Pay Using UPI"
    },{
        imgUrl:"Paytm",
        mode: "Pay Using Payment"
    },
    {
        imgUrl:"Creditdebitcards",
        mode:"Credit/Debit Cards"
    }
]

const SelectPayment = (props) =>{


    const {updateProgress,progress}=props
 
    const [buttonSelected,setUpbutton]=useState("")

    const setUpSuccessfull = () =>{
        if(buttonSelected !== ""){
            updateProgress("PaymentDone")
        }else{
            alert("Please select Cash after service")
        } 
    }

   

    const selectButton = () =>{
        setUpbutton("Cash After Service")
    }

    return(
    <div className='payment-mode-fashion'>
        <h1 className='fashion-paymentmode-head'>Payment Mode</h1>
        <div className='fashion-buttons'>
            {paymentMethodArr.map(each=>(
            <button onClick={selectButton} className={each.mode !== "Cash After Service" ? "fashion-payment-modebutton2" :buttonSelected==="" ?"fashion-payment-modebutton1" : "fashion-payment-modebutton3" } type="button"><img className='paymentmode-image' src={`/${each.imgUrl}.png`} alt={each.mode}/><p>{each.mode}</p><img className={each.mode !== "Cash After Service" ? "yes-disable" : buttonSelected=== "" ? "yes-disable" : "yes-enable"  } src={`/yes.png`} alt ={each.yes}/></button>
            ))
            }
        </div>
          <button onClick={setUpSuccessfull} className={progress === "Cart"?"fashion-proceed-button-disable":'fashion-proceed-to-schedule'} type="button">Proceed</button>
  </div>)
}

export default withRouter(SelectPayment)