import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";
import { getSystemPrompt } from "../lib/prompt";

export const maxDuration = 300;
export const SYS_PROMPT = getSystemPrompt();

// Simple in-memory cache (will reset when server restarts)
// let cachedResponse: ReturnType<typeof streamText> | null = null;

export async function POST(req: Request) {
  // if (cachedResponse) {
  //   console.log("Returning cached response");
  //   return cachedResponse.toUIMessageStreamResponse();
  // }

  const { messages, system, tools } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system: SYS_PROMPT,
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
    onChunk({ chunk }) {
      if (chunk.type === "text-delta") {
        if (chunk.text.includes("<boltArtifact")) {
          chunk.text = "```js\n" + chunk.text;
        } else if (chunk.text.includes("</boltArtifact>")) {
          chunk.text = chunk.text + "\n```";
        }
      }
    },
  });

  // cachedResponse = result;
  console.log("Caching AI response for future calls");

  return result.toUIMessageStreamResponse();
}
