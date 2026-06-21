"use client";

import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { User, Compass, Activity } from "lucide-react";

import { getTopItems } from "@/lib/dashboard-utils";

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

  const [assessments, setAssessments] =
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

      const { data: assessmentsData } =
        await supabase
          .from("assessments")
          .select("*")
          .eq("user_id", data.user.id);

      setAssessments(
        assessmentsData || []
      );

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

  const allCareers = reports.flatMap(
    (r) => r.report?.careerMatches || []
  );

  const allTraits = assessments.flatMap(
    (a) => a.traits || []
  );

  const topCareers = getTopItems(
    allCareers,
    4
  );

  const topStrengths = getTopItems(
    allTraits,
    8
  );

  const domainsExplored =
    new Set(
      assessments.map(
        (a) => a.domain
      )
    ).size;

    const profileFields = [
                profile?.full_name,
                profile?.grade,
                profile?.stream,
                profile?.career_goal,
                profile?.selected_career,
                profile?.bio,
              ];

              const completedFields =
                profileFields.filter(Boolean).length;

              const completion =
                Math.round(
                  (completedFields /
                    profileFields.length) *
                    100
                );

  const topTraits =
    getTopItems(allTraits, 6);

  const exploredDomains =
    new Set(
      assessments
        .map((a) => a.domain)
        .filter(Boolean)
    ).size;
  
    const topCareer =
  latestReport?.careerMatches?.[0] ||
  latestReport?.careers?.[0] ||
  "Not Available";

  const cleanSummary =
  profile?.overall_summary
    ?.replace(
      /^overall career profile:?/i,
      ""
    )
    .trim();

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

                <User className="w-5 h-5" />

                Profile

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
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-[40px] p-8 md:p-10 text-white shadow-2xl">

                <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

                  <div>

                    <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-3 rounded-full text-blue-100 font-semibold">
                      <Sparkles className="w-5 h-5" />
                      AI Career Dashboard
                    </div>


                    <h1 className="text-5xl md:text-5xl font-extrabold mt-8 leading-tight">
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


                  <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-8 min-w-[220px]">
                    <p className="text-blue-100 font-medium">
                      Top Career Match
                    </p>

                    <h2 className="text-3xl font-bold mt-4">
                      {latestReport?.careerMatches?.[0] || "No Report Yet"}
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



              {/* PROFILE SNAPSHOT */}
              <div className="mt-10 bg-white rounded-[40px] p-8 shadow-xl border border-zinc-200">

                <div className="flex items-center gap-3 text-blue-600 font-semibold mb-8">

                  <User className="w-5 h-5" />

                  Profile Snapshot
                </div>

                <div className="grid md:grid-cols-4 gap-6">

                  <div>
                    <p className="text-zinc-500 text-sm">Name</p>
                    <h3 className="text-xl font-bold mt-1">
                      {profile?.full_name || "Not Set"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Grade</p>
                    <h3 className="text-xl font-bold mt-1">
                      {profile?.grade || "Not Set"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Stream</p>
                    <h3 className="text-xl font-bold mt-1">
                      {profile?.stream || "Not Set"}
                    </h3>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Career Goal</p>
                    <h3 className="text-xl font-bold mt-1">
                      {profile?.career_goal || "Not Set"}
                    </h3>
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
                    Assessments Taken
                  </h3>

                  <p className="text-4xl font-bold text-zinc-900 mt-3">
                    {assessments.length}
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
                    {latestReport?.careerMatches?.[0] || "No Data"}
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


              {/* QUICK ACTIONS */}
              {/* <div className="mt-12">

                <div className="flex items-center gap-3 text-indigo-600 font-semibold mb-6">
                  <Sparkles className="w-5 h-5" />
                  Quick Actions
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <Link
                    href="/assessments"
                    className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-200 hover:shadow-xl transition"
                  >
                    <Brain className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg">
                      Take Assessment
                    </h3>
                    <p className="text-zinc-500 mt-2">
                      Discover new career insights
                    </p>
                  </Link>

                  <Link
                    href="/assessments"
                    className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-200 hover:shadow-xl transition"
                  >
                    <ClipboardList className="w-8 h-8 text-emerald-600 mb-4" />
                    <h3 className="font-bold text-lg">
                      Assessment History
                    </h3>
                    <p className="text-zinc-500 mt-2">
                      Review previous assessments
                    </p>
                  </Link>

                  <Link
                    href="/profile"
                    className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-200 hover:shadow-xl transition"
                  >
                    <User className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="font-bold text-lg">
                      Update Profile
                    </h3>
                    <p className="text-zinc-500 mt-2">
                      Improve personalization
                    </p>
                  </Link>

                  <div className="bg-white rounded-3xl p-6 shadow-lg border border-zinc-200">
                    <Target className="w-8 h-8 text-orange-600 mb-4" />
                    <h3 className="font-bold text-lg">
                      Career Journey
                    </h3>

                    <p className="text-zinc-500 mt-2">
                      {profile?.selected_career
                        ? profile.selected_career
                        : "No career selected"}
                    </p>
                  </div>
                </div>
              </div> */}


              {/*Career Intelligence and Career DNA*/}
              <div className="grid lg:grid-cols-2 gap-8 mt-14">

                <div className="bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                  <div className="flex items-center gap-3 text-indigo-600 font-semibold">

                    <Compass className="w-5 h-5" />

                    Career Intelligence

                  </div>

                  <div className="space-y-4 mt-8">

                    {topCareers.map((career) => (

                      <div
                        key={career}
                        className="bg-indigo-50 rounded-2xl px-5 py-4 font-medium text-zinc-800"
                      >
                        {career}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                  <div className="flex items-center gap-3 text-emerald-600 font-semibold">
                    <Brain className="w-5 h-5" />
                    Career DNA
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    {topStrengths.map((trait) => (

                      <div
                        key={trait}
                        className="px-5 py-3 rounded-full bg-emerald-50 text-emerald-700 font-medium"
                      >
                        {trait}
                      </div>

                    ))}
                  </div>
                </div>
              </div>


              {/*Current Journey*/}
              <div className="mt-14 bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                <div className="flex items-center gap-3 text-purple-600 font-semibold">
                  <Target className="w-5 h-5" />
                  Current Journey
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>

                    <p className="text-zinc-500">
                      Selected Career
                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                      {profile?.selected_career ||
                        "Not Selected Yet"}

                    </h3>

                  </div>

                  <div>

                    <p className="text-zinc-500">
                      Roadmap
                    </p>

                    <h3 className="text-3xl font-bold mt-2">

                      {profile?.roadmap ||
                        "Not Started"}

                    </h3>
                  </div>
                </div>
              </div>


              {/*AI Profile*/}
              <div className="mt-14 bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                <div className="flex items-center gap-3 text-blue-600 font-semibold">
                  <Sparkles className="w-5 h-5" />
                  Overall Career Profile
                </div>

                <p className="text-xl text-zinc-700 leading-relaxed mt-8">
                  { cleanSummary ||
                    "Complete assessments to build your AI-generated career profile."}
                </p>
              </div>

              
              {/* PROFILE COMPLETION */}
              <div className="mt-14 bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                <div className="flex items-center gap-3 text-emerald-600 font-semibold">
                  <TrendingUp className="w-5 h-5" />
                  Profile Completion
                </div>

                <div className="mt-8">

                  <div className="flex justify-between mb-3">

                    <span className="font-medium">
                      Profile Strength
                    </span>

                    <span className="font-bold">
                      {completion}%
                    </span>

                  </div>

                  <div className="w-full h-4 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                      style={{
                        width: `${completion}%`,
                      }}
                    />
                  </div>
                </div>
              </div>


              {/*Activity Feed*/}
              <div className="mt-14 bg-white rounded-[40px] p-10 shadow-xl border border-zinc-200">

                <div className="flex items-center gap-3 text-orange-600 font-semibold">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </div>

                <div className="space-y-4 mt-8">
                  {assessments
                    .slice(0, 5)
                    .map((assessment) => (

                      <div
                        key={assessment.id}
                        className="flex items-center justify-between rounded-2xl bg-zinc-50 px-5 py-4"
                      >
                        <div>

                          <h2 className="font-semibold text-blue-900 text-xl">
                            {assessment.test_type}
                          </h2>

                          <p className="text-sm text-zinc-500">

                            {new Date(
                              assessment.created_at
                            ).toLocaleDateString()}

                          </p>

                        </div>

                        <span className="text-emerald-600 font-medium">
                          Completed
                        </span>
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