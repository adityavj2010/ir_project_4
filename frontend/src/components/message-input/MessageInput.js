import './MessageInput.css';
import * as React from "react";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import DirectionsIcon from '@mui/icons-material/Directions';



function MessageInput() {
    return (
        <Paper
        component="form"
        sx={{ p:'5px', display: 'flex', alignItems: 'center',borderRadius: '29px'
     }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Enter text"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SendIcon />
        </IconButton>
      </Paper>
    );
  }
  
  export default MessageInput;
  