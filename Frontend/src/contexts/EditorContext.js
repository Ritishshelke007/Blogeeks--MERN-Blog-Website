import { createContext, useContext } from "react";

export const EditorContext = createContext({});

export const EditorContextProvider = EditorContext.Provider;

export default function useEditorContext() {
  return useContext(EditorContext);
}
