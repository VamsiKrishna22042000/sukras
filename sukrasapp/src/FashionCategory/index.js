import './index.css'

import {BsHandbag} from 'react-icons/bs'

import {Link,withRouter} from "react-router-dom"

import Cookies from 'js-cookie'

import { TailSpin } from 'react-loader-spinner'

import { useState, useEffect} from 'react'

const PageStage = {
    loading:"LOADING",
    success:"SUCCESS",
}

const FashionCategory = (props) =>{

    const [subCategory,setSubCategory] = useState([])
    const [allProducts,setallProducts] = useState([])
    const [load , setLoad] = useState(false)
    const [options,setOptions] = useState({price:true, discount:true , availability:true})
    
    const {match} = props
    const {params} = match

    useEffect(()=>{
        getTheCategoryItems()
        getAllOFtheProducts()
    },[])



    const changeOptions = (event) =>{
        if(event.target.id==="price"){
            setOptions(prevOptions=>({...prevOptions,price:!prevOptions.price}))
        }else if(event.target.id==="discount"){
            setOptions(prevOptions=>({...prevOptions,discount:!prevOptions.discount}))
        }else if(event.target.id==="availability"){
            setOptions(prevOptions=>({...prevOptions,availability:!prevOptions.availability}))
        }
    }

    const getTheCategoryItems = async() =>{
        const response = await fetch(`https://sukras.onrender.com/api/admin/getAllCategory/${params.category}`)
        const data = await response.json()
        if(response.ok){
            setSubCategory(data.categories)
        }
    }

    const getAllOFtheProducts = async() =>{
          const res = await fetch("https://sukras.onrender.com/api/admin/getAllProduct");
          const da = await res.json()
          if(res.ok){
             setallProducts(da.products)
             setLoad(true)
          }
    }
    
    const goback = () =>{
        const {history} = props
        history.push(`/fashionzone`)
   }

    const deleteCookie = () =>{
        /* deleteCookie was integrated with both searchIcons*/
        Cookies.remove("jwt_token")
        Cookies.remove("jwt_user")
    }
    
    const filterdItemsBasedOnType = allProducts.filter(each=>each.type === params.category)

    return(
        load  ?
    <div className='fashion-category'>
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="/sukraslogo.png" alt="Logo Space"/>
                <button onClick={goback} className="arrow-btn" type="button"><img className="left-arrow-mobile" src="/backarrow.png"/></button>
                <button onClick={deleteCookie} className="search-btn-fashion" type="button"><img className="search-mobile" src="/search-mobile.png"/></button>
                <button className="favourites-bttn" type="button"><img className="favourites" src="/favourites.png"/></button>
                <button className="cartBag-btn" type="button"><img className="cartBag" src="/cartBag.png"/></button>
                <div className="search-cart">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button onClick={deleteCookie} className="search-icon-button">
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
        <div className='fashion'>
               <p>Filters</p>
               <p className='sort-by'>Sort By :</p>
                <select  className='fashion-sortby'>
                    <option id="op">What's New</option>
                    <option>Better Discount</option>
                    <option>Price Low to High</option>
                    <option>Price High to Low</option>
                    <option>Customer Ratings</option>
                    <option>Recommended</option>
                </select>
        </div>
        <div className='fashion-category-main-body'>
            <div className='fashion-zone-filter'>
                <div className='filter-zone-text'><p>Price</p> <p id='price' onClick={changeOptions} className={options.price ?'todown':'toup'}>❯</p>
                </div>
                <div className={options.price ?'fashion-zone-opitons':'fashion-zone-opitons-disable'}>
                    <div>
                        <input id="1" type="checkbox"/>
                        <lable htmlFor="1">Under  ₹ 1000</lable>
                    </div>
                    <div>
                        <input id="2" type="checkbox"/>
                        <lable htmlFor="2">₹ 1000 - ₹ 1500</lable>
                    </div>
                    <div>
                        <input id="3" type="checkbox"/>
                        <lable htmlFor="3">₹ 1500 - ₹ 2000</lable>
                    </div>
                    <div>
                        <input id="4" type="checkbox"/>
                        <lable htmlFor="4">₹ 2000 - ₹ 2500</lable>
                    </div>
                </div>
                <div className='filter-zone-text'><p>Discount</p> <p id='discount' onClick={changeOptions} className={options.discount ?'todown':'toup'}>❯</p>
                </div>
                <div className={options.discount ?'fashion-zone-opitons':'fashion-zone-opitons-disable'}>
                    <div>
                        <input id="1" type="checkbox"/>
                        <lable htmlFor="1">80% or above</lable>
                    </div>
                    <div>
                        <input id="2" type="checkbox"/>
                        <lable htmlFor="2">50% or above</lable>
                    </div>
                    <div>
                        <input id="3" type="checkbox"/>
                        <lable htmlFor="3">45% or above</lable>
                    </div>
                    <div>
                        <input id="4" type="checkbox"/>
                        <lable htmlFor="4">30% or above</lable>
                    </div>
                </div>
                <div className='filter-zone-text'><p>Availability</p> <p id='availability' onClick={changeOptions} className={options.availability ?'todown':'toup'}>❯</p>
                </div>
                <div style={{marginBottom:20}} className={options.availability ?'fashion-zone-opitons':'fashion-zone-opitons-disable'}>
                    <div>
                        <input id="1" type="checkbox"/>
                        <lable htmlFor="1">In Stock</lable>
                    </div>
                </div>
            </div>        
            <div className='fashion-category-body'>
                {filterdItemsBasedOnType.map(each =>
                <Link to={`/fashioncategory/detailedview/${each.type}/${each.name}/${each._id}`} key={each._id} id={each._id} className='fashion-category-item'>
                <img className='fashion-category-image' src={each.image} alt={each.image}/>
                <img className='fashion-category-like' src="/fav-icon-item.png" alt="like"/>
                <p style={{textTransform:"capitalize"}} className='fashion-item-name'>{each.name}</p>
                <div className='price-details-off'>
                    <p className='fashion-item-price'><span className='fashion-item-name'>₹</span>{each.price}</p>
                    <p className='fashion-item-discount'>{parseInt(each.price) + 500}</p>
                </div>
                <div className='price-details-rating'>
                    <p className='fashion-item-offer'> 10% OFF</p>
                    <p className='fashion-item-star'>{each.rating}</p>
                    <img className='fashion-item-star-rating' src="/ratingstar.png" alt="star"/>
                    <p className='fashion-item-reviews'>({each.reviews})</p>
                </div>
                </Link>
                )}
            </div>
        </div>
    </div> : <div className="loader-spinner"> <TailSpin color={"#F4BD18"} height={70} width={70}/></div>)
}
export default withRouter(FashionCategory)