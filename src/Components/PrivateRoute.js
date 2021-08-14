import React,{useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider';
import {Route,Redirect} from 'react-router-dom'

function PrivateRoute({component:Component,...rest}) {
    let {currentUser} = useContext(AuthContext);
    return (
        <Route {...rest} render={props=>{
            //Component yahaan actual mein Feed hi hai with props
            return currentUser ? <Component {...props}/> : <Redirect to='/signup'/>
        }} />
    )
}

export default PrivateRoute
