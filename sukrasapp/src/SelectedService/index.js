import {useState , useEffect} from 'react'

import {withRouter,Link} from 'react-router-dom'

import './index.css'

const SelectedService = (props) =>{

    const [arr, setArr] = useState("")

    const{match}=props
    const {params}=match
   
    
    useEffect(()=>{
        setArr(params)
    },[])


    const goback = () =>{
        const {history}=props
        history.push(`/beautyzone`)
    }

    const toCart = () =>{
        const {history}=props
        history.push('/cart')
    }

    return(
     <div className='selected-category-con'>
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="/sukraslogo.png" alt="Logo Space"/>
                <button className="arrow-btn" type="button" onClick={goback}><img className="left-arrow-mobile" src="/backarrow.png"/></button>
                <p className='sukras-beauty-select'>{arr.category}</p>
                <button className="location-btn" type="button"><img className="location-mobile" src="/location-icon.png"/></button>
                <select className="dropdown-con">
                    <option>Hyderabad</option>
                </select>
                <button className="search-btn" type="button"><img className="search-mobile" src="/search-mobile.png"/></button>
                <button className="notification-btn" type="button"><img className="notification-mobile" src="/notification-mobile.png"/></button>
                <div className="search-cart1">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button className="search-icon-button">
                        <img src="/search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                    <p onClick={toCart} className='count-of-cart1'>0</p>
                    <button onClick={toCart} className="cart-icon-button1">
                        <img src="/cart.png" alt="cart-icon" className="cart-icon1"/>
                    </button>
                </div>
        </div>
        <div className='selected-body'>
            <div className='selected-body-total'>
                <div className='selected-body-content'>
                    <h1 className='selected-hea'>{arr.category}</h1>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'>4.5</p>
                        <img className='rating-star' src="/ratingstar.png" alt="rating"/>
                        <p className='selected-rating'>(3.7k reviews)</p>
                    </div>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'><span className='selected-price'>₹ </span><span className='selected-price-icon'>599</span></p>
                        <p className='selected-rating'>• 30 mins</p>
                    </div>
                    <p>• Get smooth & silky hairs</p>
                    <p>• Follow this up with styling look of your choice</p>
                    <p>• A quick trim to remove split ends while minimally reducing hair length</p>
                    <Link to={`/${arr.category}/${arr.id}/details`}>
                             <button className="view-details" type="button">View Details</button>
                    </Link>
                </div>
                <div className='selected-body-book'>
                    <img className='selected-image' src="/selectedcategory.png" alt={arr.category}/>
                    <button className='book-btn' type="button">Book</button>
                </div>
            </div>
        </div>
     </div>)
}

export default withRouter(SelectedService)