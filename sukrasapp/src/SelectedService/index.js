import {useState , useEffect} from 'react'

import {withRouter,Link} from 'react-router-dom'

import { TailSpin } from 'react-loader-spinner'

import './index.css'

const pageStage  = {
    loading:"LOADING",
    success:"SUCCESS",
}

const SelectedService = (props) =>{

    const [loading,setLoading] = useState(pageStage.loading)
    const [arr ,setArr] = useState("")
    const [servicesarr, setServicesarr] = useState("")

    const{match}=props
    const {params}=match
   
   const getServices = async() =>{
        
         const{match}=props
         const {params}=match
         /*console.log(params)*/

         const response = await fetch("https://sukras.onrender.com/api/admin/getAllSalon");
         const data = await response.json()
         if(response.ok === true){
               console.log(arr)
               const particularCategory =  data.salons[0].categories.filter(each => each._id === params.id)
               const servicesOfParticularCategory =  particularCategory[0].services
               setServicesarr(servicesOfParticularCategory)
               setLoading(pageStage.success)
               setArr({category:particularCategory[0].category,id:particularCategory[0]._id})
         }

   }
    
    useEffect(()=>{
        const{match}=props
        const {params}=match
        setArr(params)
        getServices()
    },[params])


    const goback = () =>{
        const {history}=props
        history.push(`/beautyzone`)
    }



    return(
        loading === pageStage.loading ? <div className="loader-spinner"> <TailSpin color={"#F4BD18"} height={70} width={70}/></div>: 
     <div className='selected-category-con'>
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="/sukraslogo.png" alt="Logo Space"/>
                <button className="arrow-btn" type="button" onClick={goback}><img className="left-arrow-mobile" src="/backarrow.png"/></button>
                <p style={{textTransform:"capitalize"}} className='sukras-beauty-select'>{arr.category}</p>
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
                    <Link to={`/cart/${arr.category}/${arr.id}`}>
                        <button className='count-of-cart1'>0</button>
                        <button className="cart-icon-button1">
                            <img src="/cart.png" alt="cart-icon" className="cart-icon1"/>
                        </button>
                    </Link>
                </div>
        </div>
        <div className='selected-body'>
            {servicesarr.map(each=>
                <div className='selected-body-total'>
                <div className='selected-body-content'>
                    <h1 style={{textTransform:"capitalize"}} className='selected-hea'>{each.service}</h1>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'>{each.rating}</p>
                        <img className='rating-star' src="/ratingstar.png" alt="rating"/>
                        <p className='selected-rating'>({each.reviews.length}k reviews)</p>
                    </div>
                    <div className='selected-rating-con'>
                        <p className='selected-rating'><span className='selected-price'>₹ </span><span className='selected-price-icon'>{each.price}</span></p>
                        <p className='selected-rating'>• {each.time} mins</p>
                    </div>
                    <p>• {each.description}</p>
                    <p>• Follow this up with styling look of your choice</p>
                    <p>• A quick trim to remove split ends while minimally reducing hair length</p>
                    <Link to={`/${each.service}/${arr.id}/details`}>
                             <button className="view-details" type="button">View Details</button>
                    </Link>
                </div>
                <div className='selected-body-book'>
                    <img className='selected-image' src={each.image[0]} alt={arr.category}/>
                    <button className='book-btn' type="button">Book</button>
                </div>
            </div>)}
        </div>
     </div>)
}

export default withRouter(SelectedService)