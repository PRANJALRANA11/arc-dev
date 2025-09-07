import { Step, StepType } from "./types";

/*
 * Parse input XML and convert it into steps.
 * Eg: Input -
 * <boltArtifact id=\"project-import\" title=\"Project Files\">
 *  <boltAction type=\"file\" filePath=\"eslint.config.js\">
 *      import js from '@eslint/js';\nimport globals from 'globals';\n
 *  </boltAction>
 * <boltAction type="shell">
 *      node index.js
 * </boltAction>
 * </boltArtifact>
 *
 * Output -
 * [{
 *      title: "Project Files",
 *      status: "Pending"
 * }, {
 *      title: "Create eslint.config.js",
 *      type: StepType.CreateFile,
 *      code: "import js from '@eslint/js';\nimport globals from 'globals';\n"
 * }, {
 *      title: "Run command",
 *      code: "node index.js",
 *      type: StepType.RunScript
 * }]
 *
 * The input can have strings in the middle they need to be ignored
 */
export function createXmlParser() {
  let buffer = "";
  let stepId = 1;
  let artifactTitleFound = false;

  return function parseChunk(chunk: string): Step[] {
    buffer += chunk;
    const steps: Step[] = [];

    // Capture artifact title once
    if (!artifactTitleFound) {
      const titleMatch = buffer.match(/title="([^"]*)"/);
      if (titleMatch) {
        artifactTitleFound = true;
        steps.push({
          id: stepId++,
          title: titleMatch[1],
          description: "",
          type: StepType.CreateFolder,
          status: "pending",
        });
      }
    }

    // Process complete boltAction blocks
    let match: RegExpExecArray | null;
    const actionRegex =
      /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?(?:\s+description="([^"]*)")?>([\s\S]*?)<\/boltAction>/;

    while ((match = actionRegex.exec(buffer)) !== null) {
      const [, type, filePath, description, content] = match;

      if (type === "file") {
        steps.push({
          id: stepId++,
          title: `Create ${filePath || "file"}`,
          description: description,
          type: StepType.CreateFile,
          status: "pending",
          code: content.trim(),
          path: filePath,
        });
      } else if (type === "shell") {
        steps.push({
          id: stepId++,
          title: `Run Command- ${content.trim()}`,
          description: description,
          type: StepType.RunScript,
          status: "pending",
          code: content.trim(),
        });
      }

      // ✂️ Remove this match from buffer so it won’t repeat
      buffer = buffer.slice(match.index + match[0].length);
    }

    return steps;
  };
}
