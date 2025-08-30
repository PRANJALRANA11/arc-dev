"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Grid3X3, Minus, Plus, Redo2, Undo2, TypeIcon } from "lucide-react";

export function CanvasArea() {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center overflow-auto ">
      <div className="relative w-full h-full max-w-[1160px]">
        {/* Workspace center */}
        <div className="flex items-center justify-center py-10">
          {/* Artboard */}

          {/* Photo occupying the lower portion */}

          {/* MUST use the Source URL as instructed */}
          {/* <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-30%20at%205.05.53%E2%80%AFPM-gGXgi79KiLhcYGfuzqfB1X4vf7c6KH.png"
              alt="Person standing in a field with mountains behind, poster image"
              className="h-full w-full object-cover"
            /> */}

          {/* Bottom floating toolbar */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-24">
            <div className="flex items-center gap-1 rounded-lg bg-zinc-900/90 border border-zinc-800 px-2 py-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Redo2 className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="mx-1 bg-zinc-800" />

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <TypeIcon className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="mx-1 bg-zinc-800" />

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-2 text-xs text-zinc-200">36% ^</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
