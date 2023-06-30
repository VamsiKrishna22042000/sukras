
import "./index.css"


import Carousel from "../Carousel/index"

import { withRouter } from "react-router-dom/cjs/react-router-dom.min"

import { v4 as uuidv4 } from 'uuid';

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

const Beautyzone = () =>{
    return(
        <div className="sukras-main-beauty">
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="./sukraslogo.png" alt="Logo Space"/>
                <button className="arrow-btn" type="button"><img className="left-arrow-mobile" src="./backarrow.png"/></button>
                <button className="location-btn" type="button"><img className="location-mobile" src="./location-icon.png"/></button>
                <select className="dropdown-con">
                    <option>Hyderabad</option>
                </select>
                <button className="search-btn" type="button"><img className="search-mobile" src="./search-mobile.png"/></button>
                <button className="notification-btn" type="button"><img className="notification-mobile" src="./notification-mobile.png"/></button>
                <div className="search-cart">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button className="search-icon-button">
                        <img src="./search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                    <button className="cart-icon-button">
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
                    {OtherServices.map(each=>(<button className="our-services-btn" id={each.id} type="button"><img className="our-services-img" src={`./${each.imgUrl}.png`} alt={each.imgUrl}/></button>))}
            </div>
        </div>
    </div>
    )
}
export default withRouter(Beautyzone)