import type { Recommendation } from "@/types/report";

type ActionPlanRequest = {
  url: string;
  score: number;
  recommendations: Recommendation[];
};

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  const { url, score, recommendations }: ActionPlanRequest = await req.json();

  if (!recommendations?.length) {
    return Response.json({ error: "No recommendations provided" }, { status: 400 });
  }

  const auditList = recommendations
    .map((r) => `- ${r.title}${r.displayValue ? ` (${r.displayValue})` : ""}`)
    .join("\n");

  const prompt = `You are a web performance expert specialising in Next.js.

Website: ${url}
Performance score: ${score}/100

Failed audits:
${auditList}

Return a prioritised fix plan as a JSON array. Return ONLY raw JSON, no markdown, no backticks, no explanation.

Each item must have exactly these fields:
- title: string
- effort: "low" | "medium" | "high"
- description: string — specific and actionable, mention Next.js APIs where relevant (next/image, next/font, Script strategy, etc.)
- estimatedSaving: string — e.g. "~1.2 s on LCP"

Order by highest impact first, then lowest effort. Maximum 5 items.`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY!
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,      // low temp = more consistent structured output
        maxOutputTokens: 1000,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return Response.json({ error: err }, { status: 500 });
  }

  const data = await response.json();

  // Gemini nests the text here
  const text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) {
    return Response.json({ error: "Empty response from Gemini" }, { status: 500 });
  }

  try {
    // strip markdown fences if Gemini adds them despite instructions
    const clean = text.replace(/```json|```/g, "").trim();
    const plan = JSON.parse(clean);
    return Response.json({ plan });
  } catch {
    return Response.json({ error: "Failed to parse AI response", raw: text }, { status: 500 });
  }
}