import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { answers, domain } = body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

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

    const result =
      await model.generateContent(prompt);

    const response =
      await result.response.text();
      console.log(response);

    return Response.json({
      result: response,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Failed to generate report",
      },
      {
        status: 500,
      }
    );

  }

}