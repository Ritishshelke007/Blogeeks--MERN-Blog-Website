import React, { useContext, useState } from "react";
import { userContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor/BlogEditor";
import PublishForm from "../components/PublishForm/PublishForm";

const Editor = () => {
  let {
    userAuthContext: { access_token },
  } = useContext(userContext);
  const [editorState, setEditorState] = useState("editor");

  return access_token === null ? (
    <Navigate to="/signin" />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export default Editor;
