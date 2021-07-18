import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { database } from '../firebase';
import { mergeClasses } from '@material-ui/styles';
import Video from './Video';
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '0px'
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%'
  },
  typo: {
    marginLeft: '2%'
  },
  vac: {
    marginLeft: '3.5%',
    color: '#8e8e8e',
    cursor: 'pointer'
  },
  dp: {
    marginLeft: '2%'
  },
  cc: {
    height: '50vh',
    overflowY: 'auto'
  },
  seeComments: {
    height: '54vh',
    overflowY: 'auto'
  },
  ci: {

    color: 'white',
    left: '9%',
    cursor: 'pointer'
  },
  mn: {
    color: 'white',


  },
  tmn: {
    color: 'white'
  }

});
function Posts() {
  const classes = useStyles();
  const [posts, setPosts] = useState(null);
  const callback = (entries) => {
    entries.forEach(element => {
      console.log(element);
      let el = element.target.children[0];
      el.play().then(() => {
        //if this video is not in viewport then pause it
        if (!el.paused && !element.isIntersecting) {
          el.pause();
        }
      })

    });
  }
  const observer = new IntersectionObserver(callback,{
    threshold:"0.9"
   });

   useEffect(() => {
     let parr = [];
     const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
       parr = [];
       querySnapshot.forEach((doc)=>{
         let data = {...doc.data(),postId:doc.id}
         parr.push(data);
       })
       setPosts(parr);
     })
     return unsub; //yeh unsubcribe huya
   }, [])

   useEffect(()=>{
    let elements = document.querySelectorAll('.videos');
    elements.forEach(el=>{
      observer.observe(el);
    })
    return ()=>{
      observer.disconnect(); //taaki baaar baar videos jab add ho tb videos unmount hone par listner hat jae
    }
   },[posts])
  return (
    <>
    <div className='place'>
    </div>
    {posts == null ?  <CircularProgress className={classes.loader} color="secondary" /> : 
    <div className='video-container' id = 'video-container'>
      {
        posts.map((post,index)=>(
          <React.Fragment key={post.postId}>
            <div className="videos">
              <Video source={post.pUrl} id= {post.pId} />
              <div className="fa" style={{display:'flex'}}>
                <Avatar src={post.uProfile}/>
                <h4>{post.uName}</h4>
              </div>
            </div>
            <div className="place"></div>
          </React.Fragment>
        ))
      }
    </div>
    }
    

    </>
  )
}

export default Posts