import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { answers, domain } =
      await req.json();

    const prompt = `

You are an AI career counselor.

Analyze the student's assessment answers.

Assessment Type:
${domain}

Answers:
${JSON.stringify(answers)}

Generate:

1. Career Summary
2. Top 3 Career Matches
3. Key Strengths
4. Recommended Certifications
5. Suggested Exams
6. Personalized Roadmap

IMPORTANT:
- Return ONLY raw JSON
- Do NOT use markdown
- Do NOT wrap in \`\`\`
- Do NOT explain anything
- Do NOT add extra text

Return this exact structure:

{
  "summary": "string",
  "careers": [
    "career1",
    "career2",
    "career3"
  ],
  "strengths": [
    "strength1",
    "strength2"
  ],
  "certifications": [
    "cert1",
    "cert2"
  ],
  "exams": [
    "exam1",
    "exam2"
  ],
  "roadmap": [
    "step1",
    "step2",
    "step3"
  ]
}

`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          model:
            "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

        }),

      }
    );

    const data =
      await response.json();

    console.log(data);

    const result =
      data.choices?.[0]?.message?.content;

    return NextResponse.json({
      result,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate report",
      },
      {
        status: 500,
      }
    );

  }

}