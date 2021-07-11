import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  btn:{
    marginTop:'10%',
    "&:hover": {
      backgroundColor: 'aqua',
      color:'lemon'
    }
  }
}));
function Buttons() {
  const classes=useStyles();
  return (
    <div>
      <Button className={classes.btn} color="secondary">Secondary</Button>
    </div>
  )
}

export default Buttons
