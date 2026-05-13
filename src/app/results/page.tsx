"use client";

import Link from "next/link";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import {
  Brain,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const resultData = {
  user: {
    name: "Vaibhavi",
    currentClass: "12th Grade",
  },

  aiSummary:
    "Your responses indicate strong creativity, visual thinking, communication skills, and problem-solving abilities. You perform best in environments that combine innovation, design, and user-focused thinking.",

  topMatches: [
    {
      career: "UI/UX Designer",
      match: 92,
      description:
        "Strong alignment with your creativity and user-centered thinking.",
    },

    {
      career: "Frontend Developer",
      match: 87,
      description:
        "Excellent match for your logical thinking and design interest.",
    },

    {
      career: "Creative Technologist",
      match: 81,
      description:
        "Ideal blend of technology, creativity, and innovation.",
    },
  ],

  strengths: [
    "Creativity",
    "Communication",
    "Problem Solving",
    "Visual Thinking",
    "Adaptability",
  ],

  improvementAreas: [
    "Technical Consistency",
    "Research Depth",
    "Analytical Decision Making",
  ],

  roadmap: [
    {
      stage: "01",
      type: "Skill Development",
      title: "Learn UI/UX Design Foundations",
      timeline: "Immediately",
      description:
        "Start learning typography, color theory, design principles, accessibility, and user-centered design concepts.",
    },

    {
      stage: "02",
      type: "Tools & Practice",
      title: "Master Figma & Design Prototyping",
      timeline: "Next 3-6 Months",
      description:
        "Practice wireframing, prototyping, and building modern interfaces using Figma and design systems.",
    },

    {
      stage: "03",
      type: "Certification",
      title: "Complete Industry Certifications",
      timeline: "Within 6-12 Months",
      description:
        "Pursue certifications like Google UX Design, Meta Frontend Developer, or Interaction Design Foundation courses.",
    },

    {
      stage: "04",
      type: "Projects & Portfolio",
      title: "Build Real Portfolio Projects",
      timeline: "During College / Early Learning",
      description:
        "Create case studies, redesign projects, and practical UI/UX applications to showcase your abilities.",
    },

    {
      stage: "05",
      type: "Career Preparation",
      title: "Apply for Internships & Freelance Opportunities",
      timeline: "College Years",
      description:
        "Gain industry experience through internships, freelance work, hackathons, and collaborative projects.",
    },
  ],

  suggestedExams: [
    "UCEED",
    "NID DAT",
    "Design Aptitude Tests",
  ],

  certifications: [
    "Google UX Design Certificate",
    "Meta Frontend Developer",
    "Figma Professional Essentials",
  ],
};

export default function ResultsPage() {

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7] px-6 py-16">

        <div className="max-w-7xl mx-auto">

          {/* HERO */}
          <div className="text-center">

            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">

              <Sparkles className="w-5 h-5" />

              AI Career Analysis Complete

            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 mt-8 leading-tight">

              Your Career Analysis
              <br />

              is Ready

            </h1>

            <p className="max-w-4xl mx-auto text-xl md:text-2xl text-zinc-600 leading-relaxed mt-8">

              Based on your assessment responses, our AI has identified
              career paths, strengths, and personalized future guidance
              tailored for your interests and current academic stage.

            </p>

          </div>

          {/* AI SUMMARY */}
          <div className="mt-16 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-indigo-600 font-semibold">

              <Brain className="w-5 h-5" />

              <span>AI Personality & Career Insight</span>

            </div>

            <p className="text-zinc-700 text-xl leading-relaxed mt-8">

              {resultData.aiSummary}

            </p>

          </div>

          {/* TOP MATCHES */}
          <div className="mt-16">

            <div className="flex items-center gap-3 text-blue-600 font-semibold">

              <Target className="w-5 h-5" />

              <span>Top Career Matches</span>

            </div>

            <h2 className="text-4xl font-bold text-zinc-900 mt-5">

              Recommended Career Paths

            </h2>

            <div className="grid lg:grid-cols-3 gap-8 mt-10">

              {resultData.topMatches.map((career) => (

                <div
                  key={career.career}
                  className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                      <TrendingUp className="w-8 h-8 text-blue-600" />

                    </div>

                    <div className="px-5 py-3 rounded-2xl bg-blue-100 text-blue-700 font-bold text-lg">

                      {career.match}%

                    </div>

                  </div>

                  <h3 className="text-3xl font-bold text-zinc-900 mt-8">

                    {career.career}

                  </h3>

                  <p className="text-zinc-600 text-lg leading-relaxed mt-5">

                    {career.description}

                  </p>

                  <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">

                    Explore Career

                    <ChevronRight className="w-5 h-5" />

                  </button>

                </div>

              ))}

            </div>

          </div>

          {/* STRENGTHS + GROWTH */}
          <div className="grid lg:grid-cols-2 gap-8 mt-16">

            {/* STRENGTHS */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-green-600 font-semibold">

                <Award className="w-5 h-5" />

                <span>Your Strengths</span>

              </div>

              <div className="mt-8 flex flex-wrap gap-4">

                {resultData.strengths.map((strength) => (

                  <div
                    key={strength}
                    className="px-6 py-4 rounded-2xl bg-green-50 text-green-700 font-semibold border border-green-100"
                  >

                    {strength}

                  </div>

                ))}

              </div>

            </div>

            {/* GROWTH */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-orange-500 font-semibold">

                <TrendingUp className="w-5 h-5" />

                <span>Growth Opportunities</span>

              </div>

              <div className="mt-8 space-y-5">

                {resultData.improvementAreas.map((area) => (

                  <div
                    key={area}
                    className="flex items-center gap-4 rounded-2xl bg-orange-50 border border-orange-100 px-5 py-4"
                  >

                    <CheckCircle2 className="w-5 h-5 text-orange-500" />

                    <span className="font-medium text-orange-700">
                      {area}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ROADMAP */}
          <div className="mt-16 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-12">

            <div className="flex items-center gap-3 text-purple-600 font-semibold">

              <Sparkles className="w-5 h-5" />

              <span>AI-Generated Career Roadmap</span>

            </div>

            <h2 className="text-4xl font-bold text-zinc-900 mt-5">

              Personalized Future Guidance

            </h2>

            <div className="mt-12 space-y-10">

              {resultData.roadmap.map((step) => (

                <div
                  key={step.stage}
                  className="flex gap-6"
                >

                  {/* STAGE */}
                  <div className="flex flex-col items-center">

                    <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">

                      {step.stage}

                    </div>

                    <div className="w-1 flex-1 bg-purple-100 mt-3 rounded-full" />

                  </div>

                  {/* CONTENT */}
                  <div className="pb-8">

                    <div className="flex flex-wrap items-center gap-4">

                      <div className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 font-medium text-sm border border-purple-100">

                        {step.type}

                      </div>

                      <div className="text-zinc-500 font-medium">

                        {step.timeline}

                      </div>

                    </div>

                    <h3 className="text-3xl font-bold text-zinc-900 mt-5">

                      {step.title}

                    </h3>

                    <p className="text-zinc-600 text-lg leading-relaxed mt-4 max-w-4xl">

                      {step.description}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* EXAMS + CERTIFICATIONS */}
          <div className="grid lg:grid-cols-2 gap-8 mt-16">

            {/* EXAMS */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-blue-600 font-semibold">

                <GraduationCap className="w-5 h-5" />

                <span>Suggested Exams</span>

              </div>

              <div className="mt-8 space-y-5">

                {resultData.suggestedExams.map((exam) => (

                  <div
                    key={exam}
                    className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4"
                  >

                    <BookOpen className="w-5 h-5 text-blue-600" />

                    <span className="font-semibold text-blue-700">
                      {exam}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-10">

              <div className="flex items-center gap-3 text-green-600 font-semibold">

                <BadgeCheck className="w-5 h-5" />

                <span>Recommended Certifications</span>

              </div>

              <div className="mt-8 space-y-5">

                {resultData.certifications.map((certification) => (

                  <div
                    key={certification}
                    className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 px-5 py-4"
                  >

                    <CheckCircle2 className="w-5 h-5 text-green-600" />

                    <span className="font-semibold text-green-700">
                      {certification}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* CTA */}
          <div className="mt-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[40px] p-10 md:p-16 text-center text-white shadow-2xl">

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">

              Continue Your Career Journey

            </h2>

            <p className="max-w-3xl mx-auto text-xl text-blue-100 leading-relaxed mt-6">

              Explore personalized roadmaps, AI-powered insights,
              certifications, and assessments tailored specifically
              for your future goals.

            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-2xl bg-white text-blue-700 font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/explore"
                className="px-8 py-4 rounded-2xl border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Explore More Careers
              </Link>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}