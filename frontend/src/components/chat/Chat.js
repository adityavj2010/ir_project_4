import "./Chat.css";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const common = {
    border:1,
    wordBreak: "break-word",
}

const selfStyle = {
    ...common
}

const otherStyle = {
    ...common
}

function Message(props) {
  const selfText = props.self;
  return (
    <Grid
      container
      padding={1}
      justifyContent={selfText ? "flex-end" : "flex-start"}
      xs={12}
    >
      <Grid sx={selfText?selfStyle:otherStyle} item xs={8}>
        {props.text}
      </Grid>
    </Grid>
  );
}

function Chat() {
  const messages = [
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
    { self: true, text: "What does asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdMJ say?" },
    { self: false, text: "HEHEEE" },
  ];
  return (
    <Grid   sx={{ mb: "20px",minHeight:'400px', maxHeight:'400px' }} spacing={1}>
      {messages.map(Message)}
    </Grid>
  );
}

export default Chat;
