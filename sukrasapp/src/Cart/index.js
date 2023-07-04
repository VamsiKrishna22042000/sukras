
import './index.css'
import Paymentprogress from './payment'

import CartItems  from '../CartItems'


import { useState } from 'react'

const Cart = () =>{
    const [progress,setProgress] = useState("Cart")

    const updateProgress = (value) =>{
        setProgress(value)
    }

    return(
        <div className='Cart-total-con'>
            <Paymentprogress prog={progress}  updateProgress={updateProgress}/>
            <div className='cart-total-body'>
              {progress==="Cart"?<CartItems/>:null}
            </div>
        </div>
    )
}
export default Cart