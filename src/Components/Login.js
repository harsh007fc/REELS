import React,{useState,useContext, useEffect} from 'react'
import { useHistory} from 'react-router-dom';
import {AuthContext} from '../Context/AuthProvider';
import '../Components/Styles/SignUp.css'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {login,currentUser} =useContext(AuthContext);
    let history = useHistory();
     const handleSubmit = async(e)=>{
          console.log('hi');
        e.preventDefault()
        try {
          console.log('Logging in user')
          setLoading(true)
          await login(email, password)
          setLoading(false)
          history.push('/')
        } catch {
          setError("Failed to log in")
          setTimeout(()=>setError(''),2000)
          setLoading(false)
        }
      }
      useEffect(()=>{
        if(currentUser)
        { //if already logged in then redirect to feed directly
          history.push('/')
        }
      },[])
    return (
      <body id="body">
        <div  className="container">
          <form onSubmit={handleSubmit} className='content' >
          <h1 id="say-hello">Stories</h1>
            <div className="email">
              <label htmlFor=''>Email</label><br />
              <input className="fld" type='email' placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor=''>Password</label><br />
              <input className="fld" placeholder="Enter your Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <button className="btn" type='submit' disabled={loading}>Login</button>
            {error ? <h1>{error}</h1> : <></>}
          </form>
        </div>

      </body>
    )
}

export default Login