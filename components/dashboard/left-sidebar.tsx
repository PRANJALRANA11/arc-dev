"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, Type } from "lucide-react";

function SegmentedTabs() {
  return (
    <div className="flex p-2 gap-4">
      <Button className="h-7 px-3 bg-zinc-800 hover:bg-zinc-700 text-white">
        Layers
      </Button>
      <Button
        variant="ghost"
        className="h-7 px-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      >
        Library
      </Button>
      <Button
        variant="ghost"
        className="h-7 px-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      >
        Generate
      </Button>
    </div>
  );
}

export function LeftSidebar() {
  return (
    <div className="h-full w-full">
      <SegmentedTabs />
      <Separator className="bg-zinc-800" />
      <div className="p-3 space-y-2 text-sm">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 cursor-default">
          <ImageIcon className="h-4 w-4 text-zinc-400" />
          <span>Image</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-800 cursor-default">
          <Type className="h-4 w-4 text-zinc-400" />
          <span>Text</span>
        </div>
      </div>
    </div>
  );
}
