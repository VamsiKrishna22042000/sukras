




import { withRouter,Redirect } from 'react-router-dom/cjs/react-router-dom.min'


import Cookies from 'js-cookie'

import {useState} from 'react'

import './index.css'



const Emaillogin = (props) =>{

    const [signup , setSignUP] = useState({email:"",password:""})
    const [login, setLogin] = useState({email:"",password:""})
   



    const responseSuccessful = (token,userId) =>{
        
        Cookies.set('jwt_token', token, {expires : 30,})
        Cookies.set('jwt_user', userId, {expires : 30,})
        const {history} = props
        history.replace("/select-category")
    }

    const updateSign = (event) => {
        setSignUP({...signup,email:event.target.value})
    }
    
    const updateSignUppassword = (event) =>{
        setSignUP({...signup,password:event.target.value})
    }

    const updateLogin = (event) => {
        setLogin({...login,email:event.target.value})
    }
    
    const updateLoginPassword = (event) =>{
        setLogin({...login,password:event.target.value})
    }

    const getSignUp = async () => {

        const {email,password} = signup
        
        const url = "https://sukras.onrender.com/api/user/signup"
        const userDetails = {email,password}

        const  requestConfiger = {
            method : "POST",

            headers : {
                "Content-Type" : "application/json"
            },

            body : JSON.stringify(userDetails)
        }
        const response = await fetch(url,requestConfiger)
        
       
    }
    
    const getLogin = async () => {
        const {email,password} = login
        const userDetails = {email,password}
        const url = "https://sukras.onrender.com/api/user/login"
        
       


        const  requestConfiger = {
            method : "POST",
            
            headers : {
                "Content-Type" : "application/json"
            },

            body : JSON.stringify(userDetails)
        }
        const response = await fetch(url,requestConfiger)
        const data = await response.json()
        if(response.ok === true){
              responseSuccessful(data.token, data.result._id)
              
        }else{
              alert(data.message)
        }
    }

   

   

     
    const obtainedCookie = Cookies.get("jwt_token")
    
    
    if(obtainedCookie !== undefined){
        return <Redirect to="/select-category"/>
    }return(
        <div className='total'>
            <div className='total-container'>
                <input id="login" type="email" onChange={updateLogin}/>
                <input id="loginpassword" type="password" onChange={updateLoginPassword}/>
                <button type="button" onClick={getLogin}>Login</button>
            </div>
            <div className='total-container'>
                <input id="signup" type="email" onChange={updateSign}/>
                <input id="signuppassword" type="password" onChange={updateSignUppassword}/>
                <button type="button" onClick={getSignUp}>Sign up</button>
           </div>
        </div>
        )

}

export default withRouter(Emaillogin)