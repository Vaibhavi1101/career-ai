import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { summaries } = await req.json();

  const prompt = `
You are CareerAI.

Below are summaries from multiple assessments.

Generate a concise Overall Career Profile.

Requirements:
- 4-5 sentences
- Mention recurring strengths
- Mention recurring personality patterns
- Mention suitable career directions
- Keep it professional and encouraging

Assessment Summaries:

${summaries.join("\n\n")}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  return NextResponse.json({
    summary:
      data.choices?.[0]?.message?.content || "",
  });
}