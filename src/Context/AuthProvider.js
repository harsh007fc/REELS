import React,{useEffect,useState,useContext} from 'react'

import {auth} from '../firebase'

export let AuthContext = React.createContext();

function AuthProvider({children}) {
    let [currentUser,setCurrentUser] = useState();
    
    let [loading,setLoading] = useState(true);

    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }
    useEffect(()=>{
        //component did mount 
        let unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })

        //component will unmount
        return ()=>{
            unsubscribe();
        }
    },[])

    let value = {
        currentUser,
        signup,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
             {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider




