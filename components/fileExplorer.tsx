import React, { useEffect, useState } from "react";

import { FileItem, FileViewItem } from "../lib/types";

import { TreeNode, TreeView } from "./ui/tree-view";

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const [fileViewerData, setFileViewerData] = useState<FileViewItem[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const itemsWithId: FileViewItem[] = files.map((item, index) => ({
      ...item,
      id: `${index + 1}`,
      children: item.children
        ? item.children.map((child, childIndex) => ({
            ...child,
            id: `${index + 1}-${childIndex + 1}`, // child id can be hierarchical
          }))
        : undefined,
    }));

    setFileViewerData(itemsWithId);
  }, [files]);

  const handleClick = (node: TreeNode) => {
    if (node.type == "file") {
      onFileSelect(node);
    }
  };

  return (
    <div className="bg-black border border-t-[#232324]  shadow-lg  h-full overflow-auto">
      <div className="space-y-1">
        <TreeView
          data={fileViewerData}
          onNodeClick={(node) => handleClick(node)}
          defaultExpandedIds={["1"]}
        />
      </div>
    </div>
  );
}
