"use client";

import type { ReactNode } from "react";
import { AssistantRuntimeProvider, AssistantCloud } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

const cloud = new AssistantCloud({
  baseUrl: process.env.NEXT_PUBLIC_ASSISTANT_BASE_URL!,
  anonymous: true, // Creates browser-session based user ID
});

export function MyRuntimeProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const runtime = useChatRuntime({
    // @ts-ignore
    api: "/api/v1/chat",
    cloud,

    // All standard useChat options are supported
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
