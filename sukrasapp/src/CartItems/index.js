
import './index.css'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import Cookies from 'js-cookie'


const CartItems = (props) =>{
    const {updateProgress,cartItemsArr,getCartItems}=props

   
    const sendUpdate = () =>{
          updateProgress("Payment")
    }

    const deleteServiceFromCart = async(event) =>{
        
        const url ="https://sukras.onrender.com/api/salon/deleteServiceFromCart"

        const details = {userId: Cookies.get("jwt_user"), cartId:event.target.id }
        
        const options = {
            method : "POST",

            headers : {
                "Content-Type" : "application/json"
            },

            body : JSON.stringify(details)
        }

        const response = await fetch(url,options)
        console.log(response)
        
        getCartItems()
    }

    return(
        <>
            <div className='total-con-cartitems'>
               {cartItemsArr.map(each =>
                <div className='cart-item'>
                        <img className='cart-img' src={each.image} alt="image-cart"/>
                        <div className='cart-contents'>
                            <p style={{textTransform:"capitalize"}} className='cart-head'>{each.service}</p>
                            <p className='cart-head'><span className='service-price'>₹</span> {each.price}</p>
                            <div className='slots-available'>
                                    <select className='select-options'>
                                        <option>5th, July</option>
                                    </select>
                                    <select className='select-options'>
                                        <option>10 Am</option>
                                    </select>
                            </div>
                        </div>
                        <button onClick={deleteServiceFromCart} id={each._id} className='cart-cancel' type="button">✕</button>
               </div>
               ) }
            </div>
            <div className='price-details'> 
                <p className='price-head1'>PriceDetials</p>
                <div style={{display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
                    <p className='actual-price'>Actual Price</p>
                    <p className='price1'><span className='actual-price'>₹</span> 2,756</p>
                </div>
                <div style={{display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
                    <p className='total-discount'>Total Discount</p>
                    <p className='total-discount'><span className='actual-price'>-₹</span> 700</p>
                </div>
                <div className='total-cart-price' style={{display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
                    <p className='total-price-head'>Total</p>
                    <p className='total-price-head'><span className='actual-price'>₹</span> 2,756</p>
                </div>
                <button onClick={sendUpdate} className='proceed-to-schedule' type="button">Proceed</button>
            </div>
        </>
    )
}

export default withRouter(CartItems)