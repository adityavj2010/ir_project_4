import "./Topics.css";
import * as React from "react";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const topics = [
  {
    text: "Topic 1",
    value: 0,
  },
  {
    text: "Topic 2",
    value: 1,
  },
  {
    text: "Topic 3",
    value: 2,
  },
  {
    text: "Topic 4",
    value: 3,
  },
  { text: "All", value: 5 },
];

function ControlLabel(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={props.checked} onChange={props.handleChange} name={props.text} />
      }
      label={props.text}
    />
  );
}

function Topics() {

    const handleChange = (value) => ()=>{
        if(value == 5)
        {
            //Select all
        }
        else {
            //Do shit
        }

    }

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Topics</FormLabel>
      <br/>
      <FormGroup>
        {topics.map(data=><ControlLabel key={data.value} {...data} handleChange={handleChange(data.value)} />)}
      </FormGroup>
      
    </FormControl>
  );
}

export default Topics;
