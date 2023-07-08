
import { withRouter,Redirect,Route } from "react-router-dom/cjs/react-router-dom.min"

import Sukras from "../SuskrasMain"

import Cookies from 'js-cookie'




const ProtectedRoute = (props) =>{

    const obtainedCookie = Cookies.get("jwt_token")
    if(obtainedCookie===undefined){
        return <Redirect to="/email-login"/>
    }return <Route {...props}/>
    
}

export default withRouter(ProtectedRoute)