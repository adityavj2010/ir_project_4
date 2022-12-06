import "./Topics.css";
import * as React from "react";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const topics_array = [
  {
    text: "Politics",
    value: "Politics",
  },
  {
    text: "Environment",
    value: "Environment",
  },
  {
    text: "Technology",
    value: "Technology",
  },
  {
    text: "Healthcare",
    value: "Healthcare",
  },
  {
    text: "Education",
    value: "Education",
  },
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

function Topics(props) {
  const topicProps = props.data.topics;
  const { data, updateData } = props;

  const handleChange = (key) => (value) => {
    const { messages, topics } = data;
    console.log(key,topics[key])
    const new_topic = {}
    if(topics[key])
    {
    } else {
      new_topic[key] = true
    }

    updateData({
      ...data,
      topics:new_topic,
    });

  }

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">Topics</FormLabel>
      <br/>
      <FormGroup>
        {topics_array.map(data=><ControlLabel key={data.value} {...data} checked={Boolean(topicProps[data.value])} handleChange={handleChange(data.value)} />)}
      </FormGroup>
      
    </FormControl>
  );
}

export default Topics;
