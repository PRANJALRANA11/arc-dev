import React from "react";
import Editor, { loader } from "@monaco-editor/react";
import { FileItem } from "../lib/types";

interface CodeEditorProps {
  file: FileItem | null;
}

const customTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#000000", // Full black background
  },
};

export function CodeEditor({ file }: CodeEditorProps) {
  React.useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("full-black", customTheme);
    });
  }, []);

  if (!file) {
    return (
      <div className="h-full flex items-center  bg-background justify-center text-gray-400 ">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="full-black"
      value={file.content || ""}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        scrollBeyondLastLine: false,
      }}
    />
  );
}
