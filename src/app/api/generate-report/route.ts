import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      answers,
      domain,
      traits,
      testType,
    } = body;


    const traitSummary =
      Array.from(new Set(traits || []))
        .join(", ");


    const prompt = `

You are an advanced AI career guidance expert.

Analyze the following student career assessment results and generate a highly personalized professional career report.

ASSESSMENT TYPE:
${testType}

ASSESSMENT DOMAIN:
${domain}

DOMINANT TRAITS:
${traitSummary}

USER ANSWERS:
${JSON.stringify(answers, null, 2)}

Generate a deeply insightful and modern career guidance report.

The report should include:

1. personalitySummary
- Analyze the user's personality patterns
- Explain behavior tendencies
- Mention work style and mindset

2. strengths
- List 5–8 strongest traits or abilities
- Keep concise

3. careerMatches
- Suggest suitable career paths/domains
- Explain WHY they fit

4. growthAreas
- Mention possible weaknesses or challenges
- Keep constructive and supportive

5. roadmap
- Provide practical next steps
- Include learning suggestions
- Mention habits or skills to develop

6. workStyle
- Explain ideal environments and collaboration style

7. certifications
- Suggest useful industry-recognized certifications
- Keep practical and modern

8. exams
- Suggest relevant entrance exams, aptitude tests, or career-related evaluations
- Keep realistic to the suggested career paths

IMPORTANT:
- Be specific and insightful
- Avoid generic motivational language
- Make it feel intelligent and personalized
- Tone should feel modern, premium, and supportive
- Avoid repeating the same points

Return ONLY valid JSON in this exact format:

{
  "personalitySummary": "",
  "strengths": [],
  "careerMatches": [],
  "growthAreas": [],
  "workStyle": "",
  "certifications": [],
  "exams": [],
  "roadmap": []
}

`;


    const response = await fetch(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Authorization":
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

          temperature: 0.8,

        }),

      }

    );


    const data =
      await response.json();
      console.log(data);

    const content =
      data?.choices?.[0]?.message?.content;


    if (!content) {

      return NextResponse.json(

        {
          error:
            "No AI response received.",
        },

        {
          status: 500,
        }

      );

    }


    let parsed;

    try {

      const cleaned =
        content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

      parsed =
        JSON.parse(cleaned);

    } catch {

      return NextResponse.json(

        {
          error:
            "AI returned invalid JSON.",
          raw: content,
        },

        {
          status: 500,
        }

      );

    }


    return NextResponse.json(parsed);

  } catch (error) {

    console.log(error);

    return NextResponse.json(

      {
        error:
          "Something went wrong.",
      },

      {
        status: 500,
      }

    );

  }

}