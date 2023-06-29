
import "./index.css"


import Carousel from "../Carousel/index"

import { withRouter } from "react-router-dom/cjs/react-router-dom.min"

const Beautyzone = () =>{
    return(
        <div className="sukras-main-beauty">
        <div className='sukras-header-beauty'>
                <img className='sukraslogobeauty' src="./sukraslogo.png" alt="Logo Space"/>
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
    </div>
    )
}
export default withRouter(Beautyzone)