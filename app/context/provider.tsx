"use client";
import { useState, FC, ReactNode } from "react";
import { AppContext } from "./contextApi";
import { FileItem, Step } from "@/lib/types";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [allSteps, setAllSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [url, setUrl] = useState<string>("");
  const [openPreviewFull, setOpenPreviewFull] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        allSteps,
        setAllSteps,
        files,
        setFiles,
        selectedFile,
        setSelectedFile,
        url,
        setUrl,
        setOpenPreviewFull,
        openPreviewFull,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
