"use client";
import { Thread } from "@/components/assistant-ui/thread";
// import { AssistantSidebar } from "@/components/assistant-ui/assistant-sidebar";
import { ThreadListSidebar } from "@/components/assistant-ui/threadlist-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useWebContainer } from "../hooks/useWebContainer";
import { FileItem } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/contextApi";
import { Step, StepType } from "@/lib/types";
import { FileExplorer } from "@/components/fileExplorer";
import { CodeEditor } from "@/components/codeEditor";
import { TabView } from "@/components/tabView";
import { PreviewFrame } from "@/components/previewPage";
import { WebContainer } from "@webcontainer/api";
export default function Page() {
  const { allSteps, setAllSteps } = useContext(AppContext);
  const { files, setFiles } = useContext(AppContext);
  const { selectedFile, setSelectedFile } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const webcontainer: WebContainer | undefined = useWebContainer();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const processStepsGradually = async () => {
      let originalFiles = [...files];

      for (const step of allSteps) {
        if (step.status === "pending" && step.type === StepType.CreateFile) {
          let parsedPath = step.path?.split("/") ?? [];
          let currentFileStructure = [...originalFiles];
          const finalAnswerRef = currentFileStructure;

          let currentFolder = "";
          while (parsedPath.length) {
            currentFolder = `${currentFolder}/${parsedPath[0]}`;
            const currentFolderName = parsedPath[0];
            parsedPath = parsedPath.slice(1);

            if (!parsedPath.length) {
              // final file
              const file = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!file) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "file",
                  path: currentFolder,
                  content: step.code,
                });
              } else {
                file.content = step.code;
              }
            } else {
              // folder
              const folder = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!folder) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "folder",
                  path: currentFolder,
                  children: [],
                });
              }
              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
            }
          }

          originalFiles = finalAnswerRef;

          // Update files state for streaming effect
          setFiles([...originalFiles]);

          // Wait before processing the next step
          await delay(5000); // adjust delay as needed (500ms here)
          // Mark this step as completed gradually
          setAllSteps((prev) =>
            prev.map((s) =>
              s.id === step.id ? { ...s, status: "completed" } : s
            )
          );
        }
      }
    };

    processStepsGradually();
  }, [allSteps]);

  useEffect(() => {
    if (!webcontainer) return;

    const createMountStructure = (files: FileItem[]) => {
      const mountStructure: Record<string, any> = {};
      const processFile = (file: FileItem, isRootFolder: boolean) => {
        if (file.type === "folder") {
          mountStructure[file.name] = {
            directory: file.children
              ? Object.fromEntries(
                  file.children.map((child) => [
                    child.name,
                    processFile(child, false),
                  ])
                )
              : {},
          };
        } else if (file.type === "file") {
          setSelectedFile(file);
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: { contents: file.content || "" },
            };
          } else {
            return { file: { contents: file.content || "" } };
          }
        }
        return mountStructure[file.name];
      };
      files.forEach((file) => processFile(file, true));
      return mountStructure;
    };

    const mountStructure = createMountStructure(files);
    webcontainer.mount(mountStructure);
  }, [files, webcontainer]);

  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        <ThreadListSidebar />
        <SidebarInset>
          {/* Add sidebar trigger, location can be customized */}
          <SidebarTrigger className="absolute top-4 left-4" />
          <Thread />
        </SidebarInset>
        <FileExplorer files={files} onFileSelect={setSelectedFile} />
        <div className="col-span-2 bg-black rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)]">
          <TabView activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="h-[calc(100%-4rem)]">
            {activeTab === "code" && <CodeEditor file={selectedFile} />}
            {activeTab === "preview" && webcontainer && (
              <PreviewFrame files={files} webContainer={webcontainer} />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
