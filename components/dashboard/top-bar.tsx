"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-12 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      <div className="ml-10 flex h-full max-w-[1400px] items-center justify-between px-3">
        logo
        <Button className="h-8 px-3 bg-sky-600 hover:bg-sky-500 text-white">
          Export <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
