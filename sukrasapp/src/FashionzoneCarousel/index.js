

import { useState, useEffect } from "react"


import './index.css'





const FashionZoneCarousel = () =>{
    
    const [activeIndex, setActiveIndex] = useState(0)
    const [banners,setBanners] = useState([])
    const [dots ,setDots] = useState([])

    useEffect(()=>{
        getBanners()
       },[])

       const getBanners = async() =>{
        const response = await fetch("https://sukras.onrender.com/api/admin/getAllBanners")
        const data = await response.json()
        if(response.ok===true){
           const bannersDestructure = data.banners.map(each =>({
            id:each._id,
            image:each.image,
            offer:each.offer,
            text:each.text,
            link:each.link,
            btn:"Shop Now   ❯"
        })) 
           setBanners(bannersDestructure)
        }
       }
   
       
    useEffect(()=>{getDots()},[banners])   

    const getDots = () =>{
        setDots([])
        for (let index = 0; index < banners.length; index++) {
            setDots(prevDots=>[...prevDots,{id:index}])
        }
    }

    useEffect(()=>{
      const id =  setTimeout(()=>{
            if(activeIndex === banners.length - 1){
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
            <h1 className="fashion-zone-head">Top Picks For You</h1>
            <div className="carouselImg-con">
                 {banners!==""&& banners.map(each=>(
                        <div key = {each._id} id={each.id} className="carousel-content" style={{transform:`translate(-${activeIndex * 100}%)`, backgroundImage: `url(${each.image})`}}>
                            <h1 className="offer">{each.offer}</h1>
                            <p className="service">{each.text}</p>
                            <button className="btn" type="button">{each.btn}</button>
                            <div className="shadow"></div>
                        </div> 
                 ))}
            </div>
            <div className="dots-con">
                 {dots.map(each=>(<div key={each.id} id={each.id} className={activeIndex === each.id ? "dots" :"dots2"}></div>))}
            </div>
        </>
      
    )
}

export default FashionZoneCarousel