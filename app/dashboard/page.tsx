import { TopBar } from "@/components/dashboard/top-bar";
import { LeftSidebar } from "@/components/dashboard/left-sidebar";
import { RightSidebar } from "@/components/dashboard/right-sidebar";
import { CanvasArea } from "@/components/dashboard/canvas";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <TopBar />
      <div className="pt-12 h-[calc(100vh-48px)] grid grid-cols-[280px_1fr_320px]">
        <aside className="hidden md:block border-r border-zinc-800 bg-zinc-950">
          <LeftSidebar />
        </aside>
        <main className="bg-[#262626]">
          <CanvasArea />
        </main>
        <aside className="hidden lg:block border-l border-zinc-800 bg-zinc-950">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
