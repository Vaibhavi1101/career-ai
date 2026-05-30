"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useRouter } from "next/navigation";

import {
  Brain,
  Briefcase,
  Palette,
  Scale,
  Stethoscope,
  Cpu,
  ChartColumn,
  Newspaper,
} from "lucide-react";

import {
  Sparkles,
  Target,
  BadgeCheck,
} from "lucide-react";

const domains = [
  {
    title: "Engineering & Tech",
    desc: "AI, Software, Robotics, Cybersecurity and more.",
    icon: Cpu,
  },
  {
    title: "Medical & Healthcare",
    desc: "Doctor, Psychology, Biotechnology, Pharmacy.",
    icon: Stethoscope,
  },
  {
    title: "Business & Finance",
    desc: "Marketing, MBA, Startups, Finance & Analytics.",
    icon: Briefcase,
  },
  {
    title: "Design & Creativity",
    desc: "UI/UX, Animation, Fashion, Graphic Design.",
    icon: Palette,
  },
  {
    title: "Law & Civil Services",
    desc: "Lawyer, Judiciary, UPSC and Governance.",
    icon: Scale,
  },
  {
    title: "Commerce & Management",
    desc: "CA, HR, Operations, Management Careers.",
    icon: ChartColumn,
  },
  {
    title: "Arts & Humanities",
    desc: "Literature, Sociology, Psychology and more.",
    icon: Brain,
  },
  {
    title: "Media & Communication",
    desc: "Journalism, Digital Media, Public Relations.",
    icon: Newspaper,
  },
];

const tests = [
  {
    id: "interest",
    title: "Interest Test",
    desc: "Discover what genuinely interests you.",
    icon: Brain,
  },
  {
    id: "personality",
    title: "Personality Test",
    desc: "Understand how you think and work.",
    icon: Sparkles,
  },
  {
    id: "skills",
    title: "Skill Assessment",
    desc: "Analyze your strengths and abilities.",
    icon: BadgeCheck,
  },
  // {
  //   title: "AI Career Match",
  //   desc: "Get AI-powered career recommendations.",
  //   icon: Target,
  // },
];

export default function ExplorePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f5f7]">

      <Navbar />

      {/* HERO */}
      <section className="relative py-24 px-6 overflow-hidden">

        {/* Background Image */}
        <img
          src="/career-bg.png"
          alt="Explore Careers"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center text-white">

          <div className="backdrop-blur-sm bg-black/25 border border-cyan-400/20 rounded-[40px] px-10 py-16 shadow-2xl">

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Explore Your Future
            </h1>

            <p className="text-xl md:text-2xl mt-8 text-zinc-200 leading-relaxed">
              Discover career domains, AI-powered assessments,
              and personalized career guidance built for students.
            </p>

          </div>

        </div>

      </section>

      {/* DOMAIN SECTION */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-black">
              Explore Career Domains
            </h2>

            <p className="text-zinc-600 text-xl mt-5">
              Discover industries and career paths aligned with your interests.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

            {domains.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-md hover:bg-blue-50/40 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-3 hover:rotate-[1deg] cursor-pointer"
              >

                <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center">

                  <item.icon className="w-8 h-8 text-indigo-700" />

                </div>

                <h3 className="text-2xl font-bold mt-6 text-black leading-snug">
                  {item.title}
                </h3>

                <p className="text-zinc-600 text-lg leading-relaxed mt-4">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* TEST SECTION */}
      <section className="py-24 bg-white px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-black">
              AI-Powered Assessments
            </h2>

            <p className="text-zinc-600 text-xl mt-5">
              Understand yourself better with intelligent career tests.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

            {tests.map((item) => (
              <div
                key={item.title}

                onClick={() =>
                  router.push(
                    `/test?type=${encodeURIComponent(item.id)}`
                  )
                }

                className="rounded-3xl bg-[#ececf4] p-8 hover:shadow-xl transition duration-300 hover:-translate-y-2 cursor-pointer"
              >

                <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-indigo-700" />
                </div>

                <h3 className="text-2xl font-bold text-black">
                  {item.title}
                </h3>

                <p className="text-zinc-700 text-lg mt-4 leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7C6CF6] to-[#9A6BFF] text-white font-semibold shadow-md hover:scale-[1.03] hover:shadow-lg transition duration-300">
                  Start Assessment
                  <span className="text-lg">→</span>
                </button>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* AI HELP SECTION */}
      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[#4f67d8] via-[#67b2f5] to-[#5d7df0] p-16 text-white shadow-xl">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h2 className="text-5xl font-bold leading-tight">
                How CareerAI Helps You
              </h2>

              <p className="text-xl text-blue-100 mt-8 leading-relaxed">
                CareerAI uses intelligent analysis to understand your
                strengths, interests, skills and goals to guide you
                toward the best career paths.
              </p>

            </div>

            <div className="bg-white/10 rounded-3xl p-10 backdrop-blur-md border border-white/20">

              <ul className="space-y-6 text-xl">

                <li>✅ AI-powered recommendations</li>

                <li>✅ Personalized career roadmaps</li>

                <li>✅ Skill & personality analysis</li>

                <li>✅ Goal tracking & progress monitoring</li>

                <li>✅ Domain and career comparisons</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
        <section className="py-24 px-6">

        <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#16a34a] py-20 px-8 text-white shadow-2xl text-center">

            <h2 className="text-5xl font-bold leading-tight">
            Start Exploring Your Future Today
            </h2>

            <p className="text-green-100 text-xl mt-6">
            Take your first AI-powered career assessment now.
            </p>

            <button className="mt-10 px-6 py-4 rounded-2xl bg-white text-black text-xl font-semibold shadow-lg hover:scale-105 transition duration-300 hover:brightness-110 hover:shadow-black/30">
            Start Free Test →
            </button>

        </div>

        </section>

      <Footer />

    </main>
  );
}