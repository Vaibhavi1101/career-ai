"use client";

import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  Brain,
  TrendingUp,
  Target,
  Award,
  Sparkles,
  LayoutDashboard,
  ClipboardList,
  Route,
  Settings,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const [reports, setReports] =
    useState<any[]>([]);


  useEffect(() => {

    const fetchDashboard = async () => {

      const { data } =
        await supabase.auth.getUser();

      if (!data.user) {

        router.push("/login");

        return;

      }

      setUser(data.user);


      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

      setProfile(profileData);


      const { data: reportsData } =
        await supabase
          .from("reports")
          .select("*")
          .eq("user_id", data.user.id)
          .order("created_at", {
            ascending: false,
          });

      setReports(reportsData || []);

      setLoading(false);

    };

    fetchDashboard();

  }, [router]);


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">

        <p className="text-zinc-600 text-xl font-semibold">
          Loading Dashboard...
        </p>

      </div>

    );

  }


  const latestReport = reports[0]?.report;


  return (

    <>

      <Navbar />


      <main className="min-h-screen bg-[#f5f5f7]">

        <div className="flex">


          {/* SIDEBAR */}
          <aside className="hidden lg:flex flex-col w-72 min-h-screen bg-white border-r border-zinc-200 px-8 py-10 sticky top-0">

            <div>

              <h1 className="text-3xl font-extrabold text-zinc-900">
                CareerAI
              </h1>

              <p className="text-zinc-500 mt-2">
                AI Career Platform
              </p>

            </div>


            <div className="mt-14 space-y-3">

              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-blue-50 text-blue-600 font-semibold">

                <LayoutDashboard className="w-5 h-5" />

                Dashboard

              </button>


              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-600 hover:bg-zinc-100 transition">

                <ClipboardList className="w-5 h-5" />

                Assessments

              </button>


              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-600 hover:bg-zinc-100 transition">

                <Route className="w-5 h-5" />

                Roadmaps

              </button>


              <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-600 hover:bg-zinc-100 transition">

                <Settings className="w-5 h-5" />

                Settings

              </button>

            </div>

          </aside>


          {/* MAIN */}
          <div className="flex-1 px-6 md:px-10 py-14">

            <div className="max-w-7xl mx-auto">


              {/* HERO */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-[40px] p-10 md:p-14 text-white shadow-2xl">

                <div className="flex flex-col lg:flex-row items-start justify-between gap-10">


                  <div>

                    <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-3 rounded-full text-blue-100 font-semibold">

                      <Sparkles className="w-5 h-5" />

                      AI Career Dashboard

                    </div>


                    <h1 className="text-5xl md:text-6xl font-extrabold mt-8 leading-tight">

                      Welcome back,

                      <br />

                      {profile?.full_name || "Student"}

                    </h1>


                    <p className="text-xl text-blue-100 leading-relaxed mt-6 max-w-3xl">

                      Track your assessments, explore AI-generated
                      career insights, and continue building your
                      future roadmap.

                    </p>

                  </div>


                  <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-8 min-w-[280px]">

                    <p className="text-blue-100 font-medium">
                      Top Career Match
                    </p>

                    <h2 className="text-3xl font-bold mt-4">
                      {latestReport?.careers?.[0] || "No Report Yet"}
                    </h2>


                    <div className="mt-8">

                      <Link
                        href="/explore"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-700 font-semibold hover:scale-[1.03] transition"
                      >
                        Take New Assessment
                        <ChevronRight className="w-4 h-4" />
                      </Link>

                    </div>

                  </div>

                </div>

              </div>


              {/* STATS */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

                <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-lg">

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <Brain className="w-7 h-7 text-blue-600" />

                  </div>

                  <h3 className="text-zinc-500 font-medium mt-6">
                    Reports Generated
                  </h3>

                  <p className="text-4xl font-bold text-zinc-900 mt-3">
                    {reports.length}
                  </p>

                </div>


                <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-lg">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                    <Target className="w-7 h-7 text-emerald-600" />

                  </div>

                  <h3 className="text-zinc-500 font-medium mt-6">
                    Top Career
                  </h3>

                  <p className="text-2xl font-bold text-zinc-900 mt-3 leading-snug">
                    {latestReport?.careers?.[0] || "No Data"}
                  </p>

                </div>


                <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-lg">

                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                    <Award className="w-7 h-7 text-purple-600" />

                  </div>

                  <h3 className="text-zinc-500 font-medium mt-6">
                    Strengths Found
                  </h3>

                  <p className="text-4xl font-bold text-zinc-900 mt-3">
                    {latestReport?.strengths?.length || 0}
                  </p>

                </div>


                <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-lg">

                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                    <TrendingUp className="w-7 h-7 text-orange-600" />

                  </div>

                  <h3 className="text-zinc-500 font-medium mt-6">
                    Roadmap Steps
                  </h3>

                  <p className="text-4xl font-bold text-zinc-900 mt-3">
                    {latestReport?.roadmap?.length || 0}
                  </p>

                </div>

              </div>


              {/* AI SUMMARY */}
              <div className="mt-14 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-10 md:p-12">

                <div className="flex items-center gap-3 text-indigo-600 font-semibold">

                  <Sparkles className="w-5 h-5" />

                  <span>AI Career Insight</span>

                </div>


                <p className="text-zinc-700 text-xl leading-relaxed mt-8">

                  {latestReport?.summary ||
                    "Complete an assessment to unlock AI-powered career insights."}

                </p>

              </div>


              {/* CAREERS */}
              <div className="mt-14">

                <div className="flex items-center gap-3 text-blue-600 font-semibold">

                  <Target className="w-5 h-5" />

                  <span>Recommended Careers</span>

                </div>


                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

                  {latestReport?.careers?.map(
                    (
                      career: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="bg-white rounded-[32px] border border-zinc-200 shadow-lg p-8 hover:shadow-2xl transition duration-300"
                      >

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                          <TrendingUp className="w-8 h-8 text-blue-600" />

                        </div>


                        <h3 className="text-2xl font-bold text-zinc-900 mt-8">

                          {career}

                        </h3>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* STRENGTHS */}
              <div className="mt-14 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-10 md:p-12">

                <div className="flex items-center gap-3 text-emerald-600 font-semibold">

                  <Award className="w-5 h-5" />

                  <span>Identified Strengths</span>

                </div>


                <div className="grid md:grid-cols-2 gap-6 mt-10">

                  {latestReport?.strengths?.map(
                    (
                      strength: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="flex items-center gap-4 bg-emerald-50 rounded-2xl px-6 py-5"
                      >

                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />

                        <span className="text-zinc-800 font-medium text-lg">
                          {strength}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* ROADMAP */}
              <div className="mt-14 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-10 md:p-12">

                <div className="flex items-center gap-3 text-purple-600 font-semibold">

                  <Route className="w-5 h-5" />

                  <span>Personalized Roadmap</span>

                </div>


                <div className="space-y-6 mt-10">

                  {latestReport?.roadmap?.map(
                    (
                      step: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="flex items-start gap-5 bg-purple-50 rounded-2xl px-6 py-5"
                      >

                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">

                          {index + 1}

                        </div>


                        <p className="text-zinc-700 text-lg leading-relaxed">

                          {step}

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* HISTORY */}
              <div className="mt-14 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-10 md:p-12">

                <div className="flex items-center gap-3 text-orange-600 font-semibold">

                  <ClipboardList className="w-5 h-5" />

                  <span>Assessment History</span>

                </div>

                <div className="space-y-5 mt-10">

                  {reports.map((item, index) => (

                    <div
                      key={index}
                      className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 rounded-3xl border border-zinc-200 px-6 py-6 hover:shadow-md transition"
                    >

                      <div>

                        <h3 className="text-2xl font-bold text-zinc-900">

                          {item.report?.careers?.[0] ||
                            "Career Report"}

                        </h3>

                        <p className="text-zinc-500 mt-2">

                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}

                        </p>

                      </div>

                      <div className="flex flex-wrap items-center gap-3">

                        {item.report?.strengths
                          ?.slice(0, 2)
                          ?.map((strength: string) => (

                            <span
                              key={strength}
                              className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                            >
                              {strength}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}