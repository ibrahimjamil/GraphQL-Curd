import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { CREATE_USER_MUTATION} from "./GraphQL/Mutations";
import { useMutation } from "@apollo/client";


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 48,
    padding: '0 30px',
  },
});

function Form({style,doFetch}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const addUser = async () => {
    await createUser({
      variables: {
        name: name,
        email: email,
      },
    });
    setName('')
    setEmail('')
    doFetch(true)
  }

  return (
    <div style={style}>
      <h1 style={{
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        textAlign:"center",
        color:"#FE6B8B"
      }}>
        Add User
      </h1>
      <TextField 
        style={{
          marginBottom:"10px",
          textJustify:"auto",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        label="Name" 
        variant="outlined" 
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField 
        label="email"
        style={{
          marginBottom:"10px",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }} 
        variant="outlined" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        classes={{
            root:classes.root
          }}
        style={{
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        onClick={()=>addUser()}
      >
        Add User
      </Button>
    </div>
  );
}
export default Form;