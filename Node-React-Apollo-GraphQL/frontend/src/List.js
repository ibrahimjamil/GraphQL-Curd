import React,{useState,useEffect} from 'react'
import Tooltip from '@mui/material/Tooltip';
import { Button, Dialog, Grid } from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import { useQuery } from "@apollo/client";
import {UPDATE_USER_MUTATION,DELETE_USER_MUTATION} from './GraphQL/Mutations'
import { LOAD_USERS } from './GraphQL/Queries';
import { useMutation } from "@apollo/client";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    "&:hover":{
      cursor:"pointer"
    }
  },
  dialog:{
    minHeight: "40vh",
    padding: 10,
  },
  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 48,
    padding: '0 30px',
  }
});

const List = ({style,fetching,updateFetching}) => {
    const classes = useStyles();
    const { data , refetch} = useQuery(LOAD_USERS);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);
    const [editModel,setEditModelOpen] = useState(false)
    const [userIndex,setUserIndex] = useState(null)
    const [alert,setAlert] = useState(false)
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (data) {
          setUsers(data.getAllUsers);
        }
      }, [data]);
    
    useEffect(()=>{
      refetch()
      updateFetching(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fetching])

    const updUser = async () => {
      await updateUser({
        variables: {
          id: userIndex,
          name: name,
          email: email,
        },
      });
      setName('')
      setEmail('')
      refetch()
      setEditModelOpen(false)
    }

    const deleteUsr = async (id) =>{
      await deleteUser({
        variables: {
          id:id,
        },
      });
      refetch()
      setAlert(true)
    }
    return (
        <div style={style}>
          <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
              }}
            >
              <h1 
                style={{
                  color:"#FE6B8B"
                }}>
                Read list of users detail 
              </h1>
              {!!users && users.map((val,index) => {
                  return (
                    <Grid direction="row" container xs={12}>
                      <Grid item xs={10}>
                        <h4 style={{textAlign:"center",position:"relative"}}> 
                          <span 
                            style={{
                              color:"#FE6B8B"
                            }}>
                            <FiberManualRecordIcon/> &nbsp;   
                          </span> 
                            id :{val._id} name: {val.name} and email: {val.email}
                        </h4>
                      </Grid>
                      <Grid container item direction="row" xs={2}>
                            <div style={{margin:"auto 10px",display:"flex",flexDirection:"row"}}>
                              <Tooltip title="Update">
                                <div className={classes.root} onClick={()=>{
                                      setUserIndex(val._id)
                                      setEditModelOpen(true)
                                    }}>
                                    <EditOutlinedIcon/>
                                </div>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <div className={classes.root} onClick={()=>deleteUsr(val._id)}>
                                    <DeleteOutlineOutlinedIcon/>
                                </div>
                              </Tooltip>
                            </div>
                       </Grid>
                    </Grid>
                  )
              })}
          </div>
          {!!editModel && (
            <Grid container direction={"column"} alignItems={"center"}>
              <Dialog
                  classes={{ paper: classes.dialog }}
                  open={editModel}
                  onClose={()=>setEditModelOpen(false)}
                  maxWidth={'md'}
                  fullWidth={true} 
              >
                  <h2 style={{
                    width:"50%",
                    marginLeft:"auto",
                    marginRight:"auto",
                    textAlign:"center",
                    color:"#FE6B8B"
                  }}>
                    Update User {userIndex}
                  </h2>
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
                    onChange={(e)=>setName(e.target.value)}
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
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <div 
                  style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center"
                  }}
                >
                  <Tooltip title="Close">
                    <Button
                      classes={{
                          root:classes.button
                        }}
                      style={{
                        width:"25%",
                        marginRight:"5px"
                      }}
                      onClick={()=>setEditModelOpen(false)}
                    >
                      Close
                    </Button>
                  </Tooltip>
                  <Tooltip title="Update">
                    <Button
                      classes={{
                          root:classes.button
                        }}
                      style={{
                        width:"25%",
                      }}
                      onClick={updUser}
                    >
                      Update User
                    </Button>
                  </Tooltip>
                </div>
              </Dialog>
            </Grid>
          )}
          {!!alert && (
            <Snackbar open={alert} autoHideDuration={2000} onClose={()=>setAlert(false)}>
              <Alert severity="success" sx={{ width: '100%' }}>
                User record has been deleted
              </Alert>
            </Snackbar>
          )}
        </div>
    )
}

export default List
