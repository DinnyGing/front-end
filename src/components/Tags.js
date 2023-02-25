import * as React from 'react';
import {useEffect, useState, useRef} from 'react'; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SchoolIcon from '@mui/icons-material/School';
import AddTag from "./AddTag";
import Words from "./Words";
import AddWord from "./AddWord";
import Learn from "./Learn";
import "../css/main.css"

export default function SimplePaper(props) {

    const getTags =() =>{
      fetch(`http://localhost:8087/${id}/tags/`)
        .then(res=>res.json())
        .then((result)=>{
          props.onTags(result);
        }
      )
      }
      useEffect(() => {
        getTags();
      }, []);

      
      // useEffect(() => {
      //   const id = setInterval(() => {
      //   getTags();
      // }, 500);
      // return () => clearInterval(id);
      // }, [])
      
      React.useEffect(() => {    
        // Изменяем заголовок html-страницы   
        getTags();
      },
      [props.tags]); 

      const DeleteTag = (id) => {
        fetch(`http://localhost:8087/${props.idUser}/tags/${id}/delete`,
        {
          method:"POST",
          headers: {"Content-Type": "application/json"}
        }).then(() => {
            console.log("Tag is deleted");
            getTags();
        })
      };


      function refresh(items)
      {
        return items.sort(()=> Math.random()-0.5);
      }

      const items = [254, 45, 212, 365, 2543];

      // const[tags, setTags] = React.useState(props.tags);
      const[id, setId] = useState(props.idUser);
      const[id_tag, setIdTag] = useState(-1);
      const[name_tag, setNameTag] = useState("");
      const[getWords, setGetWords] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        weight: "100vh",
        '& > :not(style)': {
          m: 1,
          height: 70,
        },
      }}
    >
      {props.tags.length === 0  ?
          <Paper elevation={6} style={{margin:"10px",padding:"15px", width: "80vw", textAlign:"left"}}>
          <h1 textAlign= "center">Add new words</h1>
 
         </Paper> :
      <Box>
      <Paper className="Paper" style={{margin:"10px",padding:"15px", width: "80vw", textAlign:"left"}}>
      {props.tags.map(tag=>( 
                <Paper elevation={6} style={{display: 'flex',
                flexWrap: 'nowrap', alignItems: 'flex-end', margin:"10px",padding:"5px 15px", justifyContent: "space-between", textAlign:"left"}} key={tag.id}>
                  <h1>#{tag.name}</h1>
                  <Box>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="get"  onClick={()=> {
                    setIdTag(tag.id);
                    setNameTag(tag.name)
                    }} >
                    <ExpandCircleDownIcon/>
                  </Fab>
                  <AddWord word="" idUser={id} idTag = {tag.id}/>
                  <Learn idUser={id} idTag = {tag.id} />
                  <AddTag nameTag={tag.name} idUser={id} idTag = {tag.id} getTags={getTags}/>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="delete" onClick={() => DeleteTag(tag.id)}>
                    <DeleteForeverIcon />
                  </Fab>
                  </Box>
               </Paper>
              ))}
      </Paper>
      <Paper class="paper" style={{margin:"10px",padding:"15px", width: "190wh", textAlign:"left"}}>
      {id_tag != -1 && <Words id_user={props.idUser} id_tag={id_tag} name_tag={name_tag}/>}
      </Paper>
      </Box>
}
    </Box>
  );
}
