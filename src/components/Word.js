import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import AddWord from "./AddWord";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';



export default function MediaCard(props) {
  const DeleteWord = (id) => {
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/words/${id}/delete`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"}
    }).then(() => {
        console.log("Word is deleted");
    })
  };
  const WriteWord = (id) => {
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/words/${id}/learn`,
    {
      method:"POST",
      headers: {"Content-Type": "application/json"}
    }).then(() => {
        console.log("Word is learning");
        props.onLearnWord(props.learnWord + 1);
        if(write === props.word.name){
          setColor("success")
          props.onRightWord(props.rightWord + 1);
        }
        else
          setColor("error")
        console.log(props.learnWord + " - " + props.rightWord);
    })
  };
  const [write, setWrite] = React.useState("")
  const [color, setColor] = React.useState("secondary")
  return (
    <Card sx={{ minWidth: 215, boxShadow: "2px 2px 5px 5px #B6ADAF", margin: "15px 0px" }}>
      {props.learn ? <CardMedia
        sx={{ height: 450, width: 450}}
        image={props.word.url_photo_word}
      /> : <CardMedia
      sx={{ height: 215, width: 215}}
      image={props.word.url_photo_word}
      title={props.word.name}
    />}{!props.learn &&
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.word.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.word.transcript}
        </Typography>
      </CardContent>}
      <CardActions>
        {!props.learn ? <AddWord word={props.word} idUser={props.idUser} idTag={props.idTag} />
        :
        <TextField style={{width:"30vw"}} label="Input right word" color={color} variant="outlined" 
        value={write} onChange={e => setWrite(e.target.value)} focused/> }

        {!props.learn ?<Fab style={{margin: "5px", backgroundColor:"#B6ADAF"}} color="secondary" aria-label="delete" 
        onClick={() => DeleteWord(props.word.id)}>
          <DeleteForeverIcon />
        </Fab>:<Button style={{margin: "10px", backgroundColor: "#107980"}} variant="contained" endIcon={<SendIcon />}
        onClick={() => WriteWord(props.word.id)}>
        Check
      </Button>}
      </CardActions>
    </Card>
  );
}
