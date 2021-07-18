import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Feed.css'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { storage, database } from '../firebase';



const useStyles = makeStyles((theme) => ({

}));

function UploadFile(props) {

    const classes = useStyles();
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let types = ['video/mp4', 'video/webm', 'video/ogg'];

    const onChange = (e) => {
        let file = e?.target?.files[0];
        if(!file){
            setError("Please Select A File");
            setTimeout(() => {
                setError("")
            }, 2000);
            return; 
        }
        if( types.indexOf(file.type) == -1){
            setError("Please select a video file");
            setTimeout(() => {
                setError("")
            }, 2000);
            return; 
        }
        if(file.size / (1024 * 1024) > 100){
            setError("Selected file is too big ");
            setTimeout(() => {
                setError("")
            }, 2000);
            return; 
        }

        const id = uuidv4();
        let uploadTask = storage.ref(`/post/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed',f1,f2,f3);

        function f1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + ' % done.');
        }
        function f2(error){
            setError(error);
            setTimeout(()=>{
                setError(null)
            },2000);
            setLoading(false)
        }

        async function f3(){
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    comments:[],
                    likes:[],
                    pId:id,
                    pUrl:url,
                    uName:props?.userData?.username,
                    uProfile:props?.userData?.profileUrl,
                    userId:props?.userData?.userId,
                    createdAt:database.getCurrentTimeStamp(),

                }

                database.posts.add(obj).then(async docRef=>{
                    // let parrId = docRef.id;
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds:[...props.userData.postIds,docRef.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch(error=>{
                    setError(error);
                    setTimeout(()=>{
                        setError(null)
                    },2000);
                    setLoading(false)
                })
            })
        }
         
    }


    return (

        <>
            {
                error != null ? <Alert severity="warning">{error}</Alert> : <><input onChange={onChange} type="file" color='primary' id='icon-button-file' style={{ display: 'none' }} />
                    <label htmlFor='icon-button-file' >
                        <Button disabled={loading} component='span' variant="outlined" size='medium' className={classes.button} color="secondary">
                            Upload
                        </Button>
                    </label>
                    {loading ? <LinearProgress style={{marginTop:'2%'}} color='secondary'/> : <></> }
                </>
            }
        </>
    )
}

export default UploadFile
