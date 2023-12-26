import React, { useContext, useState } from "react";
import { userContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor/BlogEditor";
import PublishForm from "../components/PublishForm/PublishForm";
import { EditorContextProvider } from "../contexts/EditorContext";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

const Editor = () => {
  let {
    userAuthContext: { access_token },
  } = useContext(userContext);
  const [editorState, setEditorState] = useState("editor");
  const [blog, setBlog] = useState(blogStructure);

  return (
    <EditorContextProvider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContextProvider>
  );
};

export default Editor;
