"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";

type Recommendation = {
  career: string;
  confidence: number;
  recommendedBy: string[];
  reason: string;
};

export default function CareerExplorerPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] =
    useState<any>(null);

  const [
    recommendations,
    setRecommendations,
  ] = useState<Recommendation[]>([]);

  const [
    selectedCareer,
    setSelectedCareer,
  ] = useState<Recommendation | null>(
    null
  );

  const [showModal, setShowModal] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);

      setRecommendations(
        data.career_recommendations || []
      );
    }

    setLoading(false);
  }

  async function chooseCareer() {
    if (!selectedCareer) return;

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
        .from("profiles")
        .update({
            selected_career:
            selectedCareer.career,
        })
        .eq("id", user.id);

        const response = await fetch(
        "/api/generate-roadmap",
        {
            method: "POST",

            headers: {
            "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
            userId: user.id,
            }),
        }
        );

        if (!response.ok) {
        console.error(
            "Failed to generate roadmap."
        );
        return;
        }

        router.push(
        "/dashboard/career-journey"
        );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-zinc-500">
          Loading career recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* PAGE TITLE */}

      <div>

        <h1 className="text-4xl font-bold text-zinc-900">
          Career Explorer
        </h1>

        <p className="text-zinc-500 mt-3">
          Compare all AI-generated career
          recommendations before choosing
          your career journey.
        </p>

      </div>

      {/* OVERALL PROFILE */}

      <div className="mt-8 bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">

        <div className="flex items-center gap-3">

          <Sparkles className="w-6 h-6 text-indigo-600" />

          <h2 className="text-xl font-semibold">
            Overall Career Profile
          </h2>

        </div>

        <p className="text-zinc-600 leading-8 mt-5 whitespace-pre-wrap">

          {profile?.overall_summary}

        </p>

      </div>

      {/* EMPTY STATE */}

      {recommendations.length === 0 && (

        <div className="mt-10 bg-white rounded-3xl border border-zinc-200 p-10 text-center">

          <Briefcase className="mx-auto w-12 h-12 text-zinc-400" />

          <h2 className="text-2xl font-semibold mt-5">

            No Career Recommendations Yet

          </h2>

          <p className="text-zinc-500 mt-3">

            Complete more assessments to
            unlock personalized career
            recommendations.

          </p>

          <button
            onClick={() =>
              router.push(
                "/dashboard/assessments"
              )
            }
            className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >

            Go To Assessments

          </button>

        </div>

      )}

      {/* RECOMMENDATIONS */}

      {recommendations.length > 0 && (

        <div className="grid lg:grid-cols-2 gap-7 mt-10">

          {recommendations.map(
            (career, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-7"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-zinc-900">

                      {career.career}

                    </h2>

                    <p className="text-zinc-500 mt-2">

                      AI Career Match

                    </p>

                  </div>

                  <Briefcase className="w-8 h-8 text-indigo-600" />

                </div>

                {/* CONFIDENCE */}

                <div className="mt-8">

                  <div className="flex justify-between mb-3">

                    <span className="font-medium">

                      Confidence

                    </span>

                    <span className="font-semibold text-indigo-600">

                      {career.confidence}%

                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-zinc-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                      style={{
                        width: `${career.confidence}%`,
                      }}
                    />

                  </div>

                </div>

                {/* RECOMMENDED BY */}

                <div className="mt-8">

                  <h3 className="font-semibold">

                    Recommended By

                  </h3>

                  <div className="flex flex-wrap gap-3 mt-4">

                    {career.recommendedBy.map(
                      (item) => (

                        <span
                          key={item}
                          className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium"
                        >

                          {item}

                        </span>

                      )
                    )}

                  </div>

                </div>

                {/* REASON */}

                <div className="mt-8">

                  <h3 className="font-semibold">

                    Why this career?

                  </h3>

                  <p className="text-zinc-600 leading-7 mt-3">

                    {career.reason}

                  </p>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() => {
                    setSelectedCareer(
                      career
                    );

                    setShowModal(true);
                  }}
                  className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                >

                  Choose Career

                  <ArrowRight className="w-5 h-5" />

                </button>

              </div>

            )
          )}

        </div>

      )}
            {/* CONFIRMATION MODAL */}

      {showModal && selectedCareer && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">

          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-2xl font-bold text-zinc-900">

                  Choose {selectedCareer.career}?

                </h2>

                <p className="text-zinc-500 mt-2 leading-7">

                  This career will become your active career path.

                  <br />
                  <br />

                  CareerAI will now generate your personalized Career Journey based on all your assessments.

                  <br />
                  <br />

                  You can change your selected career later. If you generate another journey in the future, your previous journey can be archived.

                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-zinc-500 hover:text-zinc-800 transition"
              >
                <X className="w-6 h-6" />
              </button>

            </div>

            <div className="flex justify-end gap-4 mt-10">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-5 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-100 transition"
              >

                Cancel

              </button>

              <button
                onClick={chooseCareer}
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 transition flex items-center gap-2"
              >

                <CheckCircle2 className="w-5 h-5" />

                {saving
                  ? "Generating Journey..."
                  : "Generate Journey"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}