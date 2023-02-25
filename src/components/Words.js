import * as React from 'react';
import {useEffect, useState, useRef} from 'react'; 
import Word from "./Word";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../css/main.css";


export default function TitlebarImageList(props) {
    const getWords =(e) =>{
        fetch(`http://localhost:8087/${id_user}/tags/${id_tag}/words/`)
          .then(res=>res.json())
          .then((result)=>{
            setWords(result);
          }
        )
        }
        useEffect(() => {
          getWords();
        }, []);
        useEffect(() => {
            setIdTag(props.id_tag);
            getWords();
          });

    const [words, setWords] = useState([]);
    const[id_tag, setIdTag] = useState("");    
    const[id_user, setIdUser] = useState(props.id_user);

  return (
    <Box
      sx={{display: "flex", flexWrap: "wrap" , justifyContent: "space-around", backgroundColor: "white",
      }}
    >
      <Typography class="t"  gutterBottom variant="h1">
        Words - tag {props.name_tag} 
        </Typography>
      {words.map((item) => (

        <Word learn={false} word={item} idUser={id_user} idTag={id_tag} />
      ))}
    </Box>
  );
}
