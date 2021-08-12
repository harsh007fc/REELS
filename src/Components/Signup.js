import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { storage, database } from '../firebase'
import { useHistory } from 'react-router-dom'
import '../Components/Styles/SignUp.css'
function Signup() {
    let [email, setMail] = useState('');
    let [file, setFile] = useState(null);
    let [password, setPassword] = useState('');
    let [name, setName] = useState('');
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let history = useHistory();
    // console.log(useContext(AuthContext));
    let { signup, currentUser } = useContext(AuthContext);

    console.log(signup);

    let handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            let uploadTaskListner = storage.ref(`/users/${uid}/profileImage`).put(file);
            // fn1-> uploading track
            //fn2 -> error 
            //fn 3 -> success
            uploadTaskListner.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + ' % done');
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListner.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                console.log(database);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
            }
            console.log(uid);
            setLoading(false);
            console.log('User Has Signed up');
            history.push('/')
        }
        catch (error) {
            setError(error);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);

        }
    }

    let handleFileSubmit = (e) => {
        let file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    }
    useEffect(() => {
        if (currentUser) { //if already logged in then redirect to feed directly
            history.push('/')
        }
    }, [])
    return (
        <body id="body">
            <div className="container">
                <form onSubmit={handleSignup} className='content'>
                <h1 id="say-hello">Stories</h1>
                    <div>
                        <div className='name'>
                            <label for="name">UserName</label><br />
                            <input className="fld" id="name" placeholder="Enter your Username" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="email">
                            <label for="email">Email</label><br />
                            <input id="email" placeholder="Enter your Email" className="fld" type="email" value={email} onChange={(e) => { setMail(e.target.value) }} />
                        </div>
                        <div className="email">
                            <label for="password">Password</label><br />
                            <input id="password" placeholder="Enter your Password" className="fld" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="email">
                            <label htmlFor="profile">Profile Image </label><br />
                            <input  id="pic" className="fld" type="file" accept='image/*' onChange={handleFileSubmit} />
                        </div>
                    </div>
                    <button class="btn" type='submit' disabled={loading}>Login</button>
                </form>
            </div>


        </body >
    )
}

export default Signup


