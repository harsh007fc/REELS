import React,{useEffect,useState,useContext} from 'react'

import {auth} from '../Firebase'

let AuthContext = React.createContext();

function AuthProvider({children}) {
    let [currentUser,setCurrentUser] = useState();
    
    let [loading,setLoading] = useState(true);

    function Signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function Login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function Logout()
    {
        return auth.signOut();
    }
    useEffect(()=>{
        let unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return ()=>{
            unsubscribe()
        }
    },[])

    let value = {
        currentUser,
        Signup,
        Login,
        Logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
