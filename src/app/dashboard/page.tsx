"use client";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  Brain,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Sparkles,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Route,
  Settings,
} from "lucide-react";

const dashboardData = {
  user: {
    name: "Vaibhavi",
    class: "12th Grade Student",
    roadmap: "UI/UX Design",
    progress: 68,
    profileImage: "",
  },

  aiInsight: "Your creativity, communication skills, and visual thinking indicate strong potential in UI/UX Design and Frontend Development careers.",

  stats: [
    {
      title: "Tests Completed",
      value: "05",
      icon: Brain,
    },

    {
      title: "Career Match",
      value: "92%",
      icon: Target,
    },

    {
      title: "Roadmap Progress",
      value: "68%",
      icon: TrendingUp,
    },

    {
      title: "Skills Identified",
      value: "12",
      icon: Award,
    },
  ],

  recommendations: [
    {
      title: "UI/UX Designer",
      match: "92%",
    },

    {
      title: "Frontend Developer",
      match: "87%",
    },

    {
      title: "Creative Technologist",
      match: "81%",
    },
  ],

  strengths: [
    "Creativity",
    "Problem Solving",
    "Visual Thinking",
    "Communication",
  ],

  roadmapSteps: [
    {
      title: "Learn UI Foundations",
      completed: true,
    },

    {
      title: "Master Figma & Prototyping",
      completed: true,
    },

    {
      title: "Build Portfolio Projects",
      completed: false,
    },

    {
      title: "Apply for Internships",
      completed: false,
    },
  ],

  recentTests: [
    {
      name: "Personality Assessment",
      score: "88%",
      date: "2 days ago",
    },

    {
      name: "Career Interest Test",
      score: "92%",
      date: "5 days ago",
    },

    {
      name: "Skill Analysis Test",
      score: "84%",
      date: "1 week ago",
    },
  ],
};

