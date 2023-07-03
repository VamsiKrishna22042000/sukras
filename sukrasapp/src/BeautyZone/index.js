
import "./index.css"


import Carousel from "../Carousel/index"

import { withRouter } from "react-router-dom/cjs/react-router-dom.min"

import { v4 as uuidv4 } from 'uuid';

import {Link} from 'react-router-dom'



const OtherServices = [
    {id:uuidv4(), imgUrl : "FemaleHairSalon"},
    {id:uuidv4(), imgUrl : "FemaleSpa"},
    {id:uuidv4(), imgUrl : "MaleGrooming"},
    {id:uuidv4(), imgUrl : "MaleMassage"},
    {id:uuidv4(), imgUrl : "PreBridalPackages"},
    {id:uuidv4(), imgUrl : "SaloneAtHome"},
    {id:uuidv4(), imgUrl : "AtHomeMakeup"},
    {id:uuidv4(), imgUrl : "LEDFacial"},
    {id:uuidv4(), imgUrl : "HomeNails"},

]

const Beautyzone = (props) =>{

    const gobackTo = () =>{
           const {history} = props
           history.push("/select-category")
    }

    const toCart = () =>{
        const {history}=props
        history.push('/cart')
    }

    return(
        <div className="sukras-main-beauty">
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="./sukraslogo.png" alt="Logo Space"/>
                <button onClick={gobackTo} className="arrow-btn" type="button"><img className="left-arrow-mobile" src="./backarrow.png"/></button>
                <button className="location-btnn" type="button"><img className="location-mobilee" src="./location-icon.png"/></button>
                <select className="dropdown-container">
                    <option>Hyderabad</option>
                </select>
                <button className="search-btnn" type="button"><img className="search-mobile" src="./search-mobile.png"/></button>
                <button className="notification-btnn" type="button"><img className="notification-mobile" src="./notification-mobile.png"/></button>
                <div className="search-cart">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button className="search-icon-button">
                        <img src="./search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                    <p onClick={toCart} className="count-of-cart">0</p>
                    <button className="cart-icon-buttonn" onClick={toCart}>
                        <img src="./cart.png" alt="cart-icon" className="cart-icon"/>
                    </button>
                </div>
        </div>
        <div className="beautyzone-body">
            <Carousel/>
        </div>
        <div className="beautyzone-body-2">
            <div className="our-services">
                    <p className="our-services-head">Our Service's</p>
                    {OtherServices.map(each=>(
                    <Link  to={`/${each.imgUrl}/${each.id}`}>
                        <button key={each.id} className="our-services-btn" id={each.id} type="button">
                             <img className="our-services-img" src={`./${each.imgUrl}.png`} alt={each.imgUrl}/>
                        </button>
                    </Link>))}
            </div>
        </div>
    </div>
    )
}
export default withRouter(Beautyzone)