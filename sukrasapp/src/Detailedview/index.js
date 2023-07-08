
import {withRouter,Link} from 'react-router-dom'

import {BsHandbag} from 'react-icons/bs'

import {v4 as uuidv4} from 'uuid'

import {useState,useEffect} from 'react'

import { TailSpin } from 'react-loader-spinner';

import './index.css'
 

import {RiDeleteBinLine} from 'react-icons/ri';


import Cookies from 'js-cookie'





const ratingStars = [
    {id:1,star1:"☆",star2:"★"},
    {id:2,star1:"☆",star2:"★"},
    {id:3,star1:"☆",star2:"★"},
    {id:4,star1:"☆",star2:"★"},
    {id:5,star1:"☆",star2:"★"},
]


const pageStage = {
    loading : "LOADING",
    success : "SUCCESS"
}

const DetailedView = (props) =>{

    const [detailsarr, setArr] = useState("")
    const [review , setReview] = useState([])


    const [idSection , setId] = useState({userId : Cookies.get("jwt_user"), salonId:"",serviceId:""})

    const [comment , setComment ] = useState("")
    const [rating, setRating] = useState(0)

    const [loading, setLoading] = useState(pageStage.loading)

    const [serviceDetails, setDetails] = useState("")


    const [itemsInCart, setItemsInCart] = useState([])

    useEffect(()=>{
        getCartItems()
    },[])

    const getCartItems = async() =>{
        const id = Cookies.get("jwt_user") 
        const response = await fetch(`https://sukras.onrender.com/api/salon/getAllServicesFromCart/${id}`)
        const data = await response.json()
        setItemsInCart(data.cart)
    }

    const{match}=props
    const {params}=match

   
   
    
    useEffect(()=>{
        setArr(params)
        getServices()
    },[])

    const getServices = async () =>{
       const response = await fetch("https://sukras.onrender.com/api/admin/getAllSalon")
       const data = await response.json()
       if(response.ok === true){
           const obtainedServices = (data.salons[0].categories.map(each => each.services))
           const filterdService = obtainedServices.map(each => (each.filter(eachService => eachService.service === params.category)))
           const servicefilterd = filterdService.filter(each => each.length === 1)
           setDetails(servicefilterd[0][0])
           setReview(servicefilterd[0][0].reviews)
           /*console.log(servicefilterd[0][0].reviews)*/
           setId(prevId =>({...prevId,salonId:data.salons[0]._id, serviceId:servicefilterd[0][0]._id}))
           setLoading(pageStage.success)
       }
    }

    const gobackToNodetails = () =>{
        const {history}=props
        history.push(`/${detailsarr.category}/${detailsarr.id}`)
    }
    
    const addCommentFunction = (event) =>{
         setComment(event.target.value)
    }

    const formatDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
      };


    const addCommentButton = async() => {
       if(comment === "" && rating>0){
          alert("Please add Review about our service")
       }else if(comment!=="" && rating === 0){
          alert("Please rate our service")
       }else if (comment === "" && rating === 0){
        return null
    }else{

           
           const newReview = {
              ...idSection,
              review:comment,
              rating,
              date: formatDate(new Date()),
           }


           /*console.log(newReview)*/

           const url ="https://sukras.onrender.com/api/user/addServiceReview";

           const options={

            method : "POST",

            headers : {

                "Content-Type" : "application/json",

                 Authorization : "Bearer " + Cookies.get("jwt_token")
            },


            body : JSON.stringify(newReview),

           }

           const response = await fetch(url,options)
           const data = await response.json()

           /*console.log(response)*/
           
           setComment("");
           setRating(0);
           document.getElementById("comment-input").value="";
           getServices()
       }
      };
      
      const deleteReview = async(event) =>{
          
         


          console.log(event.target.id)

          const deleteTheReview = {
            salonId : idSection.salonId,
            reviewId : event.target.id,
          }


          /*console.log(deleteTheReview)*/

          const url ="https://sukras.onrender.com/api/user/deleteServiceReview"

          const options = {
              method : "POST",

              headers :{
                "Content-Type" : "application/json",
                 Authorization : "Bearer " + Cookies.get("jwt_user")
              },


              body : JSON.stringify(deleteTheReview)
          }

          const response = await fetch(url,options)
          const data = await response.json()
          getServices()
      }
      
      
    const setupRating = (event) =>{
        setRating(parseInt(event.target.id))
    }

    const addToCart = async()=>{

        const cartDetails = {...idSection}
 
        const options={
 
 
         method : "POST",
 
         headers : {
             "Content-Type" : "application/json"
         },
          
         body : JSON.stringify(cartDetails)
 
 
        }
 
        const url ="https://sukras.onrender.com/api/salon/addServiceToCart"
        const response = await fetch(url,options)
        console.log(response)
        
    }

    /*console.log(idSection)*/
    
    
    return(
        loading === pageStage.loading ? <div className='loader-spinner'><TailSpin color={"#F4BD18"} height={70} width={70}/></div> :
        <div id={serviceDetails._id} className='details-view-con'>
             <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="/sukraslogo.png" alt="Logo Space"/>
                <button className="arrow-btn" type="button" onClick={gobackToNodetails}><img className="left-arrow-mobile" src="/backarrow.png"/></button>
                <p style={{textTransform:"capitalize"}} className='sukras-beauty-selected'>{detailsarr.category}</p>
                <button className="location-btn" type="button"><img className="location-mobile" src="/location-icon.png"/></button>
                <select className="dropdown-con">
                    <option>Hyderabad</option>
                </select>
                <button className="search-btn" type="button"><img className="search-mobile" src="/search-mobile.png"/></button>
                <button className="notification-btn" type="button"><img className="notification-mobile" src="/notification-mobile.png"/></button>
                <div className="search-cart2">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button className="search-icon-button">
                        <img src="/search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                    <Link to={`/cart/${detailsarr.category}/${detailsarr.id}/details`}>
                        <button className='count-of-cart2'>{itemsInCart.length}</button>
                        <button className="cart-icon-button2">
                            <img src="/cart.png" alt="cart-icon" className="cart-icon2"/>
                        </button>
                    </Link>
                </div>
             </div>
             <div className='details-view-body'>
                <div className='details-content'>
                    <img className='details-img' src={serviceDetails.image[0]} alt="details-img"/>
                    <h1 style={{textTransform:"capitalize"}} className='details-head'>{detailsarr.category}</h1>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'>{serviceDetails.rating}</p>
                        <img className='rating-star1' src="/ratingstar.png" alt="rating"/>
                        <p className='selected-rating'>({serviceDetails.reviews.length} k reviews)</p>
                    </div>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'><span className='selected-price'>₹ </span><span className='selected-price-icon'>{serviceDetails.price}</span></p>
                        <p className='selected-rating'>• {serviceDetails.time} mins</p>
                    </div>
                    <p>• {serviceDetails.description}</p>
                    <p>• Follow this up with styling look of your choice</p>
                    <p>• Trim Hair to strengthen your hair</p>
                    <p>• Finishing with Blow Dry to double the game</p>
                    <p>• Excludes Hair Wash</p>
                    <p>• Haircut given by our Male Experts</p>
                    <p className='details-about'>What’s Included?</p>
                    <p>• Includes trimming & Cutting of Hair with Blow Dry</p>
                    <p>• Provides bounce to the hair</p>
                    <p>• Give Strength to the hair</p>
                    <p className='details-about'>Brands & Equipment Used</p>
                    <div className='details-brands'>
                        <img className='details-brands-img' src="/brands1.png" alt="brands-img"/>
                        <img className='details-brands-img' src="/brands2.png" alt="brands-img"/>
                        <img className='details-brands-img' src="/brands3.png" alt="brands-img"/>
                    </div>
                    <p className='details-about'>Why Should you get this Done</p>
                    <p>• Improves Hair Growth</p>
                    <p>• Removing Split Ends</p>
                    <p>• Boost your Confidence</p>
                    <Link to={`/${detailsarr.category}/${detailsarr.id}/details`}>
                        <button onClick={addToCart} className="make-abook-details" type="button">Add to <BsHandbag/></button>
                    </Link>
                    <p className='details-about'>Customer Reviews</p>
                    
                    {review.map(each=>(
                    <div className='review-item'>
                                <div className='review-rating'>
                                    <p>{each.rating}</p>
                                    <img className='rating-star2' src="/ratingstar.png" alt="rating"/>
                                </div>
                                <p className='review-para'>{each.review}</p>
                                <div className='review-person'>
                                    <p>{each.userId}</p>
                                    <div className='divider'></div>
                                    <p>{each.date.toString()}</p>
                                    <button id={each._id} className={Cookies.get("jwt_user")=== each.userId ? "delete-icon": "dont-delete" } type="button"><RiDeleteBinLine onClick={deleteReview} id={each._id}/></button>
                                </div>
                    </div>))}
                    <div className='AddComment'>
                        <h1 className='comment-head'>Write your review</h1>
                        <textarea id="comment-input"  onChange={addCommentFunction} className="add-comment-input" type="text" placeholder="What did you like or dislike about our service."/>
                        <h1 className='rating-head'>How would you rate our service?</h1>
                        <div className='rating-box'>
                            {ratingStars.map(each=>(<button onClick={setupRating} id={each.id} className={each.id>rating?"rating-button":"rating-button2"} type="button">{(each.id>rating)?each.star1:each.star2}</button>))}
                        </div>
                        <button className='add' onClick={addCommentButton}>Add</button>
                    </div>
             </div>
          </div>
        </div>)
}

export default withRouter(DetailedView)