export default function DashboardPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {

      const { data } =
        await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }
      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

      setUser(data.user);
      setProfile(profileData);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-zinc-600 text-lg font-medium">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7]">

        <div className="flex">

          {/* SIDEBAR */}
          <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-zinc-200 px-8 py-10 sticky top-0">

            {/* LOGO */}
            <div>

              <h1 className="text-3xl font-extrabold text-zinc-900">
                CareerAI
              </h1>

              <p className="text-zinc-500 mt-2">
                AI Career Platform
              </p>

            </div>

            {/* NAVIGATION */}
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

          {/* MAIN CONTENT */}
          <div className="flex-1 px-6 md:px-10 py-16">

            <div className="max-w-7xl mx-auto">

              {/* HERO SECTION */}
              <div className="flex flex-col xl:flex-row items-start justify-between gap-10">

                {/* LEFT SIDE */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 text-blue-600 font-semibold">

                    <Sparkles className="w-5 h-5" />

                    <span>AI Career Dashboard</span>

                  </div>

                  <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 mt-4 leading-tight">

                    Welcome back,
                    <br />

                    {user?.user_metadata?.full_name || "User"}

                  </h1>

                  <p className="mt-6 text-xl text-zinc-600 leading-relaxed max-w-3xl">

                    Continue building your future with personalized
                    AI-powered insights and career roadmaps.

                  </p>

                  {/* AI INSIGHT */}
                  <div className="mt-10 bg-white rounded-[32px] border border-zinc-200 p-8 shadow-xl w-full hover:shadow-2xl transition-all duration-300">

                    <div className="flex items-center gap-3 text-indigo-600 font-semibold">

                      <Brain className="w-5 h-5" />

                      <span>AI Insight</span>

                    </div>

                    <p className="text-zinc-700 text-lg leading-relaxed mt-5">

                      {dashboardData.aiInsight}

                    </p>

                  </div>

                </div>

                {/* PROFILE CARD */}
                <div className="w-full max-w-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[40px] p-8 text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] transition-all duration-300">

                  {profile?.profile_image ? (

                    <img
                      src={profile.profile_image}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg"
                    />

                  ) : (

                    <img
                      src={`https://ui-avatars.com/api/?name=${profile?.full_name || "User"}&background=ffffff20&color=fff&size=256`}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg"
                    />

                  )}

                  <h2 className="text-5xl font-bold mt-8">

                    {profile?.full_name || "User"}

                  </h2>

                  <p className="text-blue-100 text-2xl mt-4">

                    {profile?.grade || "Student"}

                  </p>

                  <p className="text-blue-200 text-lg mt-2 break-all">

                    {user?.email}

                  </p>

                  <div className="mt-12">

                    <div className="flex items-center justify-between text-xl mb-5">

                      <span>Roadmap Progress</span>

                      <span>
                        {profile?.roadmap || "No Roadmap Selected"}%
                      </span>

                    </div>

                    <div className="w-full h-5 bg-white/20 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-white rounded-full"
                        style={{
                          width: `${profile?.roadmap || "No Roadmap Selected"}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* STATS */}
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">

                {dashboardData.stats.map((stat) => {

                  const Icon = stat.icon;

                  return (

                    <div
                      key={stat.title}
                      className="bg-white rounded-[32px] border border-zinc-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/40"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-zinc-500 text-sm">
                            {stat.title}
                          </p>

                          <h2 className="text-4xl font-bold text-zinc-900 mt-3">
                            {stat.value}
                          </h2>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                          <Icon className="w-7 h-7 text-blue-600" />

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>

              {/* MAIN GRID */}
              <div className="grid lg:grid-cols-3 gap-8 mt-16">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">

                  {/* AI RECOMMENDATIONS */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

                    <div className="flex items-center gap-3 text-indigo-600 font-semibold">

                      <Brain className="w-5 h-5" />

                      <span>AI Career Recommendations</span>

                    </div>

                    <h2 className="text-3xl font-bold text-zinc-900 mt-5">
                      Recommended Career Paths
                    </h2>

                    <div className="mt-8 space-y-5">

                      {dashboardData.recommendations.map((career) => (

                        <div
                          key={career.title}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-3xl border border-zinc-200 p-6 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-300"
                        >

                          <div>

                            <h3 className="text-xl font-semibold text-zinc-900">
                              {career.title}
                            </h3>

                            <p className="text-zinc-500 mt-2">
                              AI-generated recommendation based on
                              your assessments and interests.
                            </p>

                          </div>

                          <div className="flex items-center gap-5">

                            <div className="px-5 py-3 rounded-2xl bg-blue-100 text-blue-700 font-bold">

                              {career.match} Match

                            </div>

                            <ChevronRight className="w-6 h-6 text-zinc-400" />

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* RECENT TESTS */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

                    <div className="flex items-center gap-3 text-green-600 font-semibold">

                      <BookOpen className="w-5 h-5" />

                      <span>Recent Assessments</span>

                    </div>

                    <h2 className="text-3xl font-bold text-zinc-900 mt-5">
                      Your Latest Test Results
                    </h2>

                    <div className="mt-8 space-y-5">

                      {dashboardData.recentTests.map((test) => (

                        <div
                          key={test.name}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-3xl border border-zinc-200 p-6 hover:border-green-300 hover:bg-green-50/40 transition-all duration-300"
                        >

                          <div>

                            <h3 className="text-xl font-semibold text-zinc-900">
                              {test.name}
                            </h3>

                            <p className="text-zinc-500 mt-2">
                              Completed {test.date}
                            </p>

                          </div>

                          <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold text-lg w-fit">

                            {test.score}

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">

                  {/* ROADMAP */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8">

                    <div className="flex items-center gap-3 text-purple-600 font-semibold">

                      <Route className="w-5 h-5" />

                      <span>Career Roadmap</span>

                    </div>

                    <h2 className="text-3xl font-bold text-zinc-900 mt-5">

                      {dashboardData.user.roadmap}

                    </h2>

                    <div className="mt-8 space-y-5">

                      {dashboardData.roadmapSteps.map((step) => (

                        <div
                          key={step.title}
                          className="flex items-start gap-4"
                        >

                          <div
                            className={`w-6 h-6 rounded-full mt-1

                            ${
                              step.completed
                                ? "bg-green-500"
                                : "bg-zinc-300"
                            }
                            `}
                          />

                          <div>

                            <p className="font-semibold text-zinc-900">
                              {step.title}
                            </p>

                            <p className="text-zinc-500 text-sm mt-1">

                              {step.completed
                                ? "Completed"
                                : "In Progress"}

                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* STRENGTHS */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8">

                    <div className="flex items-center gap-3 text-orange-500 font-semibold">

                      <Award className="w-5 h-5" />

                      <span>Top Strengths</span>

                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">

                      {dashboardData.strengths.map((strength) => (

                        <div
                          key={strength}
                          className="px-5 py-3 rounded-2xl bg-orange-50 text-orange-700 font-medium border border-orange-100"
                        >

                          {strength}

                        </div>

                      ))}

                    </div>

                  </div>

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