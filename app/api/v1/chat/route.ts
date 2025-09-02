import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { getSystemPrompt } from "../../lib/prompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 300;
export const SYS_PROMPT = getSystemPrompt();

console.log("hy", SYS_PROMPT);

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: SYS_PROMPT,
    messages: convertToModelMessages(messages),
  });
  console.log("res", result);
  return result.toUIMessageStreamResponse();
}
