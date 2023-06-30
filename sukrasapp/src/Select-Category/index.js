
import { withRouter } from "react-router-dom/cjs/react-router-dom.min"

import {useState} from 'react'

import {v4 as uuidv4} from 'uuid'


import './index.css'


const categories = [
    {
        id:uuidv4(),
        imgUrl:"beautyzone",
        category:"beautyzone",
        name:"Beauty Zone",
        yes:"yes"
    },
    {
        id:uuidv4(),
        imageUrl:"fashion",
        category:"fashionzone",
        name : "Fashion Zone",
        yes:'yes'
    },
    {
        id:uuidv4(),
        imageUrl:"eventmanagement",
        category:"eventManagement",
        name : "Event Management",
        yes:"yes",
    }
]

const SelectCategory = (props) =>{


     const [categorySelected, setCategory] = useState("")

     const selectedCat = (event) =>{
              setCategory(event.target.id)
     }



     const moveToHomePage = () =>{
          const {history}=props
          history.push(`/${categorySelected}`)
     }

      return(
        <div className="sukras-main-sukras">
            <div className='sukras-header-sukras'>
                    <img className='sukraslogosukras' src="./sukraslogo.png" alt="Logo Space"/>
            </div>
            <div className='website-body-sukras'>
                    <div className='form-sukras'>
                        <img className='sukraslogo2sukras' src='./logo2.png' alt="Logo Space2"/>
                        <p className="get-started">Let's Get Started</p>
                        <p className="enjoy-sevices">Enjoy our services by clicking any of these<br/>mentioned below...</p>
                        {categories.map(each=>(
                        <button id={each.category} className={(categorySelected === each.category)?"category-2":"category"} type="button" onClick={selectedCat}>
                            <span className="sukras-span">
                                <img className="sukras-icons" src={`./${each.imageUrl}.png`} alt={each.imageUrl}/>
                            </span>
                            <div className={(categorySelected === each.category)?"sukras-name-span2":"sukras-name-span1"}>{each.name}</div>
                            {(categorySelected === each.category) && <img className="sukras-icons-yes" src={`./${each.yes}.png`} alt ={each.yes}/>}
                        </button>))}
                        <div className="proceed-con">
                            <button onClick={moveToHomePage} className={(categorySelected!=="")?"proceed-2":"proceed"} type="button">Proceed</button>
                        </div>
                        </div>
            </div>
        </div>
      )
} 
export default withRouter(SelectCategory)