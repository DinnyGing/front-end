import Appbar from "./components/Appbar"
import Tags from "./components/Tags"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AddTag from "./components/AddTag"
import "./css/main.css"

import {useEffect, useState} from 'react'; 

function App() {
  const[isLoginedIn, setLog] = useState(false);

  const [user, setUser] = useState();

  useEffect(()=>{
    console.log(isLoginedIn);
  })
  const [value,setValue] = useState();

  const refresh = ()=>{
      // it re-renders the component
     setValue({});
  }
  
  return (
    <div className="app">
      <Appbar onLog ={setLog} isLog={isLoginedIn} onUser={setUser}/>
      <Container class='container' fixed>
        <Box class ='box'>
          {user != null ? <Tags idUser={user.id}/>:
          <Paper elevation={6} style={{margin:"10px",padding:"15px", width: "200vh", textAlign:"left"}}>
          <h1>Please login in your acount</h1>
 
         </Paper>}
         {user != null && <AddTag nameTag="" idUser={user.id}/>}
        </Box>
        
      </Container>
    </div>
  );
}

export default App;
