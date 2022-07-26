import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [inputText, setInputText] = useState({
    title: "",
    content: ""
  });
  const [isExpanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prevValue) => ({ ...prevValue, [name]: value }));
  }
  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={inputText.title}
          />
        )}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={inputText.content}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={(event) => {
              props.addNote(inputText);
              event.preventDefault();
              setInputText({
                title: "",
                content: ""
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
