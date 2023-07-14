

import { useState, useEffect } from "react"


import './index.css'

const carouselImg = [
    {id:0,imgUrl:"marriageCermonyEvents.png" ,offer : "Get Upto 15% off",service : "Marriage Ceremony",btn:"Book Now   ❯"},
    {id:1,imgUrl:"birthdayEvents.png",offer : "Minimum 30% off",service : "Birthday Events",btn:"Book Now   ❯"},
    {id:2,imgUrl:"CorporateEvents.png",offer : "Best Of Facilities",service : "Corporate Events",btn:"Book Now   ❯"},
]



const EventManagementCarousel = () =>{
    
    const [activeIndex, setActiveIndex] = useState(0)
    
    useEffect(()=>{
      const id =  setTimeout(()=>{
            if(activeIndex === carouselImg.length - 1){
                setActiveIndex(0)
            }else{
                setActiveIndex(activeIndex+1)
            }
        },3000)

        return(
            ()=>{
                clearTimeout(id)
            }
        )
    },[activeIndex])


    return(
        <>   
            <div className="carouselImg-con">
                 {carouselImg.map(each=>(
                        <div key = {each.id} id={each.id} className="carousel-content" style={{transform:`translate(-${activeIndex * 100}%)`, backgroundImage: `URL(${each.imgUrl})`}}>
                            <h1 className="offer">{each.offer}</h1>
                            <p className="service">{each.service}</p>
                            <button className="btn" type="button">{each.btn}</button>
                            <div className="shadow"></div>
                        </div> 
                 ))}
            </div>
            <div className="dots-con">
                 {carouselImg.map(each=>(<div key={each.id} id={each.id} className={activeIndex === each.id ? "dots" :"dots2"}></div>))}
            </div>
        </>
      
    )
}

export default EventManagementCarousel