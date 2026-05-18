"use client";

import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  Brain,
  Sparkles,
  TrendingUp,
  Target,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  BadgeCheck,
} from "lucide-react";


export default function ResultsPage() {

  const [assessment, setAssessment] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [aiReport, setAiReport] =
    useState<any>(null);


  useEffect(() => {

    const fetchAssessment = async () => {

      const { data: authData } =
        await supabase.auth.getUser();

      const user = authData.user;

      if (!user) {

        setLoading(false);

        return;

      }

      const { data, error } =
        await supabase
          .from("assessments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .single();

      if (error || !data) {

        setLoading(false);

        return;

      }

      setAssessment(data);


      // AI REPORT GENERATION
      const response = await fetch(
        "/api/generate-report",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            answers: data.answers,
            domain: data.domain,
          }),
        }
      );

      const reportData =
        await response.json();

      try {

        const cleaned =
          reportData.result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        setAiReport(parsed);

      } catch (err) {

        console.log(err);

      }

      setLoading(false);

    };

    fetchAssessment();

  }, []);


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">

        <p className="text-2xl font-bold text-zinc-800">
          Generating AI Career Report...
        </p>

      </div>

    );

  }


  return (

    <>

      <Navbar />


      <main className="min-h-screen bg-[#f5f5f7] px-6 py-16">

        <div className="max-w-7xl mx-auto">


          {/* HERO */}
          <div className="text-center">

            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">

              <Sparkles className="w-5 h-5" />

              {assessment?.domain || "Career Analysis"}

            </div>


            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 mt-8 leading-tight">

              Your AI Career

              <br />

              Report is Ready

            </h1>


            <p className="max-w-4xl mx-auto text-xl md:text-2xl text-zinc-600 leading-relaxed mt-8">

              Based on your assessment responses, our AI has identified
              career paths, strengths, learning directions, and future
              opportunities personalized for you.

            </p>


            <p className="mt-6 text-zinc-500 text-lg">

              Assessment completed on {" "}

              {new Date(
                assessment?.created_at
              ).toLocaleDateString()}

            </p>

          </div>


          {/* AI SUMMARY */}
          <div className="mt-16 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-indigo-600 font-semibold">

              <Brain className="w-5 h-5" />

              <span>AI Personality & Career Insight</span>

            </div>


            <p className="text-zinc-700 text-xl leading-relaxed mt-8">

              {aiReport?.summary}

            </p>

          </div>


          {/* CAREERS */}
          <div className="mt-16">

            <div className="flex items-center gap-3 text-blue-600 font-semibold">

              <Target className="w-5 h-5" />

              <span>Top Career Matches</span>

            </div>


            <h2 className="text-4xl font-bold text-zinc-900 mt-5">

              Recommended Career Paths

            </h2>


            <div className="grid lg:grid-cols-3 gap-8 mt-10">

              {aiReport?.careers?.map(
                (
                  career: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
                  >

                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                      <TrendingUp className="w-8 h-8 text-blue-600" />

                    </div>


                    <h3 className="text-2xl font-bold text-zinc-900 mt-8">

                      {career}

                    </h3>


                    <div className="mt-8 flex items-center text-blue-600 font-semibold gap-2">

                      <span>Explore Career</span>

                      <ChevronRight className="w-4 h-4" />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* STRENGTHS */}
          <div className="mt-16 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-emerald-600 font-semibold">

              <BadgeCheck className="w-5 h-5" />

              <span>Key Strengths</span>

            </div>


            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {aiReport?.strengths?.map(
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


          {/* CERTIFICATIONS + EXAMS */}
          <div className="grid lg:grid-cols-2 gap-10 mt-16">


            {/* CERTIFICATIONS */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-purple-600 font-semibold">

                <BookOpen className="w-5 h-5" />

                <span>Recommended Certifications</span>

              </div>


              <div className="space-y-5 mt-8">

                {aiReport?.certifications?.map(
                  (
                    cert: string,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1" />

                      <p className="text-zinc-700 text-lg">

                        {cert}

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* EXAMS */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-orange-600 font-semibold">

                <GraduationCap className="w-5 h-5" />

                <span>Suggested Exams</span>

              </div>


              <div className="space-y-5 mt-8">

                {aiReport?.exams?.map(
                  (
                    exam: string,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >

                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1" />

                      <p className="text-zinc-700 text-lg">

                        {exam}

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>


          {/* ROADMAP */}
          <div className="mt-16 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-indigo-600 font-semibold">

              <BookOpen className="w-5 h-5" />

              <span>Personalized Growth Roadmap</span>

            </div>


            <div className="space-y-6 mt-10">

              {aiReport?.roadmap?.map(
                (
                  step: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="flex items-start gap-5 bg-indigo-50 rounded-2xl px-6 py-5"
                  >

                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">

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


          {/* CTA */}
          <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-violet-600 rounded-[40px] p-10 md:p-16 text-white shadow-2xl">

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">

              Continue Building Your Future

            </h2>


            <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 mt-6 leading-relaxed">

              Save your reports, explore additional assessments,
              and unlock personalized AI-powered career guidance.

            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-2xl bg-white text-indigo-700 font-bold text-lg hover:scale-[1.03] transition duration-300"
              >
                Go to Dashboard
              </Link>


              <Link
                href="/explore"
                className="px-8 py-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold text-lg hover:bg-white/20 transition"
              >
                Explore More Tests
              </Link>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}