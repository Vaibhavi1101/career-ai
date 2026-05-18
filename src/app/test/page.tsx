"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import {
  Brain,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

const questions = [
  {
    type: "mcq",

    question:
      "Which activity do you enjoy the most?",

    options: [
      "Solving technical problems",
      "Helping and interacting with people",
      "Designing creative visuals",
      "Managing projects and teams",
    ],

    allowCustom: true,
  },

  {
    type: "text",

    question:
      "Describe your dream career or future goal.",

    placeholder:
      "Write your answer here...",
  },

  {
    type: "mcq",

    question:
      "Which environment suits you best?",

    options: [
      "Research & innovation labs",
      "Fast-paced business settings",
      "Creative studios",
      "Independent remote work",
    ],

    allowCustom: false,
  },
];

export default function TestPage() {

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedOption, setSelectedOption] =
    useState<string | null>(null);

  const [textAnswer, setTextAnswer] =
    useState("");

  const [customAnswer, setCustomAnswer] =
    useState("");

  const [isCustomSelected, setIsCustomSelected] =
    useState(false);

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const question = questions[currentQuestion];

  const searchParams = useSearchParams();

  const testType =
  searchParams.get("type");

  const router = useRouter();
  const [answers, setAnswers] = useState<any>({});

  const handleNext = () => {
    const currentAnswer =
      question.type === "text"
        ? textAnswer
        : isCustomSelected
        ? customAnswer
        : selectedOption;

    setAnswers((prev: any) => ({
      ...prev,
      [currentQuestion]: currentAnswer,

    }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTextAnswer("");
      setCustomAnswer("");
      setIsCustomSelected(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: authData } =
        await supabase.auth.getUser();
      const user = authData.user;
      if (!user) {
        alert("Please login to save assessments.");
        return;
      }
      const finalAnswer =
        question.type === "text"
          ? textAnswer
          : isCustomSelected
          ? customAnswer
          : selectedOption;

      const updatedAnswers = {
        ...answers,
        [currentQuestion]: finalAnswer,
      };
      const { error } =
        await supabase
          .from("assessments")
          .insert([
            {
              user_id: user.id,
              domain: testType || "General Career Assessment",
              answers: updatedAnswers,
            },
          ]);
      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }
      router.push("/results");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f5f7] px-6 py-16">

        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 text-blue-600 font-semibold">

                <Brain className="w-5 h-5" />

                <span>{testType || "CareerAI Assessment"}</span>

              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mt-4 leading-tight">
                Discover Your Strengths & Career Fit
              </h1>

            </div>

            {/* QUESTION COUNT */}
            <div className="bg-white rounded-2xl border border-zinc-200 px-6 py-4 shadow-sm">

              <p className="text-zinc-500 text-sm">
                Question
              </p>

              <h2 className="text-2xl font-bold text-zinc-900">
                {currentQuestion + 1}
                <span className="text-zinc-400">
                  /{questions.length}
                </span>
              </h2>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="mt-12">

            <div className="w-full h-4 bg-zinc-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

          {/* QUESTION CARD */}
          <div className="mt-14 bg-white rounded-[40px] border border-zinc-200 shadow-xl p-8 md:p-14">

            {/* TOP */}
            <div className="flex items-center gap-3 text-indigo-600 font-semibold">

              <Sparkles className="w-5 h-5" />

              <span>AI Career Analysis</span>

            </div>

            {/* QUESTION */}
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 leading-snug">

              {question.question}

            </h2>

            {/* ANSWERS */}
            <div className="mt-12">

              {/* MCQ */}
              {question.type === "mcq" && (

                <div className="space-y-5">

                  {question.options?.map((option) => (

                    <button
                      key={option}
                      onClick={() => {
                        setSelectedOption(option);
                        setIsCustomSelected(false);
                        setCustomAnswer("");
                      }}
                      className={`w-full text-left rounded-3xl border p-6 transition-all duration-300

                      ${
                        selectedOption === option &&
                        !isCustomSelected
                          ? "border-blue-600 bg-blue-50 shadow-lg"
                          : "border-zinc-400 bg-white hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md"
                      }
                      `}
                    >

                      <div className="flex items-center justify-between gap-6">

                        <p className="text-lg md:text-xl font-medium text-zinc-900">
                          {option}
                        </p>

                        <div
                          className={`w-6 h-6 rounded-full border-2 transition

                          ${
                            selectedOption === option &&
                            !isCustomSelected
                              ? "border-blue-500 bg-blue-500"
                              : "border-zinc-300"
                          }
                          `}
                        />

                      </div>

                    </button>

                  ))}

                  {/* CUSTOM ANSWER */}
                  {question.allowCustom && (

                    <div
                      className={`rounded-3xl border p-6 transition-all duration-300

                      ${
                        isCustomSelected
                          ? "border-blue-600 bg-blue-50 shadow-lg"
                          : "border-zinc-400 bg-white hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md"
                      }
                      `}
                    >

                      <button
                        onClick={() => {
                          setIsCustomSelected(true);
                          setSelectedOption("custom");
                        }}
                        className="w-full text-left"
                      >

                        <div className="flex items-center justify-between gap-6">

                          <p className="text-lg md:text-xl font-medium text-zinc-900">
                            Other (Write your own answer)
                          </p>

                          <div
                            className={`w-6 h-6 rounded-full border-2 transition

                            ${
                              isCustomSelected
                                ? "border-blue-500 bg-blue-500"
                                : "border-zinc-300"
                            }
                            `}
                          />

                        </div>

                      </button>

                      {/* TEXTAREA */}
                      {isCustomSelected && (

                        <textarea
                          value={customAnswer}
                          onChange={(e) =>
                            setCustomAnswer(e.target.value)
                          }
                          placeholder="Write your custom answer..."
                          rows={4}
                          className="mt-5 w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                        />

                      )}

                    </div>

                  )}

                </div>

              )}

              {/* TEXT QUESTION */}
              {question.type === "text" && (

                <textarea
                  value={textAnswer}
                  onChange={(e) =>
                    setTextAnswer(e.target.value)
                  }
                  placeholder={question.placeholder}
                  rows={7}
                  className="w-full rounded-3xl border border-zinc-200 bg-white p-6 text-lg text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />

              )}

            </div>

            {/* NAVIGATION */}
            <div className="mt-14 flex items-center justify-between gap-4">

              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition

                ${
                  currentQuestion === 0
                    ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    : "bg-white border border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                }
                `}
              >

                <ChevronLeft className="w-5 h-5" />

                Previous

              </button>

              <button
                onClick={
                          currentQuestion === questions.length - 1
                            ? handleSubmit
                            : handleNext
                        }
                disabled={
                  question.type === "mcq"
                    ? isCustomSelected
                      ? !customAnswer.trim()
                      : !selectedOption
                    : !textAnswer.trim()
                }
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold shadow-lg transition duration-300

                ${
                  (
                    question.type === "mcq"
                      ? isCustomSelected
                        ? customAnswer.trim()
                        : selectedOption
                      : textAnswer.trim()
                  )
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-[1.03]"
                    : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                }
                `}
              >

                {currentQuestion === questions.length - 1
                  ? "Submit Assessment"
                  : "Next Question"
                }

                <ChevronRight className="w-5 h-5" />

              </button>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}