import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Exit = () => {
    fetch("http://localhost:8087/exit").then(() => {
        console.log("Exit");
    })
    props.onLog(false);
    props.onUser(null);
    setOpen(false);
  };

  const Login = (e) => {
    e.preventDefault()
    const user = {login: login, password: password}
    console.log(user);
    fetch("http://localhost:8087/login",
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then(res=>res.json()).then((res) => {
      
      props.onUser(res);
        console.log("Login is succes");
    })
    props.onLog(true);
    setOpen(false);
  };
  const Register = (e) => {
    e.preventDefault()
    const user = {login: login, password: password, phone: phone, email: email}
    console.log(user);
    fetch("http://localhost:8087/register",
    {
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then((res) => {
        console.log("Register is succes");
    })
    setOpen(false);
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
        {!props.isLog?
            <Button class="button" variant="contained" onClick={handleClickOpen}>
            {props.name}
            </Button>:
            <Button class="button" variant="contained" onClick={Exit}>Exit</Button>
        }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.name}</DialogTitle>
        <DialogContent class="dialog">
            <TextField id="outlined-basic" label="login" variant="outlined" value={login} fullWidth 
                onChange={e => setLogin(e.target.value)}/>
            <TextField id="outlined-basic" label="password" variant="outlined" value={password} fullWidth 
                onChange={e=> setPassword(e.target.value)}/>
            {props.name === "Register" && <TextField id="outlined-basic" label="phone" variant="outlined" value={phone} fullWidth 
                onChange={(e)=> setPhone(e.target.value)}/>}
            {props.name === "Register" && <TextField id="outlined-basic" label="email" variant="outlined" value={email} fullWidth 
                onChange={(e)=> setEmail(e.target.value)}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {props.name === "Login" && <FormDialog name="Register"/>}
           {props.name === "Login" && <Button onClick={Login}>{props.name}</Button>}
           {props.name === "Register" && <Button onClick={Register}>{props.name}</Button>}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
