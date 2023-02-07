import * as React from 'react';
import {useEffect, useState, useRef} from 'react'; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SchoolIcon from '@mui/icons-material/School';
import AddTag from "./AddTag"
import "../css/main.css"

export default function SimplePaper(props) {

    const getTags =() =>{
      fetch(`http://localhost:8087/${id}/tags/`)
        .then(res=>res.json())
        .then((result)=>{
          setTags(result);
        }
      )
      }
      useEffect(() => {
        getTags();
      }, []);

      
      useEffect(() => {
        const id = setInterval(() => {
        getTags();
      }, 500);
      return () => clearInterval(id);
      }, [])

      const DeleteTag = (id) => {
        fetch(`http://localhost:8087/${props.idUser}/tags/${id}/delete`,
        {
          method:"POST",
          headers: {"Content-Type": "application/json"}
        }).then(() => {
            console.log("Tag is deleted");
        })
      };

      const[tags, setTags] = React.useState([]);
      const[id, setId] = useState(props.idUser);
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
      {tags.length == 0  &&
          <Paper elevation={6} style={{margin:"10px",padding:"15px", width: "190vh", textAlign:"left"}}>
          <h1 textAlign= "center">Add new words</h1>
 
         </Paper>}
      <Paper class="paper" style={{margin:"10px",padding:"15px", width: "190vh", textAlign:"left"}}>
      {tags.map(tag=>( 
                <Paper elevation={6} style={{display: 'flex',
                flexWrap: 'nowrap', alignItems: 'flex-end', margin:"10px",padding:"5px 15px", justifyContent: "space-between", textAlign:"left"}} key={tag.id}>
                  <h1>#{tag.name}</h1>
                  <Box>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
                    <ExpandCircleDownIcon />
                  </Fab>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
                    <AddIcon />
                  </Fab>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
                    <SchoolIcon />
                  </Fab>
                  <AddTag nameTag={tag.name} idUser={id} idTag = {tag.id}/>
                  <Fab style={{margin: "5px", backgroundColor:"#76A1A7"}} color="secondary" aria-label="edit">
                    <DeleteForeverIcon onClick={() => DeleteTag(tag.id)} />
                  </Fab>
                  </Box>
               </Paper>
              ))}
      </Paper>
    </Box>
  );
}
