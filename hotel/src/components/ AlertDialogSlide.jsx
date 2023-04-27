import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({props}) {
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleDisagree}
        TransitionComponent={Transition}
        keepMounted
       
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deleting Room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            are you sure want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={props.handleDisagree}></Button>
          <Button onClick={props.handleAgree} >agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}