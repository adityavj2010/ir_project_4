import "./App.css";
import * as React from "react";

import { Header } from "./layouts/header";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Chat from "./components/chat/Chat";
import MessageInput from "./components/message-input/MessageInput";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Topics from "./components/topics/Topics";
import { Paper } from "@mui/material";

function AppContent(props) {

  return (
    <Container
      // direction="col"
      // // disableGutters
      // component="main"
      
    >
      <Grid sx={{ pt: 8, pb: 6 }} container spacing={2}>
        <Grid item xs={8}>
          <Paper sx={{ p:'20px' }}>
            <Chat data={props.data}/>
            <MessageInput data={props.data} updateData={props.updateData}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Topics {...props} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}


const appData = {
  messages:[],
  topics: {

  }
}

function App() {

  const [data,updateData] = React.useState(appData)
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <AppContent data={data} updateData={updateData} />
      </Box>
    </React.Fragment>
  );
}

export default App;
