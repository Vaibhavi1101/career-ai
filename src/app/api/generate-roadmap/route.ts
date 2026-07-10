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

    if (!profile.selected_career) {
      return NextResponse.json(
        { error: "No selected career found." },
        { status: 400 }
      );
    }

    const prompt = `
You are CareerAI.

Your task is to generate a detailed, practical, beginner-friendly career roadmap.

The roadmap must be completely personalized to the user's profile.

USER PROFILE

Overall Summary:
${profile.overall_summary}

Selected Career:
${profile.selected_career}

Career Goal:
${profile.career_goal}

Grade:
${profile.grade}

Stream:
${profile.stream}

Bio:
${profile.bio}

Career Recommendations:
${JSON.stringify(profile.career_recommendations, null, 2)}

-----------------------------------

Create a roadmap that helps the user become a successful ${profile.selected_career}.

The roadmap should:

• Begin from the user's current level.

• Progress logically from beginner to advanced.

• Include both technical and soft skills.

• Include projects whenever appropriate.

• Mention useful certifications where relevant.

• Mention internships or practical experience.

• End with portfolio/job preparation.

Return ONLY valid JSON.

Example format:

{
  "career":"Software Engineer",

  "roadmap":[

    {
      "title":"Learn HTML",

      "description":"Understand semantic HTML, forms, accessibility and page structure.",

      "duration":"1 Week",

      "resources":[
        "MDN HTML",
        "freeCodeCamp HTML"
      ],

      "completed":false
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
                "You are an expert AI Career Mentor. Return ONLY valid JSON.",
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
          error: "Failed to generate roadmap.",
        },
        {
          status: 500,
        }
      );
    }

    const completion = await response.json();

    console.log(completion);

    const content =
      completion.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "No roadmap returned.",
        },
        {
          status: 500,
        }
      );
    }

    let roadmapData;

    try {
      roadmapData = JSON.parse(content);
    } catch (err) {
      console.error(err);

      return NextResponse.json(
        {
          error: "Invalid AI response.",
        },
        {
          status: 500,
        }
      );
    }

    if (!roadmapData.roadmap) {
      return NextResponse.json(
        {
          error: "Roadmap missing.",
        },
        {
          status: 500,
        }
      );
    }

    // ARCHIVE ANY EXISTING ACTIVE JOURNEY

    await supabase
      .from("journeys")
      .update({
        status: "archived",
      })
      .eq("user_id", userId)
      .eq("status", "active");

    // SAVE NEW JOURNEY

    const { error: insertError } =
      await supabase
        .from("journeys")
        .insert({
          user_id: userId,

          career:
            roadmapData.career,

          roadmap:
            roadmapData.roadmap,

          completed_steps: 0,

          total_steps:
            roadmapData.roadmap.length,

          status: "active",
        });

    if (insertError) {
      console.error(insertError);

      return NextResponse.json(
        {
          error:
            "Failed to save roadmap.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      roadmap: roadmapData,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}