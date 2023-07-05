
import './index.css'
import Paymentprogress from './payment'
import Cookies from 'js-cookie'

import { TailSpin } from 'react-loader-spinner'

import CartItems  from '../CartItems'


import { useEffect, useState } from 'react'
import ScheduleTime from '../ScheduleTime'

const pageStage={
    loading:"LOADING",
    success:"SUCCESS"
}

const Cart = (props) =>{
    const [progress,setProgress] = useState("Cart")

    const[loading,setLoading] = useState(pageStage.loading)
    const [cartItemsArr, setCartItemsArr] = useState("")



    useEffect(()=>{
          getCartItems()
    },[])




    const gobackTo = () =>{
        const{match,history}=props
        const {params}=match
        if(params.zone==="beautyzone"){
           history.replace(`/${params.zone}`)
        }else if(params.details==="details"){
            history.replace(`/${params.zone}/${params.id}/${params.details}`)
        }
         else{
           history.replace(`/${params.zone}/${params.id}`)
        }
     }

    const getCartItems = async() =>{
        const id = Cookies.get("jwt_user") 
        const response = await fetch(`https://sukras.onrender.com/api/salon/getAllServicesFromCart/${id}`)
        const data = await response.json()
        if(response.ok === true){
            if(data.cart.length > 0 ){
               setCartItemsArr(data.cart)
            }else{
                setCartItemsArr("")
            }
            setLoading(pageStage.success)
            
        }
        
    }

    const updateProgress = (value) =>{
        setProgress(value)
    }

    return(
        loading === pageStage.loading ? <div className='loader-spinner'><TailSpin color={"#F4BD18"} height={70} width={70}/></div>:
        cartItemsArr === "" ?
        <div className='loader-spinner'>
            <img className='empty-cart' src="/emptycart.gif" alt="empty-cart"/>
            <p className='cart-header'>Your Cart is Empty</p>
            <button onClick={gobackTo} className="arrow-btn-progress" type="button"><img className="left-arrow-progress" src="/backarrow.png"/> Go Back</button>
        </div>:
       
         <div className='Cart-total-con'>
            <Paymentprogress prog={progress}  updateProgress={updateProgress}/>
            <div className='cart-total-body'>
              {progress==="Cart"?<CartItems cartItemsArr={cartItemsArr} updateProgress={updateProgress} getCartItems={getCartItems}/>:progress==="Payment"?<ScheduleTime/>:null}
            </div>
        </div>
    )
}
export default Cart