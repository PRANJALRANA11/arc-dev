"use client";
import { Thread } from "@/components/assistant-ui/thread";
import { AssistantSidebar } from "@/components/assistant-ui/assistant-sidebar";
import { ThreadList } from "@/components/assistant-ui/thread-list";

export default function Page() {
  return (
    <div className="">
      <Thread />
      <ThreadList />
    </div>
  );
}
