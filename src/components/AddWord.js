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
import "../css/main.css"

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(props.word.name);
  const [transcript, setTranscript] = React.useState(props.word.transcript);
  const [url_photo_word, setUrlPhotoWord] = React.useState(props.word.url_photo_word);
  const [word, setWord] = React.useState(props.word);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddWord = (e) => {
    //e.preventDefault()
    const word = {name: name, transcript: transcript, url_photo_word: url_photo_word}
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/words/add`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(word)
    }).then(res=>res.json()).then(() => {
        console.log("Word is added");
    })
    setOpen(false);
  };
  const EditWord = (e) => {
    //e.preventDefault()
    const word = {name: name, transcript: transcript, url_photo_word: url_photo_word}
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/words/${props.word.id}/edit`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(word)
    }).then(res=>res.json()).then(() => {
        console.log("Tag is added");
    })
    setOpen(false);
  };

  return (
    <div style={{display : "inline"}}>
      {props.word === "" ?
        <Fab style={{backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit"  onClick={handleClickOpen}>
          <AddIcon />
        </Fab>:
        <Fab style={{margin: "5px", backgroundColor:"#B6ADAF"}} color="secondary" aria-label="edit"  onClick={handleClickOpen}>
          <EditIcon />
        </Fab>}
      <Dialog open={open} onClose={handleClose}>
      {props.word === "" ?
        <DialogTitle>Add new tag</DialogTitle>: <DialogTitle>Edit this tag</DialogTitle>}
        <DialogContent>
            <TextField id="outlined-basic" label="name" variant="outlined" value={name} fullWidth 
                    onChange={e => setName(e.target.value)}/>
            <TextField id="outlined-basic" label="transcript" variant="outlined" value={transcript} fullWidth 
                    onChange={e => setTranscript(e.target.value)}/>
            <TextField id="outlined-basic" label="url_photo_word" variant="outlined" value={url_photo_word} fullWidth 
                    onChange={e => setUrlPhotoWord(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {props.word === "" ?
          <Button onClick={AddWord}>Add</Button>:
          <Button onClick={EditWord}>Edit</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
