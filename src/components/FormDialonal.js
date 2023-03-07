import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

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
  // var regexpEmail = new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
  // var regexpPhone = new RegExp("^+380^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$[0-9]{9}$");

  const Register = (e) => {
    e.preventDefault()
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password))){
      setColorPass("error")
      setColorCheckPass("primary")
      setColorPhone("primary")
      setColorEmail("primary")
      setError("Password must consist 8 symbols, where are at least 1 uppercase letter and 1 lowercase letter")
    }
    else if(password !== checkPassword){
      setColorPass("primary")
      setColorCheckPass("error")
      setColorPhone("primary")
      setColorEmail("primary")
      setError("Passwords aren't identety")
    }
    else if(!(/^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/.test(phone))){
      setColorPass("primary")
      setColorCheckPass("primary")
      setColorPhone("error")
      setColorEmail("primary")
      setError("Phone isn't like +380 XX XXX XX XX or +380-XX-XXX-XX-XX")
    }
    else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
      setColorPass("primary")
      setColorCheckPass("primary")
      setColorPhone("primary")
      setColorEmail("error")
      setError("Email isn't like ...@gmail.com")
    }
    else{
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
    }
    
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [phone, setPhone] = useState("+380");
  const [email, setEmail] = useState("");
  const [colorPass, setColorPass] = useState("primary")
  const [colorCheckPass, setColorCheckPass] = useState("primary")
  const [colorEmail, setColorEmail] = useState("primary")
  const [colorPhone, setColorPhone] = useState("primary")
  const [error, setError] = useState()

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
            <TextField id="outlined-basic" label="login" variant="outlined"  value={login} fullWidth 
                onChange={e => setLogin(e.target.value)}/>
            <TextField id="outlined-basic" label="password" type="password" variant="outlined" value={password} fullWidth
              color={colorPass}
                onChange={e=> setPassword(e.target.value)}/>
            {props.name === "Register" && <TextField id="outlined-basic" label="check password" type="password" variant="outlined" 
              color={colorCheckPass} value={checkPassword} fullWidth 
                onChange={e=> setCheckPassword(e.target.value)}/>}
            {props.name === "Register" && <TextField id="outlined-basic" label="phone" variant="outlined" value={phone} fullWidth 
                color={colorPhone} onChange={(e)=> setPhone(e.target.value)}/>}
            {props.name === "Register" && <TextField id="outlined-basic" label="email" variant="outlined" value={email} fullWidth 
                color={colorEmail} onChange={(e)=> setEmail(e.target.value)}/>}
            <Typography variant="subtitle1" gutterBottom color="red">
              {error}
            </Typography>
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
