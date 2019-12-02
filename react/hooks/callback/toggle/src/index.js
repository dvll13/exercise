import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { useToggle } from "./useToggle";

const EditableItem = ({ label, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  // const [editorVisible, setEditorVisible] = useState(false);
  // const toggleEditor = () => setEditorVisible(!editorVisible);
  const [editorVisible, toggleEditorVisible] = useToggle(false);

  return (
    <main>
      {editorVisible ? (
        <label>
          {label}
          <input
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </label>
      ) : (
        <span>{value}</span>
      )}

      <button onClick={toggleEditorVisible}>
        {editorVisible ? "Done" : "Edit"}
      </button>
    </main>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<EditableItem />, rootElement);
