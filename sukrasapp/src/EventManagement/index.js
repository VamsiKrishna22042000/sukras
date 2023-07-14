
import './index.css'

import EventBooking from './eventbooking'


import EventHome from './eventHome'
import { useCallback, useState } from 'react'


const EventManagement = () =>{


    const [pageStage,setStage] = useState('Home')

    const settingPage = (value) =>{
        setStage(value)
    }

    return (

        <>
           {pageStage === "Home" ? <EventHome pageStage={pageStage} settingPage={settingPage}/> : <EventBooking pageStage={pageStage} settingPage={settingPage}/> }
        </>

    )
}

export default EventManagement