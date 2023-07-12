import './index.css'

const CartItemsFashion = (props) =>{
    const {cartItems}=props
    return(
    <div className='total-con-cartitems'>
    {cartItems.map(each =><div className='cart-item'>
                    <img className='cart-img' src={each.image} alt="image-cart"/>
                    <div className='cart-contents'>
                        <p style={{textTransform:"capitalize"}} className='cart-head'>{each.name}</p>
                        <p className='cart-head'><span className='service-price'>₹</span> {each.price}</p>
                    <div className='counter'><button className='counter-button'>-</button><p className='counter-para'>{each.count}</p><button className='counter-button'>+</button></div>
                    </div>
                    <button id={each._id} className='cart-cancel' type="button">✕</button>
    </div>)}
</div>)
}
export default CartItemsFashion