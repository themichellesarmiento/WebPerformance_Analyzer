import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { validateUrl } from "@/utils/validateUrl";

const execFileAsync = promisify(execFile);
const ANALYZER_SCRIPT = path.resolve(process.cwd(), "scripts/analyzer.mjs");

export async function POST(req: Request) {
  const url = validateUrl((await req.json()).url);

  if (!url || typeof url !== "string") {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const { stdout, stderr } = await execFileAsync(
      "node",
      ["--experimental-vm-modules", ANALYZER_SCRIPT, url],
      {
        timeout: 60_000,
        maxBuffer: 10 * 1024 * 1024, // LH JSON output can be large
      }
    );

    if (stderr) console.warn("[analyzer stderr]", stderr);

    return Response.json(JSON.parse(stdout));

  } catch (err: any) {
    // execFile rejects on non-zero exit — parse structured error from stderr
    const structured = tryParseJson(err.stderr ?? err.message);
    return Response.json(
      { error: structured?.error ?? err.message },
      { status: 500 }
    );
  }
}

const tryParseJson = (str: string) => {
  try { return JSON.parse(str); } catch { return null; }
}