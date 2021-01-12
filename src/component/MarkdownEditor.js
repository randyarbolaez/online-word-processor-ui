import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import ENV from "../env";

const MarkdownEditor = ({ socket }) => {
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    socket.on("new message", (data) => {
      setInputData(data.message);
    });
  });

  const onUserTyping = (e) => {
    let id = window.location.href.split("/")[3];
    socket.emit("new message", { message: e, id });
  };
  return (
    <Editor
      value={inputData}
      init={{
        height: "100vh",
        menubar: true,
        width: "85vw",
        resize: false,
      }}
      apiKey={ENV.tinyMCEKey}
      onEditorChange={(e) => onUserTyping(e)}
    />
  );
};

export default MarkdownEditor;
