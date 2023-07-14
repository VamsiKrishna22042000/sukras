
import { useState } from 'react'
import './index.css'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import Cookies from 'js-cookie'


const categories = [
    {name:"birthday celebration"},
    {name:"cocktail party"},
    {name:"marriage events"},
    {name:"farewell party"},
    {name:"anniversary celebrations"},
]

const EventBooking = (props) =>{


    const {pageStage,settingPage} = props
 
    const [book, setBook] = useState({name:"",eventname:"",category:pageStage,date:"",guest:"",state:"",country:""})

    const gobackTo = () =>{
        settingPage("Home")
    }


    const settingvalues = (event) =>{
        const value = event.target.value
        const id = event.target.id
        if(id === "name"){
            setBook(prevbook => ({...prevbook,name:value}))
        }else if(id === "eventname"){
            setBook(prevbook => ({...prevbook,eventname:value}))
        }else if(id === "category"){
            setBook(prevbook => ({...prevbook,category:value}))
        }else if(id === "date"){
            setBook(prevbook => ({...prevbook,date:value}))
        }else if(id === "guest"){
            setBook(prevbook => ({...prevbook,guest:value}))
        }else if(id === "state"){
            setBook(prevbook => ({...prevbook,state:value}))
        }else if(id === "country"){
            setBook(prevbook => ({...prevbook,country:value}))
        }
    }


    const booking = async (event) =>{
        event.preventDefault()

        if(book.name === ""){
            alert("Please Enter Name")
        }else if(book.eventname === ""){
            alert("Please Enter Event Name")
        }else if(book.category === ""){
            alert("Please Enter Category")
        }else if(book.date === ""){
            alert("Please Enter Date")
        }else if(book.guest === ""){
            alert("Enter No of Guest")
        }else if(book.state === ""){
            alert("Please Enter State")
        }else if(book.country === ""){
            alert("Please Enter Country")
        }else{
            document.getElementById("name").value = "";
            document.getElementById("eventname").value = "";
            document.getElementById("category").value = "";
            document.getElementById("date").value = "";
            document.getElementById("guest").value = "";
            document.getElementById("state").value = "";
            document.getElementById("country").value = "";

        const url = "https://sukras.onrender.com/api/user/bookEvent"
        const details = {
            userId : Cookies.get("jwt_user"),
            yourName : book.name,
            eventname : book.eventname,
            date : book.date,
            NumberofGuest : book.guest,
            state : book.state,
            country : book.country
        }
        const options = {
            method : "POST",

            headers : {
                "Content-Type" : "application/json"
            },

            body : JSON.stringify(details)
        }

        const response = await fetch(url,options)
        
        if(response.ok){
            const {history} = props
            history.push('/successEvent')
        }


    }
    }

    const deleteCookie = () =>{
        /* deleteCookie was integrated with both searchIcons*/
        Cookies.remove("jwt_token")
        Cookies.remove("jwt_user")
    }

    return(
        <>
           <div className='sukras-header-fashionzone'>
                <img className='sukraslogobeauty' src="./sukraslogo.png" alt="Logo Space"/>
                <button onClick={gobackTo} className="arrow-btn" type="button"><img className="left-arrow-mobile" src="./backarrow.png"/></button>
                <button className="location-btnn" type="button"><img className="location-mobilee" src="./location-icon.png"/></button>
                <select className="dropdown-container">
                    <option>Hyderabad</option>
                </select>
                <button onClick={deleteCookie} className="search-btn-fashion" type="button"><img className="search-mobile" src="./search-mobile.png"/></button>
                <button className="notification-btnn" type="button"><img className="notification-mobile" src="./notification-mobile.png"/></button>
                <div className="search-cart">
                    <input className="serch-cart-input" placeholder="Enter keywords, title, author or ISBN " type="search"/>
                    <button onClick={deleteCookie} className="search-icon-button">
                        <img src="./search-icon.png" alt="search-icon" className="search-icon"/>
                    </button>
                </div>
           </div>
           <form className='booking-con'>
              <h1 className='booking-head'>Create Event</h1>
              <div className='items-con-booking'>
                    <lable style={{marginBottom:5, marginTop:5}} htmlFor="name">Name</lable>
                    <input onChange={settingvalues} className='booking-input' id="name" type="text" placeholder='Enter your name'/>
              </div>
              <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="event-name">Event Name</lable>
                <input  onChange={settingvalues} className='booking-input' id="eventname" type="text" placeholder='Enter your event name'/>
              </div>
              <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="category">Categories</lable>
                <select onChange={settingvalues} className='booking-input' id="category" style={{textTransform:"capitalize"}} placeholder="Select Category">
                    {categories.map(each=><option selected = {pageStage === each.name ? true : false}>{each.name}</option>)}
                </select>
             </div>
             <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="date">Date</lable>
                <input onChange={settingvalues} className='booking-input' id="date" type="date"/>
             </div>
             <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="guest">Number of Guest</lable>
                <input onChange={settingvalues} className='booking-input' id="guest" type="text" placeholder='Number of Guest'/>
             </div>
             <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="state">State</lable>
                <input onChange={settingvalues} className='booking-input' id="state" type="text" placeholder='State Name'/>
             </div>
             <div className='items-con-booking'>
                <lable style={{marginBottom:5, marginTop:5}}htmlFor="country">Country</lable>
                <input onChange={settingvalues} className='booking-input'id="country" type="text" placeholder='Country Name'/>
             </div>  
           </form>
           <div className='button-container-booking'>
                <button onClick={booking} className="proceed-btn" type="submit" >Proceed</button>
           </div>
           
        </>
    )
}
export default withRouter(EventBooking)