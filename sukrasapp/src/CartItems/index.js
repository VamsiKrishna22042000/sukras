
import './index.css'


const CartItems = () =>{
    return(
        <>
            <div className='total-con-cartitems'>
                <div className='cart-item'>
                        <img className='cart-img' src="/selectedcategory.png" alt="image-cart"/>
                        <div className='cart-contents'>
                            <p className='cart-head'>Hair Wash</p>
                            <p className='cart-head'><span className='service-price'>₹</span> 599</p>
                            <div className='cart-buttons'>
                                    <button className='cart-butt' type="button">-</button>
                                        <p>1</p>
                                    <button className='cart-butt' type="button">+</button>
                            </div>
                        </div>
                        <button className='cart-cancel' type="button">✕</button>
                </div>
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
                <button className='proceed-to-schedule' type="button">Proceed</button>
            </div>
        </>
    )
}

export default CartItems