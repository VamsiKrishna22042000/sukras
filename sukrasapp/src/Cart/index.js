
import './index.css'
import Paymentprogress from './payment'


import { useState } from 'react'

const Cart = () =>{
    const [progress,setProgress] = useState("Cart")

    const updateProgress = (value) =>{
        setProgress(value)
    }

    return(
        <div className='Cart-total-con'>
             <Paymentprogress prog={progress}  updateProgress={updateProgress}/>
        </div>
    )
}
export default Cart