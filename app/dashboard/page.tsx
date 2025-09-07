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

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    allSteps
      .filter(({ status }) => status === "pending")
      .map((step) => {
        updateHappened = true;
        if (step?.type === StepType.CreateFile) {
          let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
          let currentFileStructure = [...originalFiles]; // {}
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
              /// in a folder
              const folder = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!folder) {
                // create the folder
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
        }
      });

    if (updateHappened) {
      setFiles(originalFiles);

      setAllSteps((allSteps: Step[]) =>
        allSteps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        })
      );
    }
    console.log("myfiles", files);
  }, [allSteps, files]);

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};

      const processFile = (file: FileItem, isRootFolder: boolean) => {
        if (file.type === "folder") {
          // For folders, create a directory entry
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
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || "",
              },
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || "",
              },
            };
          }
        }

        return mountStructure[file.name];
      };

      // Process each top-level file/folder
      files.forEach((file) => processFile(file, true));

      return mountStructure;
    };

    const mountStructure = createMountStructure(files);

    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    console.log("cont", webcontainer);
    webcontainer?.mount(mountStructure);
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
        <div className="col-span-2 bg-gray-900 rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)]">
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
