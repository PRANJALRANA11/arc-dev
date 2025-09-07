"use client";
import { FileItem, Step } from "@/lib/types";
import { createContext, Dispatch, SetStateAction } from "react";

// Define the shape of the context
interface AppContextType {
  allSteps: Step[];
  setAllSteps: Dispatch<SetStateAction<Step[]>>;
  files: FileItem[];
  setFiles: Dispatch<SetStateAction<FileItem[]>>;
  selectedFile: FileItem | null;
  setSelectedFile: Dispatch<SetStateAction<FileItem | null>>;
}

// Provide default values
export const AppContext = createContext<AppContextType>({
  allSteps: [],
  setAllSteps: () => {}, // Default no-op function,
  files: [],
  setFiles: () => {},
  selectedFile: null,
  setSelectedFile: () => {},
});
