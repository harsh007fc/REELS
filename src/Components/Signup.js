import React,{useContext,useEffect,useState} from 'react'
import {AuthContext} from '../Context/AuthProvider'

function Signup() {
    let [email,setMail] = useState('');
    let [password,setPassword] = useState('');
    let [name,setName] = useState('');
    let [error,setError] = useState('');
    let [loading,setLoading] = useState(false);

    // console.log(useContext(AuthContext));
    let {signup} = useContext(AuthContext);
    console.log(signup);

    let handleSignup = async(e) => {
        e.preventDefault();
        setLoading(true);
        let res = await signup(email,password);
        let uid = res.user.uid;
        console.log(uid);
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="">UserName</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => { setMail(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type='submit' disabled={loading}>Login</button>
            </form>
        </div>
    )
}

export default Signup


