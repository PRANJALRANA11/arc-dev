"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  RotateCcw,
  RotateCw,
  Rotate3D,
  FlipHorizontal2,
  FlipVertical2,
  X,
} from "lucide-react";

function FieldPair({ labels }: { labels: [string, string] }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-[18px_1fr] items-center gap-1">
        <span className="text-xs text-zinc-400">{labels[0]}</span>
        <Input
          className="h-8 bg-zinc-900 border-zinc-800 text-white"
          placeholder="0"
        />
      </div>
      <div className="grid grid-cols-[18px_1fr] items-center gap-1">
        <span className="text-xs text-zinc-400">{labels[1]}</span>
        <Input
          className="h-8 bg-zinc-900 border-zinc-800 text-white"
          placeholder="0"
        />
      </div>
    </div>
  );
}

function NumberWithClear({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-xs text-zinc-400 w-16">{label}</Label>
      <Input
        className="h-8 bg-zinc-900 border-zinc-800 text-white"
        placeholder="0"
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

function AddRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Label className="text-xs text-zinc-400 w-16">{label}</Label>
      <Button
        variant="secondary"
        className="h-8 bg-zinc-800 hover:bg-zinc-700 text-white px-3"
      >
        Add...
      </Button>
      <div className="h-4 w-4 rounded-[2px] border border-zinc-700 bg-white"></div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function RightSidebar() {
  return (
    <div className="h-full w-full overflow-auto">
      <div className="p-4 space-y-6">
        {/* Layer */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-200">Layer</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Position</span>
              <FieldPair labels={["X", "Y"]} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Size</span>
              <FieldPair labels={["W", "H"]} />
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        {/* Styles */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-200">Styles</h3>

          <NumberWithClear label="Radius" />
          <div className="flex items-center gap-2">
            <Label className="text-xs text-zinc-400 w-16">Border</Label>
            <Input
              className="h-8 bg-zinc-900 border-zinc-800 text-white"
              placeholder="0"
            />
            <div className="h-4 w-4 rounded-[2px] border border-zinc-700 bg-white"></div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AddRow label="Shadow" />
          <NumberWithClear label="Padding" />
          <AddRow label="Fill" />
        </div>

        <Separator className="bg-zinc-800" />

        {/* Transforms */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-200">Transforms</h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-zinc-400 w-16">Rotate</Label>
              <Input
                className="h-8 bg-zinc-900 border-zinc-800 text-white w-20"
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800"
              >
                <Rotate3D className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-xs text-zinc-400 w-16">Flip</Label>
              <Button
                variant="secondary"
                className="h-8 px-2 bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <FlipHorizontal2 className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="h-8 px-2 bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <FlipVertical2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
