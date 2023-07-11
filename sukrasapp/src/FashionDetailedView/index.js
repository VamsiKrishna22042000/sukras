
import Detailedview from '../Detailedview'
import './index.css'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import { TailSpin } from 'react-loader-spinner'

import { BsHandbag } from 'react-icons/bs'

import {RiDeleteBinLine} from 'react-icons/ri'

import { useState, useEffect } from 'react'

import DetailedViewCarousel from './Detailedviewcarousel'


const sizes = [
    {id:"S",text:"S"},
    {id:"M",text:"M"},
    {id:"L",text:"L"},
    {id:"XL",text:"XL"},
]

const colors = [
    {id:"#F93D3D",text:"#F93D3D"},
    {id:"#35CEE3",text:"#35CEE3"},
    {id:"#35E35B",text:"#35E35B"},
    {id:"#6235E3",text:"#6235E3"},
]

const ratingStars = [
    {id:1,star1:"☆",star2:"★",},
    {id:2,star1:"☆",star2:"★",},
    {id:3,star1:"☆",star2:"★",},
    {id:4,star1:"☆",star2:"★",},
    {id:5,star1:"☆",star2:"★",},
]

const FashionDetailedView = (props) =>{
    const [rating, setRating] = useState(0)
    const [size,setSize] = useState("")
    const [color,setColor] = useState("")
    const [categories , setCategories] = useState([])
    const [load, setLoad] = useState(false)
    const {match}=props
    const {params}=match
 
    const gobackTo = () =>{
        const {history} = props
        history.push(`/fashioncategory/${params.type}`)
   }

   useEffect(()=>{
    getAllCategoryOfProducts()
  },[])
 

   const getAllCategoryOfProducts = async () =>{
    const response = await fetch(`https://sukras.onrender.com/api/admin/getAllProduct`)
    const data = await response.json()
    if(response.ok === true){
        setCategories(data.products)
        setLoad(true)
    }
 }
    
 

   const selectSize = (event) =>{
      setSize(event.target.id)
   }
   

   const selectColor = (event) =>{
      setColor(event.target.id)
   }

   const setupRating = (event) =>{
    setRating(parseInt(event.target.id))
}


const filterItem = categories.filter(each=> each._id === params.id)
console.log(filterItem)
   
    return (
    load  ? <div classname="detailed-view-body">
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="/sukraslogo.png" alt="Logo Space"/>
                <button onClick={gobackTo} className="arrow-btn" type="button"><img className="left-arrow-mobile" src="/backarrow.png"/></button>
                <p class="detailed-view-head" style={{textTransform:"capitalize"}}>{filterItem[0].name}</p>
                <div className="search-cart">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button className="search-icon-button">
                        <img src="/search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                    <Link to={`/cart/beautyzone`}>
                        <button className="count-of-cart">0</button>
                        <button className="cart-icon-buttonn">
                            <img src="/cart.png" alt="cart-icon" className="cart-icon"/>
                        </button>
                    </Link>
                </div>
        </div>
        <div className='detailed-view-sub-body'>
            <div  className='details-view-con'>
             <div className='details-view-body'>
                <div className='fashion-details-content'>
                        <DetailedViewCarousel filterItem={filterItem[0]}/>
                    <h1 style={{textTransform:"capitalize"}} className='fashion-details-head'>{filterItem[0].name}</h1>
                   
                    <div className='selected-rating-con'>
                        <p className='fashion-selected-rating'><span className='fashion-selected-price'>₹ </span><span className='selected-price-icon'>{filterItem[0].price}</span></p>
                        <p><span className='fashion-selected-price'>₹ </span><span className='fashion-selected-price-icon'>{parseInt(filterItem[0].price) + 500}</span></p>
                        <p className='fashion-selected-offer'>(10% Off)</p>
                    </div>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'>{filterItem[0].rating}</p>
                        <img className='rating-star1' src="/ratingstar.png" alt="rating"/>
                        <p className='selected-rating'>({filterItem[0].reviews} k reviews)</p>
                    </div>
                    <p className='fashion-details-about'>Select Size</p>
                    <div className='fashion-details-size-selection'>
                       {sizes.map(each =>( <button id = {each.id} onClick={selectSize}  className={each.id === size? 'fashion-size-select1' :'fashion-size-select'} type='button'>{each.text}</button>))}
                    </div>
                    <p className='fashion-details-about'>Select Color</p>
                    <div className='fashion-details-size-selection'>
                      {colors.map(each=> <button id={each.id} onClick = {selectColor} style={{backgroundColor:each.text}} className='fashion-color-select' type='button'></button>)} 
                      
                    </div>
                    <p className='fashion-details-about'>Product Details</p>
                    <p>{filterItem[0].about}</p>
                    <p className='fashion-details-about'>Select Color</p>
                    <p>• Soft material</p>
                    <p>• Beautiful floral prints</p>
                    <p>• Well stiched</p>
                    <p className='fashion-details-about'>Material & Care</p>
                    <p>• Pure georgette</p>
                    <p>• Mashine wash</p>
                    <button className="make-abook-details" type="button">Add to <BsHandbag/></button>
                   
                    <p className='fashion-details-about'>Customer Reviews</p>
                    
                   <div className='review-item'>
                                <div className='review-rating'>
                                    <p>4.5</p>
                                    <img className='rating-star2' src="/ratingstar.png" alt="rating"/>
                                </div>
                                <p className='review-para'>3</p>
                                <div className='review-person'>
                                    <p>vamsi</p>
                                    <div className='divider'></div>
                                    <p>11th, July</p>
                                    <button className="delete-icon" type="button"><RiDeleteBinLine /></button>
                                </div>
                    </div>
                    <div className='AddComment'>
                        <h1 className='comment-head'>Write your review</h1>
                        <textarea id="comment-input"  className="add-comment-input" type="text" placeholder="What did you like or dislike about our service."/>
                        <h1 className='rating-head'>How would you rate our Product?</h1>
                        <div className='rating-box'>
                        {ratingStars.map(each=>(<button onClick={setupRating} id={each.id} className={each.id>rating?"rating-button":"rating-button2"} type="button">{(each.id>rating)?each.star1:each.star2}</button>))}
                        </div>
                        <button className='add' >Add</button>
                    </div>
             </div>
          </div>
        </div>
        </div>
    </div> : <div className="loader-spinner"> <TailSpin color={"#F4BD18"} height={70} width={70}/></div> )
}
export default FashionDetailedView