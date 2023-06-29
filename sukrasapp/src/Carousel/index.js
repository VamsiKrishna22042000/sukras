
import { useState, useEffect } from "react"

import './index.css'

const carouselImg = [
    {id:0,imgUrl:"beautyzone1"},
    {id:1,imgUrl:"beautyzone2"},
    {id:2,imgUrl:"beautyzone3"},
]

const Carousel = () =>{
    
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
                    <img src={`./${each.imgUrl}.png`} style={{transform:`translate(-${activeIndex * 100}%)`}} className="carouselImg" alt="carouselImg"/>  
                ))}
            </div>
            <div className="dots-con">
                 {carouselImg.map(each=>(<div id={each.id} className={activeIndex === each.id ? "dots" :"dots2"}></div>))}
            </div>
        </>
      
    )
}

export default Carousel