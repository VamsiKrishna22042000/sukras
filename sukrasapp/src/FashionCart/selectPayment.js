
import './index.css'


import {withRouter} from 'react-router-dom'

import {useState} from 'react'

import Cookies from 'js-cookie'

const paymentMethodArr = [
    {
        imgUrl:"CashafterPayment",
        mode:"Cash On Delivery"
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


    const {updateProgress,progress,cartItems}=props
 
    const [buttonSelected,setUpbutton]=useState("")

    const setUpSuccessfull = () =>{
        if(buttonSelected !== ""){
            cartItems.map(async (each) =>{
                const details = {
                    userId : Cookies.get("jwt_user"), 
                    productId : each.productId, 
                    cartId :each._id,
                    count : each.count
                }
                const url = "https://sukras.onrender.com/api/product/bookProduct"
                const options ={
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(details)
                }
                const response = await fetch(url,options)
                if(response.ok){
                    updateProgress("PaymentDone")
                }
                
            })
        }else{
            alert("Please select Cash On Delivery")
        } 
    }

   

    const selectButton = () =>{
        setUpbutton("Cash On Delivery")
    }
    

    return(
    <div className='payment-mode-fashion'>
        <h1 className='fashion-paymentmode-head'>Payment Mode</h1>
        <div className='fashion-buttons'>
            {paymentMethodArr.map(each=>(
            <button onClick={selectButton} className={each.mode !== "Cash On Delivery" ? "fashion-payment-modebutton2" :buttonSelected==="" ?"fashion-payment-modebutton1" : "fashion-payment-modebutton3" } type="button"><img className='paymentmode-image' src={`/${each.imgUrl}.png`} alt={each.mode}/><p>{each.mode}</p><img className={each.mode !== "Cash On Delivery" ? "yes-disable" : buttonSelected=== "" ? "yes-disable" : "yes-enable"  } src={`/yes.png`} alt ={each.yes}/></button>
            ))
            }
        </div>
          <button onClick={setUpSuccessfull} className={progress === "Cart"?"fashion-proceed-button-disable":'fashion-proceed-to-schedule'} type="button">Proceed</button>
  </div>)
}

export default withRouter(SelectPayment)