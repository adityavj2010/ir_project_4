import "./MessageInput.css";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import DirectionsIcon from "@mui/icons-material/Directions";

function makeQuery(query) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    query: query,
    topic: "topic",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://127.0.0.1:5001/api/query", requestOptions)
    
}

function MessageInput(props) {
  const { data, updateData } = props;
  const [text, updateText] = React.useState("");
  const sendMessage = () => {
    if (text !== "") {
      const newMessage = {
        self: true,
        text: text,
        key: uuidv4(),
      };
      const keys = Object.keys(data.topics);
    
      for(const key of keys)
      {
        console.log(key)
      }
      makeQuery(text).then(response => response.json()).then(response => {
        
        const serverMessage = {
          self: false,
          text: response['message'],
          key: uuidv4(),
        };
  
        const { messages, topics } = data;

        messages.push(serverMessage);
        updateData({
          ...data,
          messages: [...messages],
        });
          
      }) 

      const { messages, topics } = data;

      messages.push(newMessage);
      updateData({
        ...data,
        messages: [...messages],
      });
    }

    updateText("");
  };

  const handleChange = (e) => {
    updateText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "5px",
        display: "flex",
        alignItems: "center",
        borderRadius: "29px",
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Enter text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        onClick={sendMessage}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default MessageInput;
