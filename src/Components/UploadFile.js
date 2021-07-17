import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Feed.css'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles((theme) => ({

}));

function UploadFile() {

    const classes = useStyles();
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);
    let types = ['video/mp4', 'video/webm', 'video/ogg'];

    const onChange = (e) => {

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
