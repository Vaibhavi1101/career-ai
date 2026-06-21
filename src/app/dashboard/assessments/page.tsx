"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Brain,
  ArrowRight,
} from "lucide-react";

export default function AssessmentsPage() {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setAssessments(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-zinc-600 text-lg">
            Loading Assessments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 md:px-12 py-10">

      {/* HEADER */}

      <div className="mb-12">
        <p className="text-indigo-600 font-semibold">
          Assessment History
        </p>

        <h1 className="text-5xl font-bold text-zinc-900 mt-4">
          Your Assessments
        </h1>

        <p className="text-zinc-500 text-lg mt-4">
          View all completed assessments and access previous reports.
        </p>
      </div>

      {/* EMPTY STATE */}

      {assessments.length === 0 && (
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-lg p-12 text-center">

          <Brain className="w-14 h-14 text-indigo-600 mx-auto" />

          <h2 className="text-2xl font-bold mt-6">
            No Assessments Yet
          </h2>

          <p className="text-zinc-500 mt-3">
            Complete an assessment to start building your career profile.
          </p>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Explore Assessments
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* ASSESSMENTS GRID */}

      {assessments.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8">

          {assessments.map((assessment) => {

            const report =
              assessment.reports?.[0];

            return (
              <div
                key={assessment.id}
                className="bg-white rounded-[32px] border border-zinc-200 shadow-lg p-8"
              >
                <div className="flex items-start justify-between">

                  <div>

                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                      <FileText className="w-8 h-8 text-indigo-600" />

                    </div>

                    <h2 className="text-3xl font-bold mt-6 text-zinc-900">

                      {assessment.test_type}

                    </h2>

                    {assessment.domain && (
                      <p className="text-indigo-600 mt-2 font-medium">
                        {assessment.domain}
                      </p>
                    )}

                  </div>

                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3 text-zinc-600">

                    <Calendar className="w-4 h-4" />

                    <span>

                      {new Date(
                        assessment.created_at
                      ).toLocaleDateString()}

                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-zinc-600">

                    <Brain className="w-4 h-4" />

                    <span>

                      {assessment.traits?.length || 0}
                      {" "}
                      Traits Identified

                    </span>

                  </div>

                </div>

                <div className="mt-8">

                  {report ? (
                    <Link
                      href={`/results?id=${assessment.id}`}
                      className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                    >
                      View Report
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="text-zinc-400">
                      Report unavailable
                    </span>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}