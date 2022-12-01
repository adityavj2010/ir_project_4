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
      key={props.key}
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

function Chat(props) {
  let myRef = React.useRef()
  React.useEffect(()=>{
    console.log('scrollHeight',myRef.current.scrollHeight)
    myRef.current.scrollTo({behaviour:'smooth',bottom:Number(myRef.current.scrollHeight)})
  },[props?.data?.messages,myRef])
  let messages = Array.isArray(props?.data?.messages)?props?.data?.messages :[]
  return (
    <Grid  ref={myRef} sx={{     overflowY: 'auto', mb: "20px",minHeight:'400px', maxHeight:'400px' }} spacing={1}>
      {messages.map(Message)}
    </Grid>
  );
}

export default Chat;
