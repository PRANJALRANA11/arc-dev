"use client";
import { TabView } from "./tabView";
import { FileExplorer } from "./fileExplorer";
import { CodeEditor } from "./codeEditor";
import { PreviewFrame } from "./previewPage";
import { WebContainer } from "@webcontainer/api";
import { FileItem } from "../lib/types";

interface RightSidebarProps {
  isOpen: boolean;
  files: FileItem[];
  selectedFile: FileItem | null;
  setSelectedFile: (file: FileItem) => void;
  activeTab: "code" | "preview";
  setActiveTab: (tab: "code" | "preview") => void;
  webcontainer?: WebContainer;
}

export function RightSidebar({
  isOpen,
  files,
  selectedFile,
  setSelectedFile,
  activeTab,
  setActiveTab,
  webcontainer,
}: RightSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="flex flex-1 bg-background border border-t-[#232324] rounded-lg shadow-xl overflow-hidden min-w-0">
      {/* Single TabView - positioned based on activeTab */}
      <div
        className={`${
          activeTab === "preview"
            ? "flex flex-col flex-1 min-w-0"
            : "rounded-lg shadow-inner overflow-auto flex-shrink-0"
        }`}
      >
        <TabView activeTab={activeTab} onTabChange={setActiveTab} />

        {/* File Explorer - Only show when not in preview mode */}
        {activeTab !== "preview" && (
          <FileExplorer files={files} onFileSelect={setSelectedFile} />
        )}

        {/* Preview takes full space when active */}
        {activeTab === "preview" && (
          <div className="flex-1 overflow-hidden shadow-inner min-w-0">
            <PreviewFrame files={files} webContainer={webcontainer} />
          </div>
        )}
      </div>

      {/* Editor - Only show when in code mode */}
      {activeTab === "code" && (
        <div className="flex flex-col flex-1 bg-background shadow-inner mt-16 border border-t-[#232324] min-w-0">
          <div className="flex-1 bg-gray-900 overflow-hidden shadow-inner min-w-0">
            <CodeEditor file={selectedFile} />
          </div>
        </div>
      )}
    </div>
  );
}
