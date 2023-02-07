import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(props.nameTag);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddTag = (e) => {
    //e.preventDefault()
    const tag = {name: name}
    console.log(tag);
    fetch(`http://localhost:8087/${props.idUser}/tags/add`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(tag)
    }).then(res=>res.json()).then(() => {
        console.log("Tag is added");
    })
    setOpen(false);
  };
  const EditTag = (e) => {
    //e.preventDefault()
    const tag = {name: name}
    console.log(tag);
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/edit`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(tag)
    }).then(res=>res.json()).then(() => {
        console.log("Tag is added");
    })
    setOpen(false);
  };
  

  return (
    <div style={{display : "inline"}}>
      {props.nameTag === "" ?
      <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
          <AddIcon onClick={handleClickOpen} />
        </Fab>:
        <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
            <EditIcon onClick={handleClickOpen} />
        </Fab>
        }
      <Dialog open={open} onClose={handleClose}>
      {props.nameTag === "" ?
        <DialogTitle>Add new tag</DialogTitle>: <DialogTitle>Edit this tag</DialogTitle>}
        <DialogContent>
        <TextField id="outlined-basic" label="name" variant="outlined" value={name} fullWidth 
                onChange={e => setName(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {props.nameTag === "" ?
          <Button onClick={AddTag}>Add</Button>:
          <Button onClick={EditTag}>Edit</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
