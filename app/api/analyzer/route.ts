import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    const { stdout } = await execFileAsync(
      "node",
      ["scripts/analyzer.mjs", url]
    );

    return Response.json(JSON.parse(stdout));
  } catch (err: any) {
    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

