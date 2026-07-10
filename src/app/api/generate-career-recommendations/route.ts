import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // FETCH USER PROFILE

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profile not found." },
        { status: 404 }
      );
    }

    // FETCH ALL REPORTS

    const { data: reports, error: reportsError } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", userId);

    if (reportsError || !reports) {
      return NextResponse.json(
        { error: "No reports found." },
        { status: 404 }
      );
    }

    const frequency: Record<string, number> = {};

    const recommendedBy: Record<string, string[]> = {};

    const strengths = new Set<string>();
    const growthAreas = new Set<string>();
    const certifications = new Set<string>();
    const exams = new Set<string>();

    const workStyles: string[] = [];
    const personalitySummaries: string[] = [];

    for (const report of reports) {
      const data = report.report;

      if (!data) continue;

      const assessmentName =
        report.assessment_name ||
        report.title ||
        "Assessment";

      // CAREER MATCHES

      if (
        Array.isArray(data.careerMatches)
      ) {
        for (const career of data.careerMatches) {
          frequency[career] =
            (frequency[career] || 0) + 1;

          if (!recommendedBy[career]) {
            recommendedBy[career] = [];
          }

          if (
            !recommendedBy[
              career
            ].includes(assessmentName)
          ) {
            recommendedBy[
              career
            ].push(assessmentName);
          }
        }
      }

      // STRENGTHS

      if (
        Array.isArray(data.strengths)
      ) {
        data.strengths.forEach((item: string) =>
          strengths.add(item)
        );
      }

      // GROWTH AREAS

      if (
        Array.isArray(data.growthAreas)
      ) {
        data.growthAreas.forEach((item: string) =>
          growthAreas.add(item)
        );
      }

      // CERTIFICATIONS

      if (
        Array.isArray(data.certifications)
      ) {
        data.certifications.forEach((item: string) =>
          certifications.add(item)
        );
      }

      // EXAMS

      if (
        Array.isArray(data.exams)
      ) {
        data.exams.forEach((item: string) =>
          exams.add(item)
        );
      }

      // WORK STYLE

      if (data.workStyle) {
        workStyles.push(data.workStyle);
      }

      // PERSONALITY SUMMARY

      if (
        data.personalitySummary
      ) {
        personalitySummaries.push(
          data.personalitySummary
        );
      }
    }

    // SORT CAREERS

    const sortedCareers =
      Object.entries(frequency)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .map(([career, count]) => ({
          career,
          frequency: count,
          recommendedBy:
            recommendedBy[career],
        }));

    // BUILD AI PROMPT

    const prompt = `
You are CareerAI.

You are given a user's complete assessment history.

Your job is to rank ONLY the careers provided.

DO NOT invent new careers.

The career frequency represents how many different assessments recommended each career.

Use the user's profile, strengths, work style, growth areas and overall summary to intelligently rank these careers.

User Profile

Overall Summary:
${profile.overall_summary}

Grade:
${profile.grade}

Stream:
${profile.stream}

Career Goal:
${profile.career_goal}

Bio:
${profile.bio}

Strengths:
${[
  ...strengths,
].join(", ")}

Growth Areas:
${[
  ...growthAreas,
].join(", ")}

Work Style:
${workStyles.join("\n")}

Personality Summaries:
${personalitySummaries.join("\n")}

Career Frequencies:

${JSON.stringify(
      sortedCareers,
      null,
      2
    )}

Return ONLY valid JSON.

Format:

{
  "recommendations":[
    {
      "career":"Software Engineer",
      "confidence":96,
      "recommendedBy":["Interest","Skills"],
      "reason":"..."
    }
  ]
}
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

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are an expert AI Career Counselor. Always return valid JSON only.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      console.error(error);

      return NextResponse.json(
        {
          error: "Failed to generate recommendations.",
        },
        {
          status: 500,
        }
      );
    }

    const completion =
      await response.json();

    console.log(completion);

    const content =
      completion.choices?.[0]?.message
        ?.content;

    if (!content) {
      return NextResponse.json(
        {
          error:
            "No recommendations returned.",
        },
        {
          status: 500,
        }
      );
    }

    let recommendations;

    try {
      recommendations =
        JSON.parse(content);
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        {
          error:
            "Invalid AI response.",
        },
        {
          status: 500,
        }
      );
    }

    if (
      !recommendations.recommendations
    ) {
      return NextResponse.json(
        {
          error:
            "Recommendations missing.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      recommendations:
        recommendations.recommendations,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}