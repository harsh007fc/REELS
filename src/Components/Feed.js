import React,{useContext,useEffect,useState} from 'react'
import Header from './Header'
import { AuthContext } from '../Context/AuthProvider';
import {database} from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile';
import Posts from './Posts';

function Feed() {
    let {currentUser} = useContext(AuthContext);
    let [userData,setUserData] = useState(null);
    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            // console.log(doc.data());
            setUserData(doc.data());
        })
    }, [currentUser])
    return (
        <>
        {
            userData == null ? <CircularProgress style={{display:'block',margin:'0 auto'}} />:<><Header userData={userData}/>
            <div style={{height:'9.5vh'} }>
                <div className='feed-container'>
                    <div className='center'>
                        <UploadFile style={{display:'block',alignSelf:'canter',margin:'0 auto'}} userData={userData}/>
                        <Posts userData={userData}/>
                    </div>
                </div>
            </div>
            </>
        }  
        </>
    )
}

export default Feed
