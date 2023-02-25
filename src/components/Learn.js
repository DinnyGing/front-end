import * as React from 'react';
import {useEffect, useState, useRef} from 'react'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import SchoolIcon from '@mui/icons-material/School';
import Word from "./Word";
import { Slide } from 'react-slideshow-image';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'react-slideshow-image/dist/styles.css'




function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };




export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [openAnswer, setOpenAns] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(learnWord == 0)
        setResult(0);
    else
        setResult(Math.round(rightWord/learnWord*10000)/100);
    setLearnWord(0);
    setRightWord(0);
    setOpen(false);
    setOpenAns(true);
  };
  const handleCloseAns = () => {
    setOpenAns(false);
  };


  const getWords =(e) =>{
    fetch(`http://localhost:8087/${props.idUser}/tags/${props.idTag}/words/`)
      .then(res=>res.json())
      .then((result)=>{
        setWords(result);
      }
    )
    }
    useEffect(() => {
        getWords();
    }, []);
    const [words, setWords] = useState([]);
    const [learnWord, setLearnWord] = useState(0);
    const [rightWord, setRightWord] = useState(0);
    const [result, setResult] = useState(0);

    function refresh(items)
      {
        return items.sort(()=> Math.random()-0.5);
      }

  return (
    <div style={{display : "inline"}}>
        <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="learn" onClick={handleClickOpen}>
             <SchoolIcon />
        </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Learning</DialogTitle>
        <DialogContent>
        {/* {words.map((item) => (
            <Word learn={true} word={item} idUser={props.idUser} idTag={props.idTag}/>
        ))} */}
        <Slide interval={-1}>
         {words.map((item, index)=> (
            <div key={index}>
              <Word learn={true} word={item} idUser={props.idUser} idTag={props.idTag} 
              onLearnWord={setLearnWord} learnWord={learnWord} 
              onRightWord={setRightWord} rightWord={rightWord}/>
            </div>
          ))} 
        </Slide>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Finish</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAnswer}
        onClose={handleCloseAns}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Your progress
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CircularProgressWithLabel value={result} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAns}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